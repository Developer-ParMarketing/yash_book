const express = require("express");
const router = express.Router();

const {
    getAllGlossary,
    getGlossaryBySlug,
    createGlossary,
    updateGlossary,
    deleteGlossary,
} = require("../controllers/glossaryController");

// 📌 Public Routes
router.get("/", getAllGlossary);
router.get("/:slug", getGlossaryBySlug);

// 📌 Admin Routes
router.post("/", createGlossary);
router.put("/:id", updateGlossary);
router.delete("/:id", deleteGlossary);

module.exports = router;