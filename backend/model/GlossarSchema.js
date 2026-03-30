const mongoose = require("mongoose");

const GlossarySchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
            unique: true,
        },

        slug: {
            type: String,
            unique: true,
            lowercase: true,
        },

        shortDesc: {
            type: String,
            required: true,
            maxlength: 200,
        },

        // 🔥 NEW: multiple sections
        sections: [
            {
                heading: {
                    type: String, // e.g. "What is API?"
                    required: true,
                },
                content: {
                    type: String, // HTML
                    required: true,
                },
            },
        ],

        category: {
            type: String,
            default: "general",
        },

        tags: [String],

        featured: {
            type: Boolean,
            default: false,
        },

        faqs: [
            {
                question: {
                    type: String,
                    required: true,
                },
                answer: {
                    type: String,
                    required: true,
                },
            },
        ],

        views: {
            type: Number,
            default: 0,
        },

        status: {
            type: String,
            enum: ["draft", "published"],
            default: "published",
        },

        seo: {
            metaTitle: String,
            metaDescription: String,
        },
    },
    { timestamps: true }
);

// slug generator
GlossarySchema.pre("validate", function () {
    if (!this.slug && this.title) {
        this.slug = this.title
            .toLowerCase()
            .trim()
            .replace(/[^a-z0-9 ]/g, "")
            .replace(/\s+/g, "-");
    }
});

module.exports = mongoose.model("Glossary", GlossarySchema);