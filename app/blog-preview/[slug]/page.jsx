"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { api } from "@/app/variables";

// =============================================
// Strip Elementor fixed pixel widths/heights
// =============================================
function sanitizeElementorHtml(html) {
    if (!html) return "";
    return html
        .replace(/(?<!\-)(width)\s*:\s*\d+(\.\d+)?px/gi, "width: 100%")
        .replace(/height\s*:\s*\d+(\.\d+)?px/gi, "height: auto")
        .replace(/--content-width:[^;]+;/gi, "")
        .replace(/max-width\s*:\s*min\([^)]+\)/gi, "max-width: 100%");
}

// =============================================
// FAQ Accordion
// =============================================
function FaqSection({ html }) {
    const [openIndex, setOpenIndex] = useState(null);
    const faqs = [];

    if (typeof window !== "undefined") {
        const parser = new window.DOMParser();
        const doc = parser.parseFromString(html, "text/html");
        doc.querySelectorAll(".faq-item").forEach((item) => {
            const btn = item.querySelector(".faq-toggle");
            const body = item.querySelector(".faq-body");
            if (btn && body) {
                const icon = btn.querySelector(".faq-icon");
                if (icon) icon.remove();
                faqs.push({ question: btn.textContent.trim(), answer: body.innerHTML.trim() });
            }
        });
    }

    if (faqs.length === 0) return null;

    return (
        <div className="mt-12 pt-10 border-t-2 border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
            <div className="space-y-3">
                {faqs.map((faq, i) => {
                    const isOpen = openIndex === i;
                    return (
                        <div
                            key={i}
                            className={`border rounded-xl overflow-hidden transition-all duration-200 ${isOpen ? "border-blue-300 shadow-md shadow-blue-50" : "border-gray-200"
                                }`}
                        >
                            <button
                                onClick={() => setOpenIndex(isOpen ? null : i)}
                                aria-expanded={isOpen}
                                className={`w-full flex items-center justify-between gap-3 px-5 py-4 text-left text-sm font-semibold transition-colors duration-150 ${isOpen
                                    ? "bg-blue-50 text-blue-700"
                                    : "bg-gray-50 text-gray-800 hover:bg-blue-50"
                                    }`}
                            >
                                <span>{faq.question}</span>
                                <span
                                    className={`text-xs flex-shrink-0 transition-transform duration-250 ${isOpen ? "rotate-180 text-blue-500" : "text-gray-400"
                                        }`}
                                >
                                    ▼
                                </span>
                            </button>
                            {isOpen && (
                                <div
                                    className="px-5 py-4 text-sm leading-relaxed text-gray-600 bg-white border-t border-gray-100"
                                    dangerouslySetInnerHTML={{ __html: faq.answer }}
                                />
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

// =============================================
// Blog Content renderer
// =============================================
function BlogContent({ content }) {
    if (!content) return null;
    const isHtml = /<\/?[a-z][\s\S]*>/i.test(content);

    if (isHtml) {
        const faqIdx = content.search(/<div class="faq-section">/i);
        const mainHtml = faqIdx > -1 ? content.slice(0, faqIdx) : content;
        const hasFaq = faqIdx > -1;
        return (
            <>
                <style>{`
                    .blog-content { overflow-x: hidden; min-width: 0; }
                    .blog-content * { box-sizing: border-box !important; max-width: 100% !important; }
                    .blog-content div { width: auto !important; min-width: 0 !important; }
                    .blog-content [class*="elementor"],
                    .blog-content [class*="e-con"] {
                        width: 100% !important; max-width: 100% !important;
                        min-width: 0 !important; height: auto !important;
                    }
                    .blog-content p { margin: 0 0 1.3rem; color: #374151; line-height: 1.85; font-size: 1.05rem; }
                    .blog-content h1 { font-size: 1.6rem; font-weight: 700; color: #111827; margin: 2.5rem 0 1rem; border-left: 4px solid #2563eb; padding-left: 12px; }
                    .blog-content h2 { font-size: 1.35rem; font-weight: 700; color: #111827; margin: 2.2rem 0 0.75rem; }
                    .blog-content h3 { font-size: 1.1rem; font-weight: 600; color: #1d4ed8; margin: 1.8rem 0 0.5rem; }
                    .blog-content h4 { font-size: 1.1rem; font-weight: 600; color: #111827; margin: 1.6rem 0 0.5rem; }
                    .blog-content ul, .blog-content ol { margin: 0 0 1.3rem 1.4rem; color: #374151; }
                    .blog-content li { margin-bottom: 0.45rem; line-height: 1.7; }
                    .blog-content blockquote { border-left: 4px solid #2563eb; margin: 2rem 0; padding: 1rem 1.25rem; background: #eff6ff; border-radius: 0 8px 8px 0; color: #1e40af; font-style: italic; }
                    .blog-content strong { font-weight: 700; color: #111; }
                    .blog-content a { color: #2563eb; text-decoration: underline; }
                    .blog-content a:hover { color: #1d4ed8; }
                    .blog-content img { width: 100%; height: auto; border-radius: 12px; margin: 2rem 0; box-shadow: 0 4px 20px rgba(0,0,0,0.1); display: block; }
                    .blog-content table { width: 100%; border-collapse: collapse; margin: 2rem 0; font-size: 0.92rem; }
                    .blog-content th { background: #f1f5f9; padding: 0.7rem 1rem; text-align: left; font-weight: 600; border: 1px solid #e2e8f0; }
                    .blog-content td { padding: 0.7rem 1rem; border: 1px solid #e2e8f0; vertical-align: top; }
                    .blog-content tr:nth-child(even) td { background: #f8fafc; }
                    /* WhatsApp CTA box */
                    .blog-content [class*="icon-list"] { background: transparent !important; }
                    .blog-content [style*="border-color: rgb(97, 206, 112)"] {
                        border: 2px solid #22c55e !important;
                        border-radius: 8px !important;
                        padding: 12px !important;
                        background: #f0fdf4 !important;
                        margin: 1.5rem 0 !important;
                    }
                `}</style>
                <div
                    className="blog-content"
                    dangerouslySetInnerHTML={{ __html: sanitizeElementorHtml(mainHtml) }}
                />
                {hasFaq && <FaqSection html={content} />}
            </>
        );
    }

    return (
        <div className="space-y-4 text-gray-700 leading-relaxed">
            {content.split(/\n\n+/).filter(Boolean).map((para, i) => (
                <p key={i}>{para.trim()}</p>
            ))}
        </div>
    );
}

// =============================================
// Main Page
// =============================================
export default function Page() {
    const { slug } = useParams();
    const [blog, setBlog] = useState(null);
    const [related, setRelated] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [blogRes, relatedRes] = await Promise.all([
                    fetch(`${api}/blogs/admin/preview/${encodeURIComponent(slug)}`),
                    fetch(`${api}/blogs/related/${encodeURIComponent(slug)}`)
                ]);

                const blogData = await blogRes.json();
                const relatedData = await relatedRes.json();

                setBlog(blogData.blog || null);
                setRelated(relatedData.relatedBlogs || []);

            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [slug]);

    if (loading) return (
        <div className="flex items-center justify-center min-h-[60vh]">
            <div className="text-center">
                <div className="w-10 h-10 border-4 border-gray-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-3" />
                <p className="text-gray-500 text-sm">Loading article…</p>
            </div>
        </div>
    );

    if (!blog) return (
        <div className="flex items-center justify-center min-h-[60vh]">
            <p className="text-gray-500">Blog not found.</p>
        </div>
    );

    return (
        <div className=" min-h-screen overflow-x-hidden">

            {/* Preview Banner */}
            <div className="bg-yellow-300 text-yellow-900 text-center text-xs font-semibold tracking-widest uppercase py-2 px-4 border-b border-yellow-400">
                Preview Mode
            </div>

            {/* Page layout */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12 lg:py-14">
                <div className="flex flex-col lg:flex-row gap-10 lg:gap-14">

                    {/* ── Main Article ── */}
                    <main className="min-w-0 flex-1">

                        {/* Meta row */}
                        <div className="flex items-center flex-wrap gap-2 mb-5">
                            {blog.categories?.map((cat) => (
                                <span
                                    key={cat}
                                    className="text-xs font-semibold uppercase tracking-wider text-blue-700 bg-blue-50 border border-blue-200 px-3 py-1 rounded-full"
                                >
                                    {cat}
                                </span>
                            ))}
                            {blog.categories?.length > 0 && (
                                <span className="w-1 h-1 rounded-full bg-gray-300 inline-block" />
                            )}
                            <span className="text-xs text-gray-400">
                                {new Date(blog.datePublished || blog.createdAt).toLocaleDateString("en-IN", {
                                    day: "numeric", month: "long", year: "numeric",
                                })}
                            </span>
                        </div>

                        {/* Title */}
                        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 leading-tight mb-5 tracking-tight">
                            {blog.title}
                        </h1>

                        {/* Excerpt */}
                        {blog.excerpt && (
                            <p className="text-base sm:text-lg text-gray-500 italic border-l-4 border-blue-500 pl-4 mb-8 leading-relaxed">
                                {blog.excerpt}
                            </p>
                        )}

                        {/* Featured Image */}
                        {blog.featuredImage && (
                            <div className="relative w-full h-56 sm:h-80 lg:h-[420px] rounded-2xl overflow-hidden mb-10 shadow-xl">
                                <Image
                                    src={blog.featuredImage}
                                    alt={blog.title}
                                    fill
                                    className="object-cover"
                                    priority
                                />
                            </div>
                        )}

                        {/* Content */}
                        <BlogContent content={blog.content} />

                        {/* Tags */}
                        {blog.tags?.length > 0 && (
                            <div className="mt-10 pt-6 border-t border-gray-200 flex flex-wrap gap-2">
                                {blog.tags.map((tag) => (
                                    <span
                                        key={tag}
                                        className="text-xs text-gray-500 bg-gray-100 border border-gray-200 px-3 py-1 rounded-full"
                                    >
                                        #{tag}
                                    </span>
                                ))}
                            </div>
                        )}
                    </main>

                    {/* ── Sidebar ── */}
                    <aside className="hidden lg:block w-72 flex-shrink-0">
                        <div className="sticky top-8">
                            <p className="text-xs font-bold uppercase tracking-widest text-gray-400 pb-3 border-b border-gray-200 mb-5">
                                Related Posts
                            </p>

                            {related.length === 0 && (
                                <p className="text-sm text-gray-400 italic">No related posts found.</p>
                            )}

                            <div className="divide-y divide-gray-100">
                                {related.map((item) => (
                                    <Link
                                        key={item._id}
                                        href={`/blog/${item.slug}`}
                                        className="flex gap-3 py-4 group hover:opacity-75 transition-opacity"
                                    >
                                        <div className="relative w-[72px] h-[72px] rounded-xl overflow-hidden flex-shrink-0 bg-gray-200">
                                            <Image
                                                src={item.featuredImage || "/book1.png"}
                                                alt={item.title}
                                                fill
                                                className="object-cover group-hover:scale-105 transition-transform duration-300"
                                            />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-medium text-gray-800 leading-snug line-clamp-3">
                                                {item.title}
                                            </p>
                                            <p className="text-xs text-gray-400 mt-1">
                                                {new Date(item.createdAt).toLocaleDateString("en-IN", {
                                                    day: "numeric", month: "short", year: "numeric",
                                                })}
                                            </p>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </aside>

                </div>

                {/* Mobile Related Posts */}
                {related.length > 0 && (
                    <div className="lg:hidden mt-12 pt-8 border-t border-gray-200">
                        <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-5">
                            Related Posts
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {related.map((item) => (
                                <Link
                                    key={item._id}
                                    href={`/blog/${item.slug}`}
                                    className="flex gap-3 p-3 bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
                                >
                                    <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 bg-gray-200">
                                        <Image
                                            src={item.featuredImage || "/book1.png"}
                                            alt={item.title}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-medium text-gray-800 leading-snug line-clamp-2">
                                            {item.title}
                                        </p>
                                        <p className="text-xs text-gray-400 mt-1">
                                            {new Date(item.createdAt).toLocaleDateString("en-IN", {
                                                day: "numeric", month: "short", year: "numeric",
                                            })}
                                        </p>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                )}

            </div>
        </div>
    );
}