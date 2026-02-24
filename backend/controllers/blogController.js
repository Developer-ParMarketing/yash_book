const Blog = require("../model/BlogSchema");


// PUBLIC CONTROLLERS


// Get all published blogs
exports.getPublishedBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find({ published: true })
            .sort({ createdAt: -1 });

        res.json({ blogs });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// Get blog by slug
exports.getBlogBySlug = async (req, res) => {
    try {
        const blog = await Blog.findOne({
            slug: req.params.slug,
            published: true,
        });

        if (!blog) {
            return res.status(404).json({ message: "Blog not found" });
        }

        // increase views
        blog.views += 1;
        await blog.save();

        res.json({ blog });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// Get related blogs
exports.getRelatedBlogs = async (req, res) => {
    try {
        const currentBlog = await Blog.findOne({
            slug: req.params.slug,
        });

        if (!currentBlog) {
            return res.status(404).json({ message: "Blog not found" });
        }

        const relatedBlogs = await Blog.find({
            _id: { $ne: currentBlog._id },
            categories: { $in: currentBlog.categories },
            published: true,
        }).limit(5);

        res.json({ relatedBlogs });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};



// ADMIN CONTROLLERS

// Get all blogs (draft + published)
exports.getAllBlogsForAdmin = async (req, res) => {
    try {
        const blogs = await Blog.find()
            .sort({ createdAt: -1 });

        res.json({ blogs });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// Get single blog by ID
exports.getBlogById = async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);

        if (!blog) {
            return res.status(404).json({ message: "Blog not found" });
        }

        res.json({ blog });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// Create blog
exports.createBlog = async (req, res) => {
    try {
        const blog = await Blog.create(req.body);

        res.status(201).json({ blog });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// Update blog
exports.updateBlog = async (req, res) => {
    try {
        const blog = await Blog.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        res.json({ blog });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// Delete blog
exports.deleteBlog = async (req, res) => {
    try {
        await Blog.findByIdAndDelete(req.params.id);

        res.json({ message: "Blog deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};