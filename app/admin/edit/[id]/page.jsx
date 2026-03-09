"use client";

import { useEffect, useRef, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { api } from "../../../variables";
import "quill/dist/quill.snow.css";

export default function EditBlogPage() {

    const editorRef = useRef(null);
    const quillRef = useRef(null);

    const { id } = useParams();
    const router = useRouter();

    const [formData, setFormData] = useState(null);
    const [faqs, setFaqs] = useState([]);
    const [loading, setLoading] = useState(true);

    // FETCH BLOG
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
                        excerpt: data.blog.excerpt || "",
                        content: data.blog.content || "",
                        featuredImage: data.blog.featuredImage || "",
                        author: data.blog.author || "",
                        categories: data.blog.categories?.join(", ") || "",
                        tags: data.blog.tags?.join(", ") || "",
                        published: data.blog.published || false,

                        // SEO / Meta
                        metaTitle: data.blog.metaTitle || "",
                        metaDescription: data.blog.metaDescription || "",
                        metaKeywords: data.blog.metaKeywords?.join(", ") || "",

                        // OG
                        ogTitle: data.blog.ogTitle || "",
                        ogDescription: data.blog.ogDescription || "",
                        ogImage: data.blog.ogImage || "",

                        // Other
                        canonicalUrl: data.blog.canonicalUrl || "",
                    });

                    setFaqs(data.blog.faqs || []);
                }

                setLoading(false);

            } catch (error) {
                console.log(error);
                setLoading(false);
            }
        };

        if (id) fetchBlog();

    }, [id]);



    // LOAD QUILL EDITOR

    useEffect(() => {

        if (!editorRef.current || quillRef.current) return;

        const loadQuill = async () => {

            const Quill = (await import("quill")).default;

            const quill = new Quill(editorRef.current, {
                theme: "snow",
                placeholder: "Write blog content here...",
            });

            // ✅ Set content RIGHT HERE after Quill is ready
            if (formData?.content) {
                quill.clipboard.dangerouslyPasteHTML(formData.content);
            }

            quill.on("text-change", () => {
                setFormData(prev => ({
                    ...prev,
                    content: quill.root.innerHTML
                }));
            });

            quillRef.current = quill;
        };

        loadQuill();

    }, [formData]); // ✅ depend on formData so it waits for fetch to complete







    if (loading) return <div className="p-10">Loading...</div>;
    if (!formData) return <div className="p-10">Blog not found</div>;


    const handleChange = (e) => {

        const { name, value, type, checked } = e.target;

        setFormData(prev => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value
        }));
    };



    // FAQ FUNCTIONS

    const handleFaqChange = (index, field, value) => {

        const updated = [...faqs];

        updated[index] = {
            ...updated[index],
            [field]: value
        };

        setFaqs(updated);
    };



    const addFaq = () => {

        setFaqs([...faqs, { question: "", answer: "" }]);
    };



    const removeFaq = (index) => {

        setFaqs(faqs.filter((_, i) => i !== index));
    };



    // SUBMIT UPDATE

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

                    ...formData,

                    faqs: faqs.filter(
                        faq => faq.question.trim() !== "" && faq.answer.trim() !== ""
                    ),

                    categories: formData.categories
                        ? formData.categories.split(",").map(c => c.trim())
                        : [],

                    tags: formData.tags
                        ? formData.tags.split(",").map(t => t.trim())
                        : [],

                    metaKeywords: formData.metaKeywords
                        ? formData.metaKeywords.split(",").map(k => k.trim())
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


            <form
                onSubmit={handleSubmit}
                className="space-y-5 max-w-3xl bg-white p-6 rounded shadow"
            >

                {/* TITLE */}

                <input
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="Title"
                    className="w-full border p-2 rounded"
                    required
                />


                {/* SLUG */}

                <input
                    name="slug"
                    value={formData.slug}
                    onChange={handleChange}
                    placeholder="Slug"
                    className="w-full border p-2 rounded"
                    required
                />


                {/* CONTENT */}

                <div>

                    <label className="block mb-2 font-medium">Content</label>

                    <div
                        ref={editorRef}
                        style={{ height: "300px" }}
                        className="bg-white border rounded"
                    />

                </div>



                {/* FEATURED IMAGE */}

                <div>

                    <label className="block mb-2 font-medium">
                        Featured Image URL
                    </label>

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



                {/* CATEGORIES */}

                <input
                    name="categories"
                    value={formData.categories}
                    onChange={handleChange}
                    placeholder="Categories (comma separated)"
                    className="w-full border p-2 rounded"
                />



                {/* TAGS */}

                <input
                    name="tags"
                    value={formData.tags}
                    onChange={handleChange}
                    placeholder="Tags (comma separated)"
                    className="w-full border p-2 rounded"
                />



                {/* META KEYWORDS */}

                <input
                    name="metaKeywords"
                    value={formData.metaKeywords}
                    onChange={handleChange}
                    placeholder="Meta Keywords (comma separated)"
                    className="w-full border p-2 rounded"
                />

                {/* EXCERPT */}
                <div>
                    <label className="block mb-2 font-medium">Excerpt</label>
                    <textarea
                        name="excerpt"
                        value={formData.excerpt}
                        onChange={handleChange}
                        placeholder="Short excerpt"
                        rows={2}
                        className="w-full border p-2 rounded"
                    />
                </div>

                {/* SEO SECTION */}
                <div className="border rounded-lg p-4 bg-gray-50 space-y-3">
                    <h2 className="text-lg font-semibold">SEO Settings</h2>

                    <input
                        name="metaTitle"
                        value={formData.metaTitle}
                        onChange={handleChange}
                        placeholder="Meta Title"
                        className="w-full border p-2 rounded"
                    />

                    <textarea
                        name="metaDescription"
                        value={formData.metaDescription}
                        onChange={handleChange}
                        placeholder="Meta Description"
                        rows={2}
                        className="w-full border p-2 rounded"
                    />

                    <input
                        name="metaKeywords"
                        value={formData.metaKeywords}
                        onChange={handleChange}
                        placeholder="Meta Keywords (comma separated)"
                        className="w-full border p-2 rounded"
                    />

                    <input
                        name="canonicalUrl"
                        value={formData.canonicalUrl}
                        onChange={handleChange}
                        placeholder="Canonical URL"
                        className="w-full border p-2 rounded"
                    />
                </div>

                {/* OG / SOCIAL SECTION */}
                <div className="border rounded-lg p-4 bg-gray-50 space-y-3">
                    <h2 className="text-lg font-semibold">Open Graph (Social)</h2>

                    <input
                        name="ogTitle"
                        value={formData.ogTitle}
                        onChange={handleChange}
                        placeholder="OG Title"
                        className="w-full border p-2 rounded"
                    />

                    <textarea
                        name="ogDescription"
                        value={formData.ogDescription}
                        onChange={handleChange}
                        placeholder="OG Description"
                        rows={2}
                        className="w-full border p-2 rounded"
                    />

                    <input
                        name="ogImage"
                        value={formData.ogImage}
                        onChange={handleChange}
                        placeholder="OG Image URL"
                        className="w-full border p-2 rounded"
                    />

                    {formData.ogImage && (
                        <img
                            src={formData.ogImage}
                            alt="OG Preview"
                            className="mt-2 w-full h-40 object-cover rounded"
                        />
                    )}
                </div>

                {/* FAQ SECTION */}

                <div className="mt-6">

                    <h2 className="text-xl font-semibold mb-4">
                        FAQs
                    </h2>


                    {faqs.map((faq, index) => (

                        <div
                            key={index}
                            className="border p-4 rounded-lg mb-4 bg-gray-50"
                        >

                            <div className="flex justify-between mb-2">

                                <span className="font-medium text-sm">
                                    FAQ #{index + 1}
                                </span>

                                <button
                                    type="button"
                                    onClick={() => removeFaq(index)}
                                    className="text-red-500 text-sm"
                                >
                                    Remove
                                </button>

                            </div>


                            <input
                                value={faq.question}
                                onChange={(e) =>
                                    handleFaqChange(
                                        index,
                                        "question",
                                        e.target.value
                                    )
                                }
                                placeholder="Enter question"
                                className="w-full border p-2 rounded mb-2"
                            />


                            <textarea
                                value={faq.answer}
                                onChange={(e) =>
                                    handleFaqChange(
                                        index,
                                        "answer",
                                        e.target.value
                                    )
                                }
                                placeholder="Enter answer"
                                rows={3}
                                className="w-full border p-2 rounded"
                            />

                        </div>

                    ))}


                    <button
                        type="button"
                        onClick={addFaq}
                        className="bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded text-sm"
                    >
                        + Add FAQ
                    </button>

                </div>



                {/* PUBLISH */}

                <label className="flex items-center space-x-2">

                    <input
                        type="checkbox"
                        name="published"
                        checked={formData.published}
                        onChange={handleChange}
                    />

                    <span>Published</span>

                </label>



                {/* SUBMIT */}

                <button className="bg-black text-white px-6 py-2 rounded">

                    Update Blog

                </button>

            </form>

        </div>
    );
}