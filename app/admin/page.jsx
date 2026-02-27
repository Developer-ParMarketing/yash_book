"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { api } from "../variables";

export default function AdminPage() {
    const router = useRouter();
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchBlogs = async () => {
        try {
            // ✅ IMPORTANT: Use admin route to get draft + published
            const res = await fetch(`${api}/blogs/admin/all`, {
                credentials: "include",
            });

            const data = await res.json();
            setBlogs(data.blogs || []);
            setLoading(false);
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBlogs();
    }, []);

    const handleDelete = async (id) => {
        if (!confirm("Delete this blog?")) return;

        const res = await fetch(`${api}/blogs/admin/${id}`, {
            method: "DELETE",
            credentials: "include",
        });

        if (res.ok) fetchBlogs();
    };

    if (loading) return <div className="p-10">Loading...</div>;

    return (
        <div className="min-h-screen bg-gray-50 p-4 md:p-10">
            <div className="flex flex-col md:flex-row justify-between mb-6 md:mb-8 items-start md:items-center gap-4">
                <h1 className="text-2xl md:text-3xl font-bold">Blog Dashboard</h1>

                <button
                    onClick={() => router.push("/admin/create")}
                    className="bg-black text-white px-4 md:px-5 py-2 rounded hover:bg-gray-800 transition"
                >
                    + Create Blog
                </button>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full min-w-[700px] text-left border border-gray-200 rounded-lg">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="p-3">Title</th>
                            <th className="p-3">Category</th>
                            <th className="p-3">Views</th>
                            <th className="p-3">Date</th>
                            <th className="p-3">Status</th>
                            <th className="p-3">Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {blogs.map((blog) => (
                            <tr key={blog._id} className="border-t hover:bg-gray-50">
                                <td className="p-3 font-medium">
                                    {blog.title}
                                </td>

                                <td className="p-3">
                                    {blog.categories?.join(", ")}
                                </td>

                                <td className="p-3">
                                    {blog.views || 0}
                                </td>

                                <td className="p-3">
                                    {blog.datePublished
                                        ? new Date(blog.datePublished).toLocaleDateString(
                                            "en-US",
                                            {
                                                year: "numeric",
                                                month: "long",
                                                day: "numeric",
                                            }
                                        )
                                        : "-"}
                                </td>

                                {/* ✅ Status Badge */}
                                <td className="p-3">
                                    <span
                                        className={`px-2 py-1 text-xs rounded ${blog.published
                                                ? "bg-green-100 text-green-700"
                                                : "bg-yellow-100 text-yellow-700"
                                            }`}
                                    >
                                        {blog.published ? "Published" : "Draft"}
                                    </span>
                                </td>

                                {/* ✅ Actions */}
                                <td className="p-3 flex flex-wrap gap-3">
                                    <button
                                        onClick={() =>
                                            router.push(`/admin/edit/${blog._id}`)
                                        }
                                        className="text-blue-600 hover:underline"
                                    >
                                        Edit
                                    </button>

                                    <button
                                        onClick={() =>
                                            router.push(`/blog-preview/${blog.slug}`)
                                        }
                                        className="text-green-600 hover:underline"
                                    >
                                        Preview
                                    </button>

                                    <button
                                        onClick={() => handleDelete(blog._id)}
                                        className="text-red-600 hover:underline"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}