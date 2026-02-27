"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Head from "next/head";
import Link from "next/link";
import { api } from "@/app/variables";

export default function Page() {
    const { slug } = useParams();
    const [blog, setBlog] = useState(null);
    const [related, setRelated] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch main blog
                const res = await fetch(`${api}/blogs/admin/preview/${encodeURIComponent(slug)}`);
                const data = await res.json();
                setBlog(data.blog || null);

                // Fetch related blogs
                const relatedRes = await fetch(`${api}/blogs/admin/preview/${encodeURIComponent(slug)}`);
                const relatedData = await relatedRes.json();
                setRelated(relatedData.relatedBlogs || []);

                setLoading(false);
            } catch (err) {
                console.error(err);
                setLoading(false);
            }
        };

        fetchData();
    }, [slug]);

    if (loading) return <div className="text-center py-10">Loading...</div>;
    if (!blog) return <div className="text-center py-10">Blog not found</div>;

    return (
        <>
            {/* SEO */}
            <Head>
                <title>{blog.metaTitle || blog.title}</title>
                <meta name="description" content={blog.metaDescription || blog.excerpt || ""} />
                <meta property="og:title" content={blog.ogTitle || blog.title} />
                <meta property="og:description" content={blog.ogDescription || blog.excerpt || ""} />
                {blog.ogImage && <meta property="og:image" content={blog.ogImage} />}
            </Head>

            <div className="max-w-7xl mx-auto py-12 px-6 grid grid-cols-1 lg:grid-cols-4 gap-12">



                {/* ================= MAIN BLOG ================= */}
                <main className="lg:col-span-3">
                    <h1 className="text-4xl font-bold mb-6">{blog.title}</h1>

                    {blog.featuredImage && (
                        <div className="relative w-full h-[400px] mb-8 overflow-hidden">
                            <Image
                                src={blog.featuredImage}
                                fill
                                alt={blog.title}
                                className="object-cover"
                            />
                        </div>
                    )}

                    <p className="text-gray-500 mb-4">
                        {new Date(blog.datePublished).toLocaleDateString()} | {blog.categories?.join(", ")}
                    </p>

                    <div
                        className="prose max-w-none"
                        dangerouslySetInnerHTML={{ __html: blog.content }}
                    />
                </main>

                {/* ================= SIDEBAR ================= */}
                <aside className="lg:col-span-1">
                    <h3 className="text-xl font-semibold mb-6 border-b pb-3">
                        Related Posts
                    </h3>

                    <div className="space-y-6">
                        {related.map((item) => (
                            <Link key={item._id} href={`/blog/${item.slug}`}>
                                <div className="flex gap-4 group cursor-pointer">
                                    <div className="w-24 h-24 relative overflow-hidden flex-shrink-0">
                                        <Image
                                            src={item.featuredImage || "/book1.png"}
                                            fill
                                            alt={item.title}
                                            className="object-cover group-hover:scale-105 transition duration-300"
                                        />
                                    </div>
                                    <div className="flex-1">
                                        <h4 className="text-sm font-medium leading-snug group-hover:underline">
                                            {item.title}
                                        </h4>
                                        <p className="text-xs text-gray-500 mt-1">
                                            {new Date(item.createdAt).toLocaleDateString()}
                                        </p>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </aside>
            </div>
        </>
    );
}