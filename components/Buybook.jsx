"use client";

import React from "react";
import { Cinzel, Cormorant_Garamond } from "next/font/google";
import { FaAmazon } from "react-icons/fa";
import { SiFlipkart } from "react-icons/si";
import { MdMenuBook } from "react-icons/md";
import { BsGlobe } from "react-icons/bs";
import Image from "next/image";


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
        <section id="Buy_the_Book" className="w-full bg-[#f3f1ea] py-16 px-6 md:px-14 lg:px-20">

            <div className="max-w-7xl xl:max-w-[1400px] mx-auto">

                <div className="flex flex-col lg:flex-row items-center gap-14 lg:gap-20 xl:gap-28">

                    {/* LEFT BOOK IMAGE */}
                    <div className="w-full lg:w-1/2 flex justify-center lg:justify-start">
                        <img
                            src="book2.png"
                            alt="Book Cover"
                            className="
                w-[320px]
                sm:w-[320px]
                md:w-[360px]
                lg:w-[420px]
                xl:w-[650px]
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
                            That distinction matters. Paralysis is not a personal flaw. The more accurate interpretation is: Multiple constraints are active at once, and the cost of leaving currently outweighs the benefit. That is not a weakness. That is decision-making under pressure."

                        </p>

                        <p className={`${cormorant.className} text-base`}>
                            <strong>Formats:</strong> Available in Print and eBook.
                        </p>

                        {/* PURCHASE BUTTONS */}

                        <div className="flex flex-wrap gap-4 pt-4 justify-center lg:justify-start">

                            <a
                                href="https://amzn.in/d/00RSj7Rp"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group hover:tracking-widest flex items-center gap-2 px-5 py-2   text-sm tracking-wide transition"
                            >
                                {/* <FaAmazon /> */}
                                <img src='amazonekindle.png'
                                    alt="amazon icon"
                                    width={100}
                                    height={10}
                                />
                                {/* Amazon KDP (International) */}
                            </a>

                            <a
                                href="https://books2read.com/b/b5ykLl"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group hover:tracking-widest flex items-center gap-2 px-5 py-2   text-sm tracking-wide transition"
                            >
                                {/* <SiFlipkart /> */}
                                <img src="book2read.webp" alt="Book2read icon"
                                    width={100}
                                    height={10} />
                                {/* Notion Press / Flipkart (India) */}
                            </a>

                            <a
                                href="https://www.smashwords.com/books/view/1961153"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group hover:tracking-widest flex items-center gap-2 px-5 py-2  text-sm tracking-wide  transition"
                            >
                                {/* <MdMenuBook /> */}
                                <img src="smashwordslogo.png" alt="smashwordslogo icon"
                                    width={100}
                                    height={10} />
                                {/* Draft2Digital */}
                            </a>

                            <a
                                href="https://amzn.in/d/0aNeCkzb"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group hover:tracking-widest flex items-center gap-2 px-5 py-2 text-sm tracking-wide  transition"
                            >
                                {/* <FaAmazon /> */}
                                <img src="amazon.png" alt="amazon icon"
                                    width={100}
                                    height={10} />

                            </a>

                        </div>



                    </div>

                </div>
            </div>
        </section>
    );
};

export default Buybook;
