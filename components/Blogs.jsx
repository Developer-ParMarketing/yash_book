"use client";

import React from "react";
import Slider from "react-slick";
import Image from "next/image";
import { Cinzel, Cormorant_Garamond } from "next/font/google";
import Link from "next/link";
import { blogs } from "../app/blog/data";

const cinzel = Cinzel({
    subsets: ["latin"],
    weight: ["400", "500", "600", "700"],
});

const cormorant = Cormorant_Garamond({
    subsets: ["latin"],
    weight: ["400", "500", "600"],
});


const Blogs = () => {
    const settings = {
        dots: false,
        infinite: true,
        speed: 600,
        slidesToShow: 3,
        slidesToScroll: 1,
        arrows: false,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                },
            },
            {
                breakpoint: 640,
                settings: {
                    slidesToShow: 1,
                },
            },
        ],
    };

    return (
        <section className="bg-[#f5f3ee] py-20 px-6">
            <div className="max-w-7xl mx-auto">

                {/* Heading */}
                <div className="text-center mb-14">
                    <p className={`${cormorant.className} italic text-lg text-gray-600`}>
                        Your Shopping expo:
                    </p>

                    <h2
                        className={`${cinzel.className} text-4xl md:text-5xl lg:text-6xl mt-4`}
                    >
                        New Literature Posts
                    </h2>

                    <div className="w-16 h-[1px] bg-gray-400 mx-auto mt-6"></div>
                </div>

                {/* Carousel */}
                <Slider {...settings}>
                    {blogs.map((blog) => (
                        <div key={blog.id} className="px-4">
                            <Link href={`/blog/${blog.slug}`}>
                                <div className="group cursor-pointer">

                                    {/* Image */}
                                    <div className="overflow-hidden">
                                        <Image
                                            src={blog.img}
                                            width={500}
                                            height={400}
                                            alt={blog.title}
                                            className="w-full h-[300px] object-cover group-hover:scale-105 transition duration-500"
                                        />
                                    </div>

                                    {/* Content */}
                                    <div className="mt-6">

                                        <p className={`${cormorant.className} italic text-sm text-gray-500`}>
                                            {blog.date}
                                        </p>

                                        <h3
                                            className={`${cinzel.className} text-xl mt-3 leading-snug uppercase`}
                                        >
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
                        </div>
                    ))}
                </Slider>

            </div>
        </section>
    );
};

export default Blogs;