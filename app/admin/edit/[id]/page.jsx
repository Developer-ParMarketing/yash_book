"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { api } from "../../../variables";

export default function EditBlogPage() {
    const { id } = useParams();
    const router = useRouter();

    const [formData, setFormData] = useState(null);
    const [loading, setLoading] = useState(true);

    // ===================================
    // FETCH BLOG DATA
    // ===================================
    useEffect(() => {
        const fetchBlog = async () => {
            try {
                const res = await fetch(`${api}/blogs/admin/${id}`, {
                    credentials: "include",
                });

                const data = await res.json();

                if (data.blog) {
                    setFormData({
                        title: data.blog.title || "",
                        slug: data.blog.slug || "",
                        content: data.blog.content || "",
                        featuredImage: data.blog.featuredImage || "",
                        categories: data.blog.categories?.join(", ") || "",
                        tags: data.blog.tags?.join(", ") || "",
                        metaKeywords: data.blog.metaKeywords?.join(", ") || "",
                        published: data.blog.published || false,
                    });
                }

                setLoading(false);
            } catch (error) {
                console.log(error);
                setLoading(false);
            }
        };

        if (id) fetchBlog();
    }, [id]);

    if (loading) return <div className="p-10">Loading...</div>;
    if (!formData) return <div className="p-10">Blog not found</div>;

    // ===================================
    // HANDLE CHANGE
    // ===================================
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    // ===================================
    // HANDLE UPDATE
    // ===================================
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await fetch(`${api}/blogs/admin/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify({
                    title: formData.title,
                    slug: formData.slug,
                    content: formData.content,
                    featuredImage: formData.featuredImage,
                    published: formData.published,
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
                alert("Blog Updated Successfully");
                router.push("/admin");
            } else {
                const data = await res.json();
                alert(data.message || "Update failed");
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 p-10">
            <h1 className="text-3xl font-bold mb-8">Edit Blog</h1>

            <form onSubmit={handleSubmit} className="space-y-5 max-w-3xl bg-white p-6 rounded shadow">

                <input
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="Title"
                    className="w-full border p-2 rounded"
                    required
                />

                <input
                    name="slug"
                    value={formData.slug}
                    onChange={handleChange}
                    placeholder="Slug"
                    className="w-full border p-2 rounded"
                    required
                />

                <textarea
                    name="content"
                    value={formData.content}
                    onChange={handleChange}
                    rows={8}
                    placeholder="Content"
                    className="w-full border p-2 rounded"
                    required
                />

                <div>
                    <label className="block mb-2 font-medium">Featured Image URL</label>

                    <input
                        name="featuredImage"
                        value={formData.featuredImage}
                        onChange={handleChange}
                        placeholder="Enter image URL"
                        className="w-full border p-2 rounded"
                    />

                    {formData.featuredImage && (
                        <img
                            src={formData.featuredImage}
                            alt="Preview"
                            className="mt-4 w-full h-60 object-cover rounded"
                        />
                    )}
                </div>

                <input
                    name="categories"
                    value={formData.categories}
                    onChange={handleChange}
                    placeholder="Categories (comma separated)"
                    className="w-full border p-2 rounded"
                />

                <input
                    name="tags"
                    value={formData.tags}
                    onChange={handleChange}
                    placeholder="Tags (comma separated)"
                    className="w-full border p-2 rounded"
                />

                <label className="flex items-center space-x-2">
                    <input
                        type="checkbox"
                        name="published"
                        checked={formData.published}
                        onChange={handleChange}
                    />
                    <span>Published</span>
                </label>

                <button className="bg-black text-white px-6 py-2 rounded">
                    Update Blog
                </button>

            </form>
        </div>
    );
}