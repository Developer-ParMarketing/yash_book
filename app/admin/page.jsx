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
            const res = await fetch(`${api}/blogs`, {
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

        const res = await fetch(`${api}/blogs/${id}`, {
            method: "DELETE",
            credentials: "include",
        });

        if (res.ok) {
            fetchBlogs();
        }
    };

    if (loading) return <div className="p-10">Loading...</div>;

    return (
        <div className="min-h-screen bg-gray-50 p-10">
            <div className="flex justify-between mb-8">
                <h1 className="text-3xl font-bold">Blog Dashboard</h1>

                <button
                    onClick={() => router.push("/admin/create")}
                    className="bg-black text-white px-5 py-2 rounded"
                >
                    + Create Blog
                </button>
            </div>

            <div className="bg-white rounded shadow">
                <table className="w-full text-left">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="p-4">Title</th>
                            <th className="p-4">Category</th>
                            <th className="p-4">Views</th>
                            <th className="p-4">Status</th>
                            <th className="p-4">Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {blogs.map((blog) => (
                            <tr key={blog._id} className="border-t">
                                <td className="p-4">{blog.title}</td>
                                <td className="p-4">
                                    {blog.categories?.join(", ")}
                                </td>
                                <td className="p-4">{blog.views}</td>
                                <td className="p-4">
                                    {blog.published ? "Published" : "Draft"}
                                </td>
                                <td className="p-4 space-x-3">
                                    <button
                                        onClick={() => router.push(`/admin/edit/${blog._id}`)}
                                        className="text-blue-600"
                                    >
                                        Edit
                                    </button>

                                    <button
                                        onClick={() => handleDelete(blog._id)}
                                        className="text-red-600"
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