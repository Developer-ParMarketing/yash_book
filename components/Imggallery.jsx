"use client";

import React from "react";
import Link from "next/link";

const images = [
    { src: "https://img.freepik.com/premium-vector/creative-vector-modern-book-cover-design-company-brochure-annual-report-design-template_812472-1874.jpg?semt=ais_wordcount_boost&w=740&q=80", link: "/post/1" },
    { src: "https://img.freepik.com/premium-vector/creative-vector-modern-book-cover-design-company-brochure-annual-report-design-template_812472-1874.jpg?semt=ais_wordcount_boost&w=740&q=80", link: "/post/2" },
    { src: "https://img.freepik.com/premium-vector/creative-vector-modern-book-cover-design-company-brochure-annual-report-design-template_812472-1874.jpg?semt=ais_wordcount_boost&w=740&q=80", link: "/post/3" },
    { src: "https://img.freepik.com/premium-vector/creative-vector-modern-book-cover-design-company-brochure-annual-report-design-template_812472-1874.jpg?semt=ais_wordcount_boost&w=740&q=80", link: "/post/4" },
    { src: "https://img.freepik.com/premium-vector/creative-vector-modern-book-cover-design-company-brochure-annual-report-design-template_812472-1874.jpg?semt=ais_wordcount_boost&w=740&q=80", link: "/post/5" },
    { src: "https://img.freepik.com/premium-vector/creative-vector-modern-book-cover-design-company-brochure-annual-report-design-template_812472-1874.jpg?semt=ais_wordcount_boost&w=740&q=80", link: "/post/6" },
    { src: "https://img.freepik.com/premium-vector/creative-vector-modern-book-cover-design-company-brochure-annual-report-design-template_812472-1874.jpg?semt=ais_wordcount_boost&w=740&q=80", link: "/post/7" },
    { src: "https://img.freepik.com/premium-vector/creative-vector-modern-book-cover-design-company-brochure-annual-report-design-template_812472-1874.jpg?semt=ais_wordcount_boost&w=740&q=80", link: "/post/8" },
    { src: "https://img.freepik.com/premium-vector/creative-vector-modern-book-cover-design-company-brochure-annual-report-design-template_812472-1874.jpg?semt=ais_wordcount_boost&w=740&q=80", link: "/post/9" },
];

const Imggallery = () => {
    return (
        <section className="w-full overflow-hidden mt-5">

            <div className="flex w-full overflow-x-auto lg:overflow-hidden">

                {images.map((img, index) => (
                    <Link
                        key={index}
                        href={img.link}
                        className="
              flex-shrink-0
              w-[180px]
              sm:w-[220px]
              md:w-[260px]
              lg:w-[12.5%]
              h-[140px]
              sm:h-[160px]
              md:h-[180px]
              lg:h-[200px]
              relative
              group
              overflow-hidden
              block
            "
                    >
                        <img
                            src={img.src}
                            alt="gallery"
                            className="
                w-full
                h-full
                object-cover
                transition-transform
                duration-500
                group-hover:scale-110
              "
                        />
                    </Link>
                ))}

            </div>

        </section>
    );
};

export default Imggallery;
