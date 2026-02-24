"use client";

import React, { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Cinzel, Cormorant_Garamond } from "next/font/google";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/navigation";
import { Autoplay, Navigation } from "swiper/modules";

import { blogs } from "../app/blog/data";

const cinzel = Cinzel({ subsets: ["latin"], weight: ["400", "500", "600", "700"] });
const cormorant = Cormorant_Garamond({ subsets: ["latin"], weight: ["400", "500", "600"] });

const Blogs = () => {
    const prevRef = useRef(null);
    const nextRef = useRef(null);

    return (
        <section id="blogs" className="bg-[#f5f3ee] py-20 px-6 relative">
            <div className="max-w-7xl mx-auto relative">

                {/* Heading */}
                <div className="text-center mb-14">
                    <p className={`${cormorant.className} italic text-lg text-gray-600`}>
                        Your Shopping expo:
                    </p>
                    <h2 className={`${cinzel.className} text-4xl md:text-5xl lg:text-6xl mt-4`}>
                        New Blogs
                    </h2>
                    <div className="w-16 h-px bg-gray-400 mx-auto mt-6"></div>
                </div>

                {/* Swiper Carousel */}
                <Swiper
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
                    onBeforeInit={(swiper) => {
                        swiper.params.navigation.prevEl = prevRef.current;
                        swiper.params.navigation.nextEl = nextRef.current;
                    }}
                >
                    {blogs.map((blog, index) => (
                        <SwiperSlide key={`${blog.id}-${index}`}>
                            <Link href={`/blog/${blog.slug}`}>
                                <div className="group cursor-pointer">
                                    <div className="overflow-hidden">
                                        <Image
                                            src={blog.img}
                                            width={500}
                                            height={400}
                                            alt={blog.title}
                                            className="w-full h-75 object-cover group-hover:scale-105 transition duration-500"
                                        />
                                    </div>
                                    <div className="mt-6">
                                        <p className={`${cormorant.className} italic text-sm text-gray-500`}>
                                            {blog.date}
                                        </p>
                                        <h3 className={`${cinzel.className} text-xl mt-3 leading-snug uppercase`}>
                                            {blog.title}
                                        </h3>
                                        <div className="border-b border-gray-300 my-4"></div>
                                        <div className="flex justify-between text-xs tracking-widest text-gray-600 uppercase">
                                            <span>{blog.category}</span>
                                            <span>{blog.comments}</span>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </SwiperSlide>
                    ))}
                </Swiper>

                {/* Custom Arrows */}
                <div
                    ref={prevRef}
                    className="hidden md:flex absolute -left-6.25 top-1/2 -translate-y-1/2 z-10 cursor-pointer text-3xl font-bold text-gray-700 hover:text-black"
                >
                    &#10094;
                </div>
                <div
                    ref={nextRef}
                    className="hidden md:flex absolute -right-6.25 top-1/2 -translate-y-1/2 z-10 cursor-pointer text-3xl font-bold text-gray-700 hover:text-black"
                >
                    &#10095;
                </div>
            </div>
        </section>
    );
};

export default Blogs;