const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },

    excerpt: String,

    content: {
      type: String,
      required: true,
    },

    featuredImage: String,

    // author: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "User",
    //   required: true,
    // },

    author: {
      type: String,
      default: "Admin",
    },

    categories: [String],
    tags: [String],

    published: {
      type: Boolean,
      default: false,
    },

    views: {
      type: Number,
      default: 0,
    },


    metaTitle: String,
    metaDescription: String,
    metaKeywords: [String],

    ogTitle: String,
    ogDescription: String,
    ogImage: String,

    canonicalUrl: String,

    datePublished: {
      type: Date,
      default: Date.now,
    },

    dateModified: Date,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Blog", blogSchema);