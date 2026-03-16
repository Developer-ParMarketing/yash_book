"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { api } from "../variables";

export default function AdminPage() {
    const router = useRouter();
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [contacts, setContacts] = useState([]);

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


    // CREATE MESSAGE
    const createContact = async (req, res) => {
        try {
            const { name, email, message } = req.body;

            if (!name || !email || !message) {
                return res.status(400).json({
                    success: false,
                    message: "All fields are required",
                });
            }

            const contact = await Contact.create({ name, email, message });

            res.status(201).json({
                success: true,
                message: "Message sent successfully",
                data: contact,
            });

        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message,
            });
        }
    };


    const fetchContacts = async () => {
        try {

            const res = await fetch(`${api}/contact`, {
                credentials: "include",
            });

            const data = await res.json();

            setContacts(data.contacts || []);

        } catch (error) {
            console.log(error);
        }
    };


    useEffect(() => {
        fetchBlogs();
        fetchContacts();
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


            <div className="mt-16">
                <h2 className="text-2xl font-bold mb-6">Contact Messages</h2>

                <div className="overflow-x-auto bg-white border border-gray-200 rounded-lg">
                    <table className="w-full min-w-[700px] text-left">
                        <thead className="bg-gray-100 text-sm uppercase">
                            <tr>

                                <th className="p-3">Name</th>
                                <th className="p-3">Email</th>
                                <th className="p-3">Message</th>
                                <th className="p-3">Date</th>
                            </tr>
                        </thead>

                        <tbody>
                            {contacts.length === 0 ? (
                                <tr>
                                    <td colSpan="5" className="text-center p-6 text-gray-500">
                                        No contact messages found
                                    </td>
                                </tr>
                            ) : (
                                contacts.map((msg) => (
                                    <tr key={msg._id} className="border-t hover:bg-gray-50">



                                        {/* Name */}
                                        <td className="p-3 font-medium">
                                            {msg.name}
                                        </td>

                                        {/* Email */}
                                        <td className="p-3 text-blue-600">
                                            <a href={`mailto:${msg.email}`}>
                                                {msg.email}
                                            </a>
                                        </td>

                                        {/* Message */}
                                        <td className="p-3 max-w-[350px] truncate">
                                            {msg.message}
                                        </td>

                                        {/* Date */}
                                        <td className="p-3">
                                            {new Date(msg.createdAt).toLocaleDateString("en-US", {
                                                year: "numeric",
                                                month: "short",
                                                day: "numeric",
                                            })}
                                        </td>

                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}