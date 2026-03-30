"use client";

import { api } from "@/app/variables";
import { useEffect, useState } from "react";

export default function AdminGlossary() {
    const [form, setForm] = useState({
        title: "",
        shortDesc: "",
        category: "general",
        tags: "",
        featured: false,
        status: "published",
        seo: {
            metaTitle: "",
            metaDescription: "",
        },
    });

    // 🔥 sections state
    const [sections, setSections] = useState([
        { heading: "", content: "" },
    ]);

    const [faqs, setFaqs] = useState([
        { question: "", answer: "" }
    ]);

    const [data, setData] = useState([]);
    const [editId, setEditId] = useState(null);

    // 🔄 Fetch all
    const fetchData = async () => {
        const res = await fetch(`${api}/glossary`);
        const result = await res.json();
        setData(result.data || []);
    };

    const addFaq = () => {
        setFaqs([...faqs, { question: "", answer: "" }]);
    };

    const removeFaq = (index) => {
        const updated = faqs.filter((_, i) => i !== index);
        setFaqs(updated);
    };

    const handleFaqChange = (index, field, value) => {
        const updated = [...faqs];
        updated[index][field] = value;
        setFaqs(updated);
    };


    useEffect(() => {
        fetchData();
    }, []);

    //  CREATE / UPDATE
    const handleSubmit = async (e) => {
        e.preventDefault();

        const payload = {
            ...form,
            sections,
            faqs,
            tags: form.tags.split(",").map((t) => t.trim()),
        };

        const method = editId ? "PUT" : "POST";
        const url = editId
            ? `${api}/glossary/${editId}`
            : `${api}/glossary`;

        await fetch(url, {
            method,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
        });

        // reset
        setForm({
            title: "",
            shortDesc: "",
            category: "general",
            tags: "",
            featured: false,
            status: "published",
            seo: { metaTitle: "", metaDescription: "" },
        });

        setSections([{ heading: "", content: "" }]);
        setFaqs([{ question: "", answer: "" }]);
        setEditId(null);
        fetchData();
    };

    // ✏️ EDIT
    const handleEdit = (item) => {
        setForm({
            title: item.title,
            shortDesc: item.shortDesc,
            category: item.category,
            tags: item.tags?.join(", "),
            featured: item.featured,
            status: item.status,
            seo: {
                metaTitle: item.seo?.metaTitle || "",
                metaDescription: item.seo?.metaDescription || "",
            },

        });

        setSections(
            item.sections?.length
                ? item.sections
                : [{ heading: "", content: "" }]
        );

        setEditId(item._id);
        setFaqs(
            item.faqs?.length
                ? item.faqs
                : [{ question: "", answer: "" }]
        );
    };

    // ❌ DELETE
    const handleDelete = async (id) => {
        await fetch(`${api}/glossary/${id}`, {
            method: "DELETE",
        });
        fetchData();
    };

    // ➕ Add Section
    const addSection = () => {
        setSections([...sections, { heading: "", content: "" }]);
    };

    // ❌ Remove Section
    const removeSection = (index) => {
        const updated = sections.filter((_, i) => i !== index);
        setSections(updated);
    };

    // ✏️ Handle Section Change
    const handleSectionChange = (index, field, value) => {
        const updated = [...sections];
        updated[index][field] = value;
        setSections(updated);
    };

    return (
        <div className="max-w-5xl mx-auto p-6">
            <h1 className="text-3xl font-bold mb-6">Admin Glossary</h1>

            {/* 📝 FORM */}
            <form onSubmit={handleSubmit} className="space-y-6 mb-10">

                {/* BASIC */}
                <input
                    placeholder="Title"
                    className="w-full border p-2"
                    value={form.title}
                    onChange={(e) =>
                        setForm({ ...form, title: e.target.value })
                    }
                    required
                />

                <input
                    placeholder="Short Description"
                    className="w-full border p-2"
                    value={form.shortDesc}
                    onChange={(e) =>
                        setForm({ ...form, shortDesc: e.target.value })
                    }
                    required
                />

                {/* 🔥 SECTIONS */}
                <div>
                    <h2 className="text-xl font-semibold mb-2">Sections</h2>

                    {sections.map((sec, index) => (
                        <div
                            key={index}
                            className="border p-4 mb-4 space-y-3 bg-gray-50"
                        >
                            <input
                                placeholder="Heading (e.g. What is API?)"
                                className="w-full border p-2"
                                value={sec.heading}
                                onChange={(e) =>
                                    handleSectionChange(
                                        index,
                                        "heading",
                                        e.target.value
                                    )
                                }
                                required
                            />

                            <textarea
                                placeholder="Content (HTML allowed)"
                                className="w-full border p-2 h-32"
                                value={sec.content}
                                onChange={(e) =>
                                    handleSectionChange(
                                        index,
                                        "content",
                                        e.target.value
                                    )
                                }
                                required
                            />

                            <button
                                type="button"
                                onClick={() => removeSection(index)}
                                className="text-red-600 text-sm"
                            >
                                Remove Section
                            </button>
                        </div>
                    ))}

                    <button
                        type="button"
                        onClick={addSection}
                        className="bg-gray-200 px-4 py-2"
                    >
                        + Add Section
                    </button>
                </div>


                {/* 🔥 FAQ SECTION */}
                <div>
                    <h2 className="text-xl font-semibold mb-2">FAQs</h2>

                    {faqs.map((faq, index) => (
                        <div key={index} className="border p-4 mb-4 bg-gray-50 space-y-3">

                            <input
                                placeholder="Question"
                                className="w-full border p-2"
                                value={faq.question}
                                onChange={(e) =>
                                    handleFaqChange(index, "question", e.target.value)
                                }
                                required
                            />

                            <textarea
                                placeholder="Answer (HTML allowed)"
                                className="w-full border p-2 h-24"
                                value={faq.answer}
                                onChange={(e) =>
                                    handleFaqChange(index, "answer", e.target.value)
                                }
                                required
                            />

                            <button
                                type="button"
                                onClick={() => removeFaq(index)}
                                className="text-red-600 text-sm"
                            >
                                Remove FAQ
                            </button>
                        </div>
                    ))}

                    <button
                        type="button"
                        onClick={addFaq}
                        className="bg-gray-200 px-4 py-2"
                    >
                        + Add FAQ
                    </button>
                </div>

                {/* CATEGORY */}
                <input
                    placeholder="Category"
                    className="w-full border p-2"
                    value={form.category}
                    onChange={(e) =>
                        setForm({ ...form, category: e.target.value })
                    }
                />

                {/* TAGS */}
                <input
                    placeholder="Tags (comma separated)"
                    className="w-full border p-2"
                    value={form.tags}
                    onChange={(e) =>
                        setForm({ ...form, tags: e.target.value })
                    }
                />

                {/* SEO */}
                <input
                    placeholder="Meta Title"
                    className="w-full border p-2"
                    value={form.seo.metaTitle}
                    onChange={(e) =>
                        setForm({
                            ...form,
                            seo: { ...form.seo, metaTitle: e.target.value },
                        })
                    }
                />

                <textarea
                    placeholder="Meta Description"
                    className="w-full border p-2"
                    value={form.seo.metaDescription}
                    onChange={(e) =>
                        setForm({
                            ...form,
                            seo: {
                                ...form.seo,
                                metaDescription: e.target.value,
                            },
                        })
                    }
                />

                {/* SUBMIT */}
                <button className="bg-black text-white px-6 py-2">
                    {editId ? "Update" : "Create"}
                </button>
            </form>

            {/* 📋 LIST */}
            <div className="space-y-4">
                {data.map((item) => (
                    <div
                        key={item._id}
                        className="border p-4 flex justify-between"
                    >
                        <div>
                            <h2 className="font-semibold">{item.title}</h2>
                            <p className="text-sm">{item.shortDesc}</p>
                            <p className="text-xs text-gray-500">
                                {item.category} • {item.status}
                            </p>
                        </div>

                        <div className="space-x-3">
                            <button
                                onClick={() => handleEdit(item)}
                                className="text-blue-600"
                            >
                                Edit
                            </button>

                            <button
                                onClick={() => handleDelete(item._id)}
                                className="text-red-600"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}