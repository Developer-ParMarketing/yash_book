const express = require("express");
const router = express.Router();

const {
    // Public
    getPublishedBlogs,
    getBlogBySlug,
    getRelatedBlogs,

    // Admin
    getAllBlogsForAdmin,
    getBlogById,
    createBlog,
    updateBlog,
    deleteBlog,
    previewBlogBySlug,
    addComment,
    likeBlog,
    shareBlog,
} = require("../controllers/blogController");


// ===============================
// PUBLIC ROUTES (Users)
// ===============================

// Get all published blogs
router.get("/", getPublishedBlogs);

// Get related blogs
router.get("/related/:slug", getRelatedBlogs);

// Get single blog by slug
router.get("/post/:slug", getBlogBySlug);

//  Like blog
router.post("/post/:slug/like", likeBlog);


//  Add comment
router.post("/post/:slug/comment", addComment);

//share
router.post("/post/:slug/share", shareBlog);

// ===============================
// ADMIN ROUTES
// ===============================

// Get all blogs (draft + published)
router.get("/admin/all", getAllBlogsForAdmin);

// Get single blog by ID (edit page)
router.get("/admin/:id", getBlogById);

// Create
router.post("/admin", createBlog);

// Update
router.put("/admin/:id", updateBlog);

// Delete
router.delete("/admin/:id", deleteBlog);

// Preview draft (admin only)
router.get("/admin/preview/:slug", previewBlogBySlug);


module.exports = router;