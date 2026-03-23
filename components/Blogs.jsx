"use client";

import React, { useRef, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Cinzel, Cormorant_Garamond } from "next/font/google";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/navigation";
import { Autoplay, Navigation } from "swiper/modules";
import { api } from "@/app/variables";

const cinzel = Cinzel({ subsets: ["latin"], weight: ["400", "500", "600", "700"] });
const cormorant = Cormorant_Garamond({ subsets: ["latin"], weight: ["400", "500", "600"] });

const Blogs = () => {
    const prevRef = useRef(null);
    const nextRef = useRef(null);
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);

    // Fetch blogs from API
    const fetchBlogs = async () => {
        try {
            const res = await fetch(`${api}/blogs`);
            const data = await res.json();

            setBlogs(data.blogs.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
            setLoading(false);
        } catch (error) {
            console.error(error);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBlogs();
    }, []);

    if (loading) return <div className="p-10 text-center">Loading blogs...</div>;

    return (
        <section id="blogs" className="bg-[#f5f3ee] py-20 px-6 relative">
            <div className="max-w-7xl mx-auto relative">


                <div className="text-center mb-14">
                    <p className={`${cormorant.className} italic text-lg text-gray-600`}>
                        Our Latest
                    </p>
                    <h2 className={`${cinzel.className} text-4xl md:text-5xl lg:text-6xl mt-4`}>
                        Blogs
                    </h2>
                    <div className="w-16 h-px bg-gray-400 mx-auto mt-6"></div>
                </div>

                {/* Swiper Carousel */}
                {/* <Swiper
                    modules={[Autoplay, Navigation]}
                    spaceBetween={30}
                    loop={true}
                    autoplay={{ delay: 3000, disableOnInteraction: false }}
                    slidesPerView={1}
                    breakpoints={{
                        640: { slidesPerView: 2 },
                        1024: { slidesPerView: 3 },
                    }}
                    navigation={{
                        prevEl: prevRef.current,
                        nextEl: nextRef.current,
                    }}
                    onInit={(swiper) => {
                        swiper.params.navigation.prevEl = prevRef.current;
                        swiper.params.navigation.nextEl = nextRef.current;
                        swiper.navigation.init();
                        swiper.navigation.update();
                    }}
                > */}
                <Swiper
                    modules={[Autoplay, Navigation]}
                    spaceBetween={30}
                    loop={blogs.length > 1}
                    centeredSlides={blogs.length === 1}
                    autoplay={{ delay: 3000, disableOnInteraction: false }}
                    slidesPerView={1}
                    breakpoints={{
                        640: { slidesPerView: blogs.length === 1 ? 1 : 2 },
                        1024: { slidesPerView: blogs.length === 1 ? 1 : 3 },
                    }}
                    navigation={{
                        prevEl: prevRef.current,
                        nextEl: nextRef.current,
                    }}
                    onInit={(swiper) => {
                        swiper.params.navigation.prevEl = prevRef.current;
                        swiper.params.navigation.nextEl = nextRef.current;
                        swiper.navigation.init();
                        swiper.navigation.update();
                    }}
                >
                    {blogs.map((blog, index) => (
                        <SwiperSlide key={blog._id || index}>
                            <Link href={`/blog/${blog.slug}`}>
                                <div className="group cursor-pointer">
                                    <div className="overflow-hidden">
                                        <Image
                                            src={blog.featuredImage.url || "/book1.png"}
                                            // alt={blog.title}
                                            alt={blog.featuredImage.alt || blog.title}
                                            width={500}
                                            height={400}

                                            className="w-full h-[300px] object-contain bg-gray-100 group-hover:scale-105 transition duration-500"
                                        />
                                    </div>
                                    <div className={`mt-6 ${blogs.length === 1 ? "text-center" : ""}`}>
                                        <p className={`${cormorant.className} italic text-sm text-gray-500`}>
                                            {new Date(blog.datePublished).toLocaleDateString("en-US", {
                                                year: "numeric",
                                                month: "long",
                                                day: "numeric",
                                            })}
                                        </p>
                                        <h3 className={`${cinzel.className} text-xl mt-3 leading-snug uppercase`}>
                                            {blog.title}
                                        </h3>
                                        {/* <div className="border-b border-gray-300 my-4"></div>
                                        <div className="flex justify-between text-xs tracking-widest text-gray-600 uppercase">
                                            <span>{blog.category}</span>
                                            <span>{blog.comments || "0 Comments"}</span>
                                        </div> */}
                                    </div>
                                </div>
                            </Link>
                        </SwiperSlide>
                    ))}
                </Swiper>

                {/* Custom Arrows */}
                {blogs.length > 1 && (
                    <>
                        <div
                            ref={prevRef}
                            className="hidden md:flex items-center justify-center absolute -left-18 top-1/2 translate-y-1/2 z-10 cursor-pointer text-3xl font-bold text-gray-700 hover:text-black bg-white w-10 h-10 rounded-full shadow-md"
                        >
                            &#10094;
                        </div>

                        <div
                            ref={nextRef}
                            className="hidden md:flex items-center justify-center absolute -right-18 top-1/2 translate-y-1/2 z-10 cursor-pointer text-3xl font-bold text-gray-700 hover:text-black bg-white w-10 h-10 rounded-full shadow-md"
                        >
                            &#10095;
                        </div>
                    </>
                )}
            </div>
        </section>
    );
};

export default Blogs;