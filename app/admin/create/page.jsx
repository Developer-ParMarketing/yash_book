"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { api } from "../../variables";

export default function CreateBlogPage() {
    const router = useRouter();

    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        title: "",
        slug: "",
        excerpt: "",
        content: "",
        featuredImage: "",
        categories: "",
        tags: "",
        published: false,
        metaTitle: "",
        metaDescription: "",
        metaKeywords: "",
        ogTitle: "",
        ogDescription: "",
        ogImage: "",
        canonicalUrl: "",
    });

    // =============================
    // HANDLE INPUT CHANGE
    // =============================
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    // =============================
    // HANDLE SUBMIT
    // =============================
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await fetch(`${api}/blogs/admin`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify({
                    title: formData.title,
                    slug: formData.slug,
                    excerpt: formData.excerpt,
                    content: formData.content,
                    featuredImage: formData.featuredImage,
                    published: formData.published,
                    metaTitle: formData.metaTitle,
                    metaDescription: formData.metaDescription,
                    ogTitle: formData.ogTitle,
                    ogDescription: formData.ogDescription,
                    ogImage: formData.ogImage,
                    canonicalUrl: formData.canonicalUrl,
                    categories: formData.categories
                        ? formData.categories.split(",").map((c) => c.trim())
                        : [],
                    tags: formData.tags
                        ? formData.tags.split(",").map((t) => t.trim())
                        : [],
                    metaKeywords: formData.metaKeywords
                        ? formData.metaKeywords.split(",").map((k) => k.trim())
                        : [],
                }),
            });

            if (res.ok) {
                alert("Blog Created Successfully 🚀");
                router.push("/admin");
            } else {
                const data = await res.json();
                alert(data.message || "Something went wrong");
            }
        } catch (error) {
            console.log(error);
            alert("Server error");
        }

        setLoading(false);
    };

    return (
        <div className="min-h-screen bg-gray-50 p-10">
            <h1 className="text-3xl font-bold mb-8">Create New Blog</h1>

            <form
                onSubmit={handleSubmit}
                className="space-y-6 max-w-4xl bg-white p-8 rounded shadow"
            >

                {/* Basic Info */}
                <div className="space-y-4">
                    <h2 className="text-xl font-semibold">Basic Information</h2>

                    <input
                        name="title"
                        placeholder="Title"
                        className="w-full border p-2 rounded"
                        onChange={handleChange}
                        required
                    />

                    <input
                        name="slug"
                        placeholder="Slug (example: my-blog-title)"
                        className="w-full border p-2 rounded"
                        onChange={handleChange}
                        required
                    />

                    <textarea
                        name="excerpt"
                        placeholder="Short Excerpt"
                        className="w-full border p-2 rounded"
                        rows={3}
                        onChange={handleChange}
                    />

                    <textarea
                        name="content"
                        placeholder="Full Blog Content"
                        className="w-full border p-2 rounded"
                        rows={8}
                        onChange={handleChange}
                        required
                    />

                    <input
                        name="featuredImage"
                        placeholder="Featured Image URL"
                        className="w-full border p-2 rounded"
                        onChange={handleChange}
                    />

                    <input
                        name="categories"
                        placeholder="Categories (comma separated)"
                        className="w-full border p-2 rounded"
                        onChange={handleChange}
                    />

                    <input
                        name="tags"
                        placeholder="Tags (comma separated)"
                        className="w-full border p-2 rounded"
                        onChange={handleChange}
                    />

                    <label className="flex items-center space-x-2">
                        <input
                            type="checkbox"
                            name="published"
                            onChange={handleChange}
                        />
                        <span>Publish Immediately</span>
                    </label>
                </div>

                {/* SEO */}
                <div className="space-y-4">
                    <h2 className="text-xl font-semibold">SEO Settings</h2>

                    <input
                        name="metaTitle"
                        placeholder="Meta Title"
                        className="w-full border p-2 rounded"
                        onChange={handleChange}
                    />

                    <textarea
                        name="metaDescription"
                        placeholder="Meta Description"
                        className="w-full border p-2 rounded"
                        rows={3}
                        onChange={handleChange}
                    />

                    <input
                        name="metaKeywords"
                        placeholder="Meta Keywords (comma separated)"
                        className="w-full border p-2 rounded"
                        onChange={handleChange}
                    />

                    <input
                        name="canonicalUrl"
                        placeholder="Canonical URL"
                        className="w-full border p-2 rounded"
                        onChange={handleChange}
                    />
                </div>

                {/* Open Graph */}
                <div className="space-y-4">
                    <h2 className="text-xl font-semibold">Open Graph Settings</h2>

                    <input
                        name="ogTitle"
                        placeholder="OG Title"
                        className="w-full border p-2 rounded"
                        onChange={handleChange}
                    />

                    <textarea
                        name="ogDescription"
                        placeholder="OG Description"
                        className="w-full border p-2 rounded"
                        rows={3}
                        onChange={handleChange}
                    />

                    <input
                        name="ogImage"
                        placeholder="OG Image URL"
                        className="w-full border p-2 rounded"
                        onChange={handleChange}
                    />
                </div>

                <button
                    disabled={loading}
                    className="bg-black text-white px-6 py-3 rounded"
                >
                    {loading ? "Creating..." : "Create Blog"}
                </button>

            </form>
        </div>
    );
}