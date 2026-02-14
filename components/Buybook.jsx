"use client";

import React from "react";
import { Cinzel, Cormorant_Garamond } from "next/font/google";

const cinzel = Cinzel({
    subsets: ["latin"],
    weight: ["400", "500", "600", "700"],
});

const cormorant = Cormorant_Garamond({
    subsets: ["latin"],
    weight: ["400", "500", "600"],
});

const Buybook = () => {
    return (
        <section className="w-full bg-[#f3f1ea] py-20 px-6 md:px-14 lg:px-20">

            <div className="max-w-7xl xl:max-w-[1400px] mx-auto">

                <div className="flex flex-col lg:flex-row items-center gap-14 lg:gap-20 xl:gap-28">

                    {/* LEFT BOOK IMAGE */}
                    <div className="w-full lg:w-1/2 flex justify-center lg:justify-start">
                        <img
                            src="https://img.freepik.com/premium-vector/creative-vector-modern-book-cover-design-company-brochure-annual-report-design-template_812472-1874.jpg"
                            alt="Book Cover"
                            className="
                w-[260px]
                sm:w-[320px]
                md:w-[360px]
                lg:w-[420px]
                xl:w-[460px]
                object-contain
                drop-shadow-2xl
              "
                        />
                    </div>

                    {/* RIGHT CONTENT */}
                    <div className="w-full lg:w-1/2 space-y-6 text-center lg:text-left">

                        <p className={`${cormorant.className} italic tracking-wide text-base md:text-lg leading-relaxed text-gray-700`}>
                            Buy the Book
                        </p>

                        <h2
                            className={`
                ${cinzel.className}
                text-3xl md:text-4xl lg:text-5xl
                tracking-wide
              `}
                        >
                            Choose to Keep Going, Differently.
                        </h2>

                        <p className={`${cormorant.className} text-base md:text-lg leading-relaxed text-gray-700`}>
                            <strong>Read an Excerpt:</strong><br />
                            "Most people don't say, 'I don't want to quit.' They say, 'I can't quit.'
                            That distinction matters. Paralysis is not a personal flaw. Multiple
                            constraints are active at once, and the cost of leaving outweighs the
                            benefit. That is not a weakness. That is decision-making under pressure."
                        </p>

                        <p className={`${cormorant.className} text-base`}>
                            <strong>Formats:</strong> Available in Print and eBook.
                        </p>

                        {/* PURCHASE BUTTONS */}
                        <div className="flex flex-wrap gap-4 pt-4 justify-center lg:justify-start">

                            <button className="px-5 py-2 border border-black text-sm tracking-wide hover:bg-black hover:text-white transition">
                                Amazon KDP (International)
                            </button>

                            <button className="px-5 py-2 border border-black text-sm tracking-wide hover:bg-black hover:text-white transition">
                                Notion Press / Flipkart (India)
                            </button>

                            <button className="px-5 py-2 border border-black text-sm tracking-wide hover:bg-black hover:text-white transition">
                                Draft2Digital
                            </button>

                            <button className="px-5 py-2 border border-black text-sm tracking-wide hover:bg-black hover:text-white transition">
                                Amazon India
                            </button>

                        </div>

                    </div>

                </div>
            </div>
        </section>
    );
};

export default Buybook;
