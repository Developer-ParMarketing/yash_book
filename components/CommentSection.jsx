"use client";

import { useState } from "react";
import { api } from "@/app/variables";

export default function CommentSection({ slug, comments }) {
    const [list, setList] = useState(comments || []);
    const [form, setForm] = useState({
        name: "",
        email: "",
        website: "",
        comment: "",
    });

    const handleSubmit = async (e) => {
        e.preventDefault();

        const res = await fetch(`${api}/blogs/post/${slug}/comment`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(form),
        });

        const data = await res.json();

        setList(data.comments);

        setForm({
            name: "",
            email: "",
            website: "",
            comment: "",
        });
    };

    return (
        <div className="mt-14">

            <h3 className="text-xl font-semibold mb-6">
                {list.length} Comments
            </h3>

            {/* Comment List */}
            <div className="space-y-4 mb-8">
                {list.map((c, i) => (
                    <div key={i} className="border rounded-lg p-4">
                        <p className="font-semibold">{c.name}</p>
                        <p className="text-sm text-gray-500">
                            {new Date(c.createdAt).toLocaleDateString()}
                        </p>
                        <p className="mt-2">{c.comment}</p>
                    </div>
                ))}
            </div>

            {/* Comment Form */}
            <form onSubmit={handleSubmit} className="space-y-4">

                <input
                    placeholder="Name"
                    className="border p-2 w-full"
                    value={form.name}
                    onChange={(e) =>
                        setForm({ ...form, name: e.target.value })
                    }
                />

                <input
                    placeholder="Email"
                    className="border p-2 w-full"
                    value={form.email}
                    onChange={(e) =>
                        setForm({ ...form, email: e.target.value })
                    }
                />

                <input
                    placeholder="Website"
                    className="border p-2 w-full"
                    value={form.website}
                    onChange={(e) =>
                        setForm({ ...form, website: e.target.value })
                    }
                />

                <textarea
                    placeholder="Comment"
                    className="border p-2 w-full"
                    rows="4"
                    value={form.comment}
                    onChange={(e) =>
                        setForm({ ...form, comment: e.target.value })
                    }
                />

                <button
                    type="submit"
                    className="bg-black text-white px-5 py-2 rounded"
                >
                    Post Comment
                </button>

            </form>

        </div>
    );
}