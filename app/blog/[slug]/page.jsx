import Image from "next/image";
import Link from "next/link";
import { api } from "@/app/variables";
import FaqSection from "@/components/FaqSection";
import { Cinzel, Cormorant_Garamond } from "next/font/google";
import LikeButton from "@/components/LikeButton";
import CommentSection from "@/components/CommentSection";
import BlogStats from "@/components/BlogStats";
import { FaEye } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { FaComment } from "react-icons/fa";
import ShareButton from "@/components/ShareButton";

const cinzel = Cinzel({
    subsets: ["latin"],
    weight: ["400", "500", "600", "700"],
});

const cormorant = Cormorant_Garamond({
    subsets: ["latin"],
    weight: ["400", "500", "600"],
});


// =============================================
// Metadata
// =============================================
export async function generateMetadata({ params }) {
    const { slug } = await params;
    try {
        const res = await fetch(`${api}/blogs/post/${encodeURIComponent(slug)}`, { cache: "no-store" });
        const data = await res.json();
        const blog = data.blog;
        if (!blog) return { title: "Blog Not Found" };

        const cleanExcerpt =
            blog.metaDescription ||
            blog.excerpt ||
            blog.content?.replace(/<[^>]*>?/gm, "").slice(0, 160) ||
            "";
        const siteUrl = "https://yashasviprasad.com";

        return {
            title: blog.title,
            description: cleanExcerpt,
            keywords: blog.tags?.join(", ") || "",
            openGraph: {
                title: blog.title,
                description: cleanExcerpt,
                url: `${siteUrl}/blog/${slug}`,
                type: "article",
                publishedTime: blog.datePublished,
                images: blog.ogImage ? [{ url: blog.ogImage, width: 1200, height: 630, alt: blog.title }] : [],
            },
            twitter: {
                card: "summary_large_image",
                title: blog.title,
                description: cleanExcerpt,
                images: blog.ogImage ? [blog.ogImage] : [],
            },
            alternates: { canonical: `${siteUrl}/blog/${slug}` },
        };
    } catch {
        return { title: "Blog" };
    }
}

// =============================================
// Data fetching
// =============================================
async function getBlogData(slug) {
    try {
        const [blogRes, relatedRes] = await Promise.all([
            fetch(`${api}/blogs/post/${encodeURIComponent(slug)}`, { cache: "no-store" }),
            fetch(`${api}/blogs/related/${encodeURIComponent(slug)}`, { cache: "no-store" }),
        ]);
        const blogData = await blogRes.json();
        const relatedData = await relatedRes.json();
        return { blog: blogData.blog || null, related: relatedData.relatedBlogs || [] };
    } catch (err) {
        console.error("Fetch error:", err);
        return { blog: null, related: [] };
    }
}

function stripHtml(html) {
    return html?.replace(/<[^>]*>?/gm, "").trim() || "";
}

function sanitizeElementorHtml(html) {
    if (!html) return "";

    return html
        .replace(/(?<!\-)(width)\s*:\s*\d+(\.\d+)?px/gi, "width: 100%")
        .replace(/height\s*:\s*\d+(\.\d+)?px/gi, "height: auto")
        .replace(/--content-width:[^;]+;/gi, "")
        .replace(/max-width\s*:\s*min\([^)]+\)/gi, "max-width: 100%")

        // ✅ Fix Quill bullet lists
        .replace(/<ol>([\s\S]*?)<\/ol>/g, (match) => {
            if (match.includes('data-list="bullet"')) {
                return match.replace(/<ol>/g, "<ul>").replace(/<\/ol>/g, "</ul>");
            }
            return match;
        })

        // remove quill UI artifacts
        .replace(/<span class="ql-ui"[^>]*><\/span>/g, "")

        // remove bullet attribute
        .replace(/ data-list="bullet"/g, "");
}

// =============================================
// Blog Content
// =============================================
function BlogContent({ content, faqs }) {
    if (!content) return null;

    // ✅ Remove the embedded FAQ HTML from content to avoid duplication
    const cleanedContent = content.replace(
        /<div[^>]*class="faq-section"[\s\S]*?<\/div>\s*<\/div>\s*<\/div>/gi,
        ""
    );

    return (
        <>
            <div
                className="blog-content"
                dangerouslySetInnerHTML={{
                    __html: sanitizeElementorHtml(cleanedContent),
                }}
            />

            {faqs?.length > 0 && <FaqSection faqs={faqs} />}
        </>
    );
}

// =============================================
// Page
// =============================================
export default async function Page({ params }) {
    const { slug } = await params;
    const { blog, related } = await getBlogData(slug);

    if (!blog) return (
        <div className="flex items-center justify-center min-h-[60vh]">
            <p className="text-gray-500 text-base">Blog not found.</p>
        </div>
    );

    return (
        <>
            <style>{`
                /* ── Elementor override ── */
                .blog-content { overflow-x: hidden; min-width: 0; }
                .blog-content * { box-sizing: border-box !important; max-width: 100% !important; }
                .blog-content div { width: auto !important; min-width: 0 !important; }
                .blog-content [class*="elementor"],
                .blog-content [class*="e-con"] {
                    width: 100% !important;
                    max-width: 100% !important;
                    min-width: 0 !important;
                    height: auto !important;
                }

                /* ── Typography ── */
                .blog-content {
     font-family: ${cormorant.style.fontFamily};
    font-size: 1.05rem;
    line-height: 1.9;
    color: #1f2937;
    text-transform: none;
}
                .blog-content h1 {
                     font-family: ${cinzel.style.fontFamily};
                    font-size: clamp(1.35rem, 3vw, 1.75rem);
                    font-weight: 700; color: #111827;
                    margin: 2.5rem 0 1rem; line-height: 1.3;
                    border-left: 4px solid #2563eb; padding-left: 14px;
                }
                .blog-content h2 {
                     font-family: ${cinzel.style.fontFamily};
                    font-size: clamp(1.15rem, 2.5vw, 1.4rem);
                    font-weight: 700; color: #111827;
                    margin: 2.2rem 0 0.75rem;
                }
                .blog-content h3 {
                     font-family: ${cinzel.style.fontFamily};
                    font-size: 1.1rem; font-weight: 600;
                    color: #111827; margin: 1.8rem 0 0.5rem;
                }
                .blog-content h4 {
                     font-family: ${cinzel.style.fontFamily};
                    font-size: 1.05rem; font-weight: 600;
                    color: #111827; margin: 1.6rem 0 0.5rem;
                }
    .blog-content p {
    margin: 0 0 1rem;
    color: #374151;
    line-height: 1.85;
}

/* remove empty paragraphs */
.blog-content p:empty {
    display: none;
}

/* fix paragraphs containing only <br> */
.blog-content p br:only-child {
    display: none;
}
                .blog-content img {
                    width: 100%; height: auto; border-radius: 12px;
                    margin: 2rem 0; box-shadow: 0 4px 20px rgba(0,0,0,0.1); display: block;
                }
                .blog-content ul {
  list-style: disc;
  padding-left: 1.5rem;
}

.blog-content ol {
  list-style: decimal;
  padding-left: 1.5rem;
}

.blog-content li {
  margin-bottom: 0.45rem;
  line-height: 1.75;
}
                .blog-content li { margin-bottom: 0.45rem; line-height: 1.75; }
                .blog-content blockquote {
                    border-left: 4px solid #2563eb; margin: 2rem 0;
                    padding: 1rem 1.25rem; background: #eff6ff;
                    border-radius: 0 8px 8px 0; color: #1e40af; font-style: italic;
                }
                .blog-content strong { font-weight: 700; color: #111; }
                .blog-content a { color: #2563eb; text-decoration: underline; }
                .blog-content a:hover { color: #1d4ed8; }
                .blog-content table { width: 100%; border-collapse: collapse; margin: 2rem 0; font-size: 0.92rem; overflow-x: auto; display: block; }
                .blog-content th { background: #f1f5f9; padding: 0.7rem 1rem; text-align: left; font-weight: 600; border: 1px solid #e2e8f0; white-space: nowrap; }
                .blog-content td { padding: 0.7rem 1rem; border: 1px solid #e2e8f0; vertical-align: top; }
                .blog-content tr:nth-child(even) td { background: #f8fafc; }

                /* WhatsApp CTA styling */
                .blog-content [style*="border-color: rgb(97, 206, 112)"] {
                    border: 2px solid #22c55e !important;
                    border-radius: 8px !important;
                    padding: 12px 16px !important;
                    background: #f0fdf4 !important;
                    margin: 1.5rem 0 !important;
                }

                /* FAQ styles (server-rendered, no JS toggle — show all open) */
                /* FAQ Section */
.faq-section {
  margin-top: 60px;
  padding-top: 36px;
  border-top: 2px solid #e5e7eb;
}

/* FAQ Title */
.faq-section h2 {
  font-size: 1.6rem;
  font-weight: 700;
  color: #111827;
  margin-bottom: 24px;
  font-family: ${cinzel.style.fontFamily};
  letter-spacing: 0.4px;
}

/* FAQ Card */
.faq-item {
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  margin-bottom: 12px;
  overflow: hidden;
  background: #ffffff;
  transition: all 0.25s ease;
}

.faq-item:hover {
  border-color: #cbd5f5;
  box-shadow: 0 6px 18px rgba(0,0,0,0.06);
}

/* Question */
.faq-toggle {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 14px;

  padding: 16px 20px;

  font-weight: 600;
  font-size: 1rem;
  color: #1f2937;
  font-family: ${cinzel.style.fontFamily};

  text-align: left;
  background: #f9fafb;
  border: none;
  cursor: pointer;
  transition: background 0.2s ease;
}

.faq-toggle:hover {
  background: #f1f5f9;
}

/* Answer */
.faq-body {
  padding: 18px 20px;
  font-size: 1rem;
  line-height: 1.8;
  color: #374151;
  background: #ffffff;
  border-top: 1px solid #e5e7eb;
  font-family: ${cormorant.style.fontFamily};
}

/* Arrow icon */
.faq-icon {
  font-size: 0.75rem;
  color: #6b7280;
  transition: transform 0.25s ease;
  flex-shrink: 0;
}

/* Rotate arrow when open */
.faq-item.open .faq-icon {
  transform: rotate(180deg);
}
            `}</style>

            <div className={`${cormorant.className} bg-gray-50 min-h-screen overflow-x-hidden`}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12 lg:py-14">
                    <div className="flex flex-col lg:flex-row gap-10 lg:gap-14">

                        {/* ── Main Article ── */}
                        <main className="min-w-0 flex-1">

                            {/* Meta row */}
                            <div className="flex items-center flex-wrap gap-2 mb-5">
                                {blog.categories?.map((cat, index) => (
                                    <span
                                        key={`${cat}-${index}`}
                                        className="text-xs font-semibold uppercase tracking-wider text-blue-700 bg-blue-50 border border-blue-200 px-3 py-1 rounded-full"
                                    >
                                        {cat}
                                    </span>
                                ))}
                                {blog.categories?.length > 0 && (
                                    <span className="w-1 h-1 rounded-full bg-gray-300 inline-block" />
                                )}
                                <span className="text-lg">
                                    {new Date(blog.datePublished).toLocaleDateString("en-IN", {
                                        day: "numeric", month: "long", year: "numeric",
                                    })}
                                </span>

                                <span className="w-1 h-1 rounded-full bg-gray-300 inline-block" />
                                <span className="text-lg capitalize">
                                    yashasvi prasad
                                </span>
                            </div>

                            {/* Title */}
                            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight mb-5 tracking-tight">
                                {blog.title}
                            </h1>
                            <BlogStats
                                views={blog.views}
                                initialLikes={blog.likes}
                                initialComments={blog.comments?.length}
                            />
                            {/* Excerpt */}
                            {blog.excerpt && (
                                <p className="text-base sm:text-lg text-black italic border-l-4 border-blue-500 pl-4 mb-8 leading-relaxed">
                                    {blog.excerpt}
                                </p>
                            )}

                            {/* Featured Image */}
                            {blog.featuredImage && (
                                <div className="w-full mb-10 rounded-2xl overflow-hidden shadow-xl bg-gray-100">
                                    <Image
                                        src={blog.featuredImage}
                                        alt={blog.title}
                                        width={1200}
                                        height={630}
                                        className="w-full h-auto object-contain"
                                        priority
                                    />
                                </div>
                            )}

                            {/* Content */}
                            <BlogContent content={blog.content} faqs={blog.faqs} />

                            {/* Like Button */}
                            <div className="mt-10 flex items-center gap-4">
                                <LikeButton
                                    slug={blog.slug}
                                    initialLikes={blog.likes}
                                />

                                <ShareButton
                                    slug={blog.slug}
                                    initialShares={blog.shares}
                                />
                            </div>


                            <CommentSection
                                slug={blog.slug}
                                comments={blog.comments}
                            />

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

                        {/* ── Desktop Sidebar ── */}
                        <aside className="hidden lg:block w-72 flex-shrink-0">
                            <div className="sticky top-8">
                                <p className="text-xs font-bold uppercase tracking-widest  pb-3 border-b border-gray-200 mb-5">
                                    Related Posts
                                </p>
                                {related.length === 0 && (
                                    <p className="text-sm  italic">No related posts found.</p>
                                )}
                                <div className="divide-y divide-gray-100">
                                    {related.map((item) => (
                                        <Link
                                            key={item._id}
                                            href={`/blog/${item.slug}`}
                                            className="flex gap-3 py-4 group hover:opacity-75 transition-opacity"
                                        >
                                            <div className="relative w-[68px] h-[68px] rounded-xl overflow-hidden flex-shrink-0 bg-gray-200">
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

                    {/* ── Mobile Related Posts ── */}
                    {related.length > 0 && (
                        <div className="lg:hidden mt-12 pt-8 border-t border-gray-200">
                            <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-5">
                                Related Posts
                            </p>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
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
        </>
    );
}