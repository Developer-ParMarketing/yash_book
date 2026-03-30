const Glossary = require("../model/GlossarSchema");

// ✅ GET ALL (with search + filter)
exports.getAllGlossary = async (req, res) => {
    try {
        const { search, status, category } = req.query;

        let query = {};

        if (status) query.status = status;
        if (category) query.category = category;

        // 🔍 search by title/content
        if (search) {
            query.$text = { $search: search };
        }

        const data = await Glossary.find(query).sort({ title: 1 });

        res.status(200).json({
            success: true,
            count: data.length,
            data,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// ✅ GET SINGLE + increase views
exports.getGlossaryBySlug = async (req, res) => {
    try {
        const { slug } = req.params;

        const item = await Glossary.findOneAndUpdate(
            { slug },
            { $inc: { views: 1 } },
            { new: true }
        );

        if (!item) {
            return res.status(404).json({
                success: false,
                message: "Glossary not found",
            });
        }

        res.status(200).json({
            success: true,
            data: item,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// ✅ CREATE
exports.createGlossary = async (req, res) => {
    try {
        const { title, shortDesc, sections } = req.body;

        // ✅ new validation
        if (!title || !shortDesc || !sections || sections.length === 0) {
            return res.status(400).json({
                success: false,
                message: "Title, shortDesc and at least one section are required",
            });
        }

        // ✅ validate each section
        for (let sec of sections) {
            if (!sec.heading || !sec.content) {
                return res.status(400).json({
                    success: false,
                    message: "Each section must have heading and content",
                });
            }
        }

        const newItem = await Glossary.create(req.body);

        res.status(201).json({
            success: true,
            message: "Glossary created successfully",
            data: newItem,
        });
    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({
                success: false,
                message: "Glossary with this title/slug already exists",
            });
        }

        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// ✅ UPDATE
exports.updateGlossary = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, shortDesc, sections } = req.body;

        if (!title || !shortDesc || !sections || sections.length === 0) {
            return res.status(400).json({
                success: false,
                message: "Title, shortDesc and sections are required",
            });
        }

        const updated = await Glossary.findByIdAndUpdate(id, req.body, {
            new: true,
            runValidators: true,
        });

        if (!updated) {
            return res.status(404).json({
                success: false,
                message: "Glossary not found",
            });
        }

        res.status(200).json({
            success: true,
            message: "Glossary updated successfully",
            data: updated,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// ✅ DELETE
exports.deleteGlossary = async (req, res) => {
    try {
        const { id } = req.params;

        const deleted = await Glossary.findByIdAndDelete(id);

        if (!deleted) {
            return res.status(404).json({
                success: false,
                message: "Glossary not found",
            });
        }

        res.status(200).json({
            success: true,
            message: "Glossary deleted successfully",
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};