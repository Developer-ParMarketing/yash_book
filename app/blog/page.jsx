"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Cinzel, Cormorant_Garamond } from "next/font/google";
import { api } from "@/app/variables";

const cinzel = Cinzel({
    subsets: ["latin"],
    weight: ["400", "500", "600", "700"],
});

const cormorant = Cormorant_Garamond({
    subsets: ["latin"],
    weight: ["400", "500", "600"],
});

const Page = () => {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);

    //  Fetch Blogs
    const fetchBlogs = async () => {
        try {
            const res = await fetch(`${api}/blogs`);
            const data = await res.json();

            setBlogs(
                data.blogs.sort(
                    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
                )
            );

            setLoading(false);
        } catch (err) {
            console.error(err);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBlogs();
    }, []);

    if (loading) {
        return (
            <div className="p-20 text-center text-lg">
                Loading blogs...
            </div>
        );
    }

    return (
        <section className="bg-[#f5f3ee] py-16 px-4 md:px-8">
            <div className="max-w-7xl mx-auto">

                {/*  Heading */}
                <div className="text-center mb-14">
                    <p className={`${cormorant.className} italic text-lg text-gray-600`}>
                        Our Latest
                    </p>
                    <h1 className={`${cinzel.className} text-4xl md:text-5xl lg:text-6xl mt-4`}>
                        Blogs
                    </h1>
                    <div className="w-16 h-px bg-gray-400 mx-auto mt-6"></div>
                </div>

                {/*  Blog Grid */}
                <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">

                    {blogs.map((blog) => (
                        <Link key={blog._id} href={`/blog/${blog.slug}`}>
                            <div className="group cursor-pointer bg-white shadow-sm hover:shadow-md transition rounded overflow-hidden">

                                {/* Image */}
                                <div className="overflow-hidden">
                                    <Image
                                        src={blog.featuredImage?.url || "/book1.png"}
                                        alt={blog.featuredImage?.alt || blog.title}
                                        width={500}
                                        height={350}
                                        className="w-full h-[250px] object-cover group-hover:scale-105 transition duration-500"
                                    />
                                </div>

                                {/* Content */}
                                <div className="p-5">

                                    {/* Date */}
                                    <p className={`${cormorant.className} italic text-sm text-gray-500`}>
                                        {new Date(blog.datePublished || blog.createdAt).toLocaleDateString(
                                            "en-US",
                                            {
                                                year: "numeric",
                                                month: "long",
                                                day: "numeric",
                                            }
                                        )}
                                    </p>

                                    {/* Title */}
                                    <h2 className={`${cinzel.className} text-xl mt-3 leading-snug uppercase`}>
                                        {blog.title}
                                    </h2>

                                    {/* Description */}
                                    <p className="text-sm text-gray-600 mt-3 line-clamp-3">
                                        {blog.excerpt || blog.description || "Read more..."}
                                    </p>

                                    {/* Read More */}
                                    <div className="mt-4 text-sm font-medium text-black underline">
                                        Read More →
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}


                </div>

                {/*  Empty State */}
                {blogs.length === 0 && (
                    <div className="text-center py-20 text-gray-500">
                        No blogs found
                    </div>
                )}
            </div>
        </section>
    );
};

export default Page;