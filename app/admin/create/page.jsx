"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { api } from "../../variables";

// =============================================
// RICH TEXT EDITOR — cursor stable
// =============================================
function RichTextEditor({ initialValue = "", onChange, minHeight = "120px", placeholder = "Start typing..." }) {
    const editorRef = useRef(null);
    const savedRange = useRef(null);

    // Set HTML once on mount only — prevents cursor jumping
    useEffect(() => {
        if (editorRef.current) {
            editorRef.current.innerHTML = initialValue || "";
        }
    }, []); // eslint-disable-line

    const saveSelection = () => {
        const sel = window.getSelection();
        if (sel && sel.rangeCount > 0) {
            savedRange.current = sel.getRangeAt(0).cloneRange();
        }
    };

    const restoreSelection = () => {
        if (!savedRange.current || !editorRef.current) return;
        editorRef.current.focus();
        const sel = window.getSelection();
        sel.removeAllRanges();
        sel.addRange(savedRange.current);
    };

    const execCmd = (e, cmd, val = null) => {
        e.preventDefault();
        restoreSelection();
        document.execCommand(cmd, false, val);
        if (editorRef.current) onChange(editorRef.current.innerHTML);
    };

    const insertLink = (e) => {
        e.preventDefault();
        restoreSelection();
        const sel = window.getSelection();
        const hasSelection = sel && sel.rangeCount > 0 && !sel.isCollapsed;
        const url = prompt("Enter the URL (e.g. https://example.com):");
        if (!url) return;
        if (hasSelection) {
            document.execCommand("createLink", false, url);
        } else {
            const text = prompt("No text selected. Enter link display text:") || url;
            document.execCommand("insertHTML", false,
                `<a href="${url}" target="_blank" rel="noopener noreferrer">${text}</a>`);
        }
        if (editorRef.current) {
            editorRef.current.querySelectorAll("a").forEach((a) => {
                a.setAttribute("target", "_blank");
                a.setAttribute("rel", "noopener noreferrer");
            });
            onChange(editorRef.current.innerHTML);
        }
    };

    const handleInput = () => {
        if (editorRef.current) onChange(editorRef.current.innerHTML);
    };

    return (
        <div className="border rounded-lg overflow-hidden shadow-sm">
            <div
                className="flex flex-wrap items-center gap-0.5 bg-gray-50 border-b px-2 py-1.5"
                onMouseDown={(e) => e.preventDefault()}
            >
                <TB onMouseDown={(e) => execCmd(e, "bold")}><b>B</b></TB>
                <TB onMouseDown={(e) => execCmd(e, "italic")}><i>I</i></TB>
                <TB onMouseDown={(e) => execCmd(e, "underline")}><u>U</u></TB>
                <TB onMouseDown={(e) => execCmd(e, "strikeThrough")}><s>S</s></TB>
                <Sp />
                <TB onMouseDown={(e) => execCmd(e, "insertUnorderedList")}>• List</TB>
                <TB onMouseDown={(e) => execCmd(e, "insertOrderedList")}>1. List</TB>
                <Sp />
                <TB onMouseDown={insertLink}>🔗 Link</TB>
                <TB onMouseDown={(e) => { e.preventDefault(); restoreSelection(); document.execCommand("unlink"); if (editorRef.current) onChange(editorRef.current.innerHTML); }}>🔗✕</TB>
                <Sp />
                <TB onMouseDown={(e) => execCmd(e, "formatBlock", "blockquote")}>❝</TB>
                <TB onMouseDown={(e) => execCmd(e, "removeFormat")}>✕ Clear</TB>
            </div>
            <div
                ref={editorRef}
                contentEditable
                suppressContentEditableWarning
                onInput={handleInput}
                onKeyUp={saveSelection}
                onMouseUp={saveSelection}
                onSelect={saveSelection}
                data-placeholder={placeholder}
                className="outline-none p-3 text-gray-800 leading-relaxed rte-body"
                style={{ minHeight, fontFamily: "Georgia, serif", fontSize: "1rem" }}
            />
        </div>
    );
}

function TB({ onMouseDown, children }) {
    return (
        <button type="button" onMouseDown={onMouseDown}
            className="px-2 py-1 text-xs rounded hover:bg-gray-200 active:bg-gray-300 text-gray-700 font-medium transition select-none">
            {children}
        </button>
    );
}
function Sp() { return <div className="w-px h-4 bg-gray-300 mx-1 self-center" />; }

// =============================================
// CONTENT BLOCK BUILDER
// =============================================
const BLOCK_TYPES = [
    { type: "h1", label: "H1", color: "bg-purple-100 text-purple-700 border-purple-300" },
    { type: "h2", label: "H2", color: "bg-indigo-100 text-indigo-700 border-indigo-300" },
    { type: "h3", label: "H3", color: "bg-pink-100 text-pink-700 border-pink-300" },
    { type: "p", label: "Paragraph", color: "bg-blue-100 text-blue-700 border-blue-300" },
    { type: "img", label: "Image", color: "bg-green-100 text-green-700 border-green-300" },
];

function blockMeta(type) {
    return BLOCK_TYPES.find((b) => b.type === type) || { label: type, color: "bg-gray-100 text-gray-700" };
}

function ContentBlockBuilder({ blocks, setBlocks }) {
    const addBlock = (type) => setBlocks((p) => [...p, { id: Date.now(), type, value: "" }]);
    const updateBlock = (id, value) => setBlocks((p) => p.map((b) => b.id === id ? { ...b, value } : b));
    const removeBlock = (id) => setBlocks((p) => p.filter((b) => b.id !== id));
    const moveBlock = (idx, dir) => {
        setBlocks((p) => {
            const u = [...p], s = idx + dir;
            if (s < 0 || s >= u.length) return u;
            [u[idx], u[s]] = [u[s], u[idx]];
            return u;
        });
    };

    return (
        <div className="space-y-4">
            <div className="flex gap-2 flex-wrap">
                {BLOCK_TYPES.map(({ type, label, color }) => (
                    <button key={type} type="button" onClick={() => addBlock(type)}
                        className={`px-3 py-1.5 rounded text-sm font-medium border transition hover:opacity-75 ${color}`}>
                        + {label}
                    </button>
                ))}
            </div>

            {blocks.length === 0 && (
                <p className="text-gray-400 text-sm italic border border-dashed border-gray-300 rounded p-4 text-center">
                    No content blocks yet. Click a button above to add one.
                </p>
            )}

            {blocks.map((block, index) => {
                const meta = blockMeta(block.type);
                return (
                    <div key={block.id} className="border rounded-lg p-4 bg-gray-50 space-y-2">
                        <div className="flex items-center justify-between">
                            <span className={`text-xs font-semibold px-2 py-0.5 rounded uppercase tracking-wide ${meta.color}`}>
                                {meta.label}
                            </span>
                            <div className="flex items-center gap-1">
                                <button type="button" onClick={() => moveBlock(index, -1)} disabled={index === 0} className="text-gray-400 hover:text-gray-700 disabled:opacity-30 px-1">↑</button>
                                <button type="button" onClick={() => moveBlock(index, 1)} disabled={index === blocks.length - 1} className="text-gray-400 hover:text-gray-700 disabled:opacity-30 px-1">↓</button>
                                <button type="button" onClick={() => removeBlock(block.id)} className="text-red-400 hover:text-red-600 px-1 ml-1">✕</button>
                            </div>
                        </div>

                        {block.type === "h1" && <input type="text" placeholder="H1 heading..." value={block.value} onChange={(e) => updateBlock(block.id, e.target.value)} className="w-full border p-2 rounded text-2xl font-bold" />}
                        {block.type === "h2" && <input type="text" placeholder="H2 heading..." value={block.value} onChange={(e) => updateBlock(block.id, e.target.value)} className="w-full border p-2 rounded text-xl font-semibold" />}
                        {block.type === "h3" && <input type="text" placeholder="H3 heading..." value={block.value} onChange={(e) => updateBlock(block.id, e.target.value)} className="w-full border p-2 rounded text-lg font-medium" />}

                        {block.type === "p" && (
                            <div>
                                <p className="text-xs text-gray-400 mb-1">💡 Select text first, then click a toolbar button</p>
                                <RichTextEditor
                                    key={block.id}
                                    initialValue={block.value}
                                    onChange={(val) => updateBlock(block.id, val)}
                                    minHeight="120px"
                                    placeholder="Type your paragraph here..."
                                />
                            </div>
                        )}

                        {block.type === "img" && (
                            <div className="space-y-2">
                                <input type="text" placeholder="Image URL (https://...)" value={block.value} onChange={(e) => updateBlock(block.id, e.target.value)} className="w-full border p-2 rounded" />
                                {block.value && (
                                    <img src={block.value} alt="Preview" className="max-h-48 rounded border object-contain"
                                        onError={(e) => (e.target.style.display = "none")}
                                        onLoad={(e) => (e.target.style.display = "block")} />
                                )}
                            </div>
                        )}
                    </div>
                );
            })}
        </div>
    );
}

// =============================================
// FAQ BUILDER — accordion style
// =============================================
function FaqBuilder({ faqs, setFaqs }) {
    const [openId, setOpenId] = useState(null);
    const addFaq = () => setFaqs((p) => [...p, { id: Date.now(), question: "", answer: "" }]);
    const updateFaq = (id, field, val) => setFaqs((p) => p.map((f) => f.id === id ? { ...f, [field]: val } : f));
    const removeFaq = (id) => setFaqs((p) => p.filter((f) => f.id !== id));

    return (
        <div className="space-y-3">
            {faqs.length === 0 && (
                <p className="text-gray-400 text-sm italic border border-dashed border-gray-300 rounded p-4 text-center">
                    No FAQs yet. Click "Add FAQ" to get started.
                </p>
            )}
            {faqs.map((faq, index) => (
                <div key={faq.id} className="border border-amber-200 rounded-lg overflow-hidden">
                    <button
                        type="button"
                        onClick={() => setOpenId(openId === faq.id ? null : faq.id)}
                        className="w-full flex items-center justify-between px-4 py-3 bg-amber-50 hover:bg-amber-100 transition text-left"
                    >
                        <span className="font-medium text-gray-800 text-sm truncate">
                            {faq.question || <span className="text-gray-400 italic">FAQ #{index + 1} — click to edit</span>}
                        </span>
                        <span className="text-gray-500 text-xs ml-2 shrink-0">{openId === faq.id ? "▲" : "▼"}</span>
                    </button>
                    {openId === faq.id && (
                        <div className="px-4 py-4 bg-white space-y-3 border-t border-amber-100">
                            <input type="text" placeholder="Question" value={faq.question}
                                onChange={(e) => updateFaq(faq.id, "question", e.target.value)}
                                className="w-full border p-2 rounded font-medium text-sm" autoFocus />
                            <textarea placeholder="Answer..." value={faq.answer}
                                onChange={(e) => updateFaq(faq.id, "answer", e.target.value)}
                                className="w-full border p-2 rounded text-sm" rows={4} />
                            <button type="button" onClick={() => removeFaq(faq.id)} className="text-red-400 hover:text-red-600 text-xs">
                                ✕ Remove this FAQ
                            </button>
                        </div>
                    )}
                </div>
            ))}
            <button type="button" onClick={addFaq}
                className="w-full px-4 py-2 rounded border-2 border-dashed border-amber-400 text-amber-600 text-sm font-medium hover:bg-amber-50 transition">
                + Add FAQ
            </button>
        </div>
    );
}

// =============================================
// HTML BUILDER
// =============================================
function blocksToHtml(blocks) {
    return blocks.map((b) => {
        if (b.type === "h1") return `<h1>${b.value}</h1>`;
        if (b.type === "h2") return `<h2>${b.value}</h2>`;
        if (b.type === "h3") return `<h3>${b.value}</h3>`;
        if (b.type === "p") return `<p>${b.value}</p>`;
        if (b.type === "img") return `<img src="${b.value}" alt="" />`;
        return "";
    }).join("\n");
}

function faqsToHtml(faqs) {
    if (!faqs.length) return "";
    const items = faqs.map((f) =>
        `  <div class="faq-item">\n    <button class="faq-toggle">${f.question}<span class="faq-icon">▼</span></button>\n    <div class="faq-body">${f.answer}</div>\n  </div>`
    ).join("\n");
    return `<div class="faq-section">\n<h2>Frequently Asked Questions</h2>\n${items}\n</div>`;
}

// Extract plain text from HTML (for excerpt)
function htmlToPlainText(html) {
    return html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
}

// =============================================
// LIVE PREVIEW
// =============================================
function LivePreview({ blocks, faqs }) {
    const [openFaq, setOpenFaq] = useState(null);
    if (!blocks.length && !faqs.length) return null;
    return (
        <div className="space-y-2">
            <h2 className="text-xl font-semibold">Live Preview</h2>
            <div className="border rounded-lg p-6 bg-white space-y-3 shadow-inner" style={{ fontFamily: "Georgia, serif" }}>
                {blocks.map((b) => {
                    if (b.type === "h1") return <h1 key={b.id} style={{ fontSize: "1.85rem", fontWeight: 700, borderLeft: "4px solid #2563eb", paddingLeft: "0.75rem", color: "#111", lineHeight: 1.3 }}>{b.value || <em style={{ color: "#ccc", fontSize: "1rem" }}>Empty H1</em>}</h1>;
                    if (b.type === "h2") return <h2 key={b.id} style={{ fontSize: "1.5rem", fontWeight: 700, color: "#1a1a1a" }}>{b.value || <em style={{ color: "#ccc", fontSize: "1rem" }}>Empty H2</em>}</h2>;
                    if (b.type === "h3") return <h3 key={b.id} style={{ fontSize: "1.25rem", fontWeight: 600, color: "#1a1a1a" }}>{b.value || <em style={{ color: "#ccc", fontSize: "1rem" }}>Empty H3</em>}</h3>;
                    if (b.type === "p") return <div key={b.id} style={{ color: "#374151", lineHeight: 1.85 }} dangerouslySetInnerHTML={{ __html: b.value || '<em style="color:#ccc">Empty paragraph</em>' }} />;
                    if (b.type === "img") return b.value ? <img key={b.id} src={b.value} alt="" style={{ maxWidth: "100%", borderRadius: 8, margin: "0.5rem 0" }} /> : <em key={b.id} style={{ color: "#ccc", fontSize: "0.875rem" }}>No image URL</em>;
                    return null;
                })}
                {faqs.length > 0 && (
                    <div style={{ marginTop: "1.5rem", paddingTop: "1.5rem", borderTop: "2px solid #e5e7eb" }}>
                        <h2 style={{ fontSize: "1.5rem", fontWeight: 700, marginBottom: "1rem", fontFamily: "system-ui, sans-serif" }}>Frequently Asked Questions</h2>
                        {faqs.map((f) => (
                            <div key={f.id} style={{ border: "1px solid #fde68a", borderRadius: 8, marginBottom: "0.75rem", overflow: "hidden" }}>
                                <button type="button" onClick={() => setOpenFaq(openFaq === f.id ? null : f.id)}
                                    style={{ width: "100%", display: "flex", justifyContent: "space-between", padding: "0.875rem 1rem", background: "#fffbeb", border: "none", cursor: "pointer", fontWeight: 700, fontSize: "0.95rem", textAlign: "left", fontFamily: "system-ui, sans-serif" }}>
                                    {f.question || <em style={{ color: "#ccc" }}>Empty question</em>}
                                    <span style={{ marginLeft: "1rem", color: "#92400e" }}>{openFaq === f.id ? "▲" : "▼"}</span>
                                </button>
                                {openFaq === f.id && (
                                    <div style={{ padding: "1rem", background: "#fff", color: "#4b5563", fontSize: "0.95rem", lineHeight: 1.7, borderTop: "1px solid #fde68a" }}>
                                        {f.answer || <em style={{ color: "#ccc" }}>Empty answer</em>}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

// =============================================
// MAIN PAGE
// =============================================
export default function CreateBlogPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [contentBlocks, setContentBlocks] = useState([]);
    const [faqs, setFaqs] = useState([]);
    // excerpt stored as plain text — no HTML
    const [excerpt, setExcerpt] = useState("");

    const [formData, setFormData] = useState({
        title: "", slug: "", featuredImage: "",
        categories: "", tags: "", published: false,
        metaTitle: "", metaDescription: "", metaKeywords: "",
        ogTitle: "", ogDescription: "", ogImage: "", canonicalUrl: "",
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((p) => ({ ...p, [name]: type === "checkbox" ? checked : value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const htmlContent = blocksToHtml(contentBlocks);
        if (!htmlContent.trim()) {
            alert("Please add at least one content block before publishing.");
            return;
        }

        setLoading(true);


        try {
            const res = await fetch(`${api}/blogs/admin`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify({
                    ...formData,
                    excerpt: htmlToPlainText(excerpt),
                    content: htmlContent,
                    categories: formData.categories ? formData.categories.split(",").map(c => c.trim()) : [],
                    tags: formData.tags
                        ? formData.tags.split(",").map(t => t.trim()).filter(Boolean)
                        : [],
                    metaKeywords: formData.metaKeywords ? formData.metaKeywords.split(",").map(k => k.trim()) : [],
                    faqs: faqs.map(({ question, answer }) => ({ question, answer })),
                })
            });
            if (res.ok) {
                alert("Blog Created Successfully 🚀");
                router.push("/admin");
            } else {
                const data = await res.json();
                alert(data.message || "Something went wrong");
            }
        } catch (err) {
            console.error(err);
            alert("Server error");
        }
        setLoading(false);
    };

    return (
        <>
            <style>{`
                .rte-body:empty:before { content: attr(data-placeholder); color: #9ca3af; pointer-events: none; display: block; }
                .rte-body b, .rte-body strong { font-weight: 700; }
                .rte-body i, .rte-body em { font-style: italic; }
                .rte-body u { text-decoration: underline; }
                .rte-body s { text-decoration: line-through; }
                .rte-body a { color: #2563eb; text-decoration: underline; }
                .rte-body ul { list-style: disc; padding-left: 1.5rem; margin: 0.4rem 0; }
                .rte-body ol { list-style: decimal; padding-left: 1.5rem; margin: 0.4rem 0; }
                .rte-body blockquote { border-left: 4px solid #2563eb; margin: 0.5rem 0; padding: 0.5rem 1rem; background: #eff6ff; color: #1e40af; font-style: italic; }
            `}</style>

            <div className="min-h-screen bg-gray-50 p-10">
                <h1 className="text-3xl font-bold mb-8">Create New Blog</h1>

                <form onSubmit={handleSubmit} className="space-y-8 max-w-4xl bg-white p-8 rounded shadow">

                    {/* Basic Info */}
                    <section className="space-y-4">
                        <h2 className="text-xl font-semibold border-b pb-2">Basic Information</h2>
                        <input name="title" placeholder="Title" className="w-full border p-2 rounded" onChange={handleChange} required />
                        <input name="slug" placeholder="Slug (example: my-blog-title)" className="w-full border p-2 rounded" onChange={handleChange} required />

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Short Excerpt <span className="text-gray-400 font-normal">(saved as plain text — shown as intro on blog page)</span>
                            </label>
                            {/* Plain textarea for excerpt — avoids HTML mess */}
                            <textarea
                                placeholder="Write a short 1-3 sentence summary of the blog..."
                                value={excerpt}
                                onChange={(e) => setExcerpt(e.target.value)}
                                className="w-full border p-2 rounded text-gray-700"
                                rows={3}
                            />
                        </div>

                        <input name="featuredImage" placeholder="Featured Image URL" className="w-full border p-2 rounded" onChange={handleChange} />
                        <input name="categories" placeholder="Categories (comma separated)" className="w-full border p-2 rounded" onChange={handleChange} />
                        <input name="tags" placeholder="Tags (comma separated)" className="w-full border p-2 rounded" onChange={handleChange} />
                        <label className="flex items-center space-x-2">
                            <input type="checkbox" name="published" onChange={handleChange} />
                            <span>Publish Immediately</span>
                        </label>
                    </section>

                    {/* Content Builder */}
                    <section className="space-y-4">
                        <h2 className="text-xl font-semibold border-b pb-2">Blog Content</h2>
                        <p className="text-sm text-gray-500">
                            Add blocks in any order. In <strong>Paragraph</strong> blocks — select text first, then click a toolbar button.
                        </p>
                        <ContentBlockBuilder blocks={contentBlocks} setBlocks={setContentBlocks} />
                    </section>

                    {/* FAQ */}
                    <section className="space-y-4">
                        <h2 className="text-xl font-semibold border-b pb-2">FAQ Section <span className="text-sm font-normal text-gray-400">(accordion on blog page)</span></h2>
                        <FaqBuilder faqs={faqs} setFaqs={setFaqs} />
                    </section>

                    {/* Live Preview */}
                    <LivePreview blocks={contentBlocks} faqs={faqs} />

                    {/* SEO */}
                    <section className="space-y-4">
                        <h2 className="text-xl font-semibold border-b pb-2">SEO Settings</h2>
                        <input name="metaTitle" placeholder="Meta Title" className="w-full border p-2 rounded" onChange={handleChange} />
                        <textarea name="metaDescription" placeholder="Meta Description" className="w-full border p-2 rounded" rows={3} onChange={handleChange} />
                        <input name="metaKeywords" placeholder="Meta Keywords (comma separated)" className="w-full border p-2 rounded" onChange={handleChange} />
                        <input name="canonicalUrl" placeholder="Canonical URL (leave blank to auto-generate)" className="w-full border p-2 rounded" onChange={handleChange} />
                    </section>

                    {/* Open Graph */}
                    <section className="space-y-4">
                        <h2 className="text-xl font-semibold border-b pb-2">Open Graph Settings</h2>
                        <input name="ogTitle" placeholder="OG Title" className="w-full border p-2 rounded" onChange={handleChange} />
                        <textarea name="ogDescription" placeholder="OG Description" className="w-full border p-2 rounded" rows={3} onChange={handleChange} />
                        <input name="ogImage" placeholder="OG Image URL" className="w-full border p-2 rounded" onChange={handleChange} />
                    </section>

                    <button disabled={loading} className="w-full bg-black text-white px-6 py-3 rounded text-lg font-semibold hover:bg-gray-800 transition">
                        {loading ? "Creating..." : "Create Blog 🚀"}
                    </button>
                </form>
            </div>
        </>
    );
}