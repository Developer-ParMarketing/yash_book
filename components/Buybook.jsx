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
        <section id="Buy_the_Book" className="w-full bg-[#f3f1ea] py-20 px-6 md:px-14 lg:px-20">

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

                            <a
                                href="https://kdp.amazon.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group hover:tracking-widest flex items-center gap-2 px-5 py-2 border border-black text-sm tracking-wide hover:bg-black hover:text-white transition"
                            >
                                {/* <FaAmazon /> */}
                                <Image src={'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAACAUlEQVRYhe3XvWsUURQF8N/4QVCMoKIQ/MZOQSzThAQLFVtFBREFkSES7SIW+g8IKcRqQLARUUuLxaRTjFpKFLEICKuQiEIEQRQlY7ETWCZvNy/rBAtz4BV37r3nnH28eXOXZfzvSDroWY9BDGAn1uATXuI23lRlLoRbyBdYY0slXosQn1uPqxY/EhCZxk08aGFia5UGnpXIx0v5owEDZ2OIV0QaeIVJ/CjiwVK+FujZEkO8KtLAUGRdM1ZWaaCMfvRhL/ZgR6BmdikM3MDwInsqM1DH9sDzcXzAqUoctcB980/5+VJNOX+lKvHVAfKRQF1HBmJew4OBZ49K8cZATdRbEGMgRN5dii8GavpiDMRgwPztfd2U7w/k59a+qky0Ephpk8vxvioD1xYQytFbin9iW1UG4HoL4SdYV9TMmaiL/M7Mm4jyTA92J6nnLXoGsAlf8QLfS/keTBVcB3BZ47qewlCS+tLWQNE4inqSuhDzK1ohz5zA20JnAv1J6mlzTXCbktRhrM0zeZ791Y32EaMauzRbFmeBoTTPnMOdIqzhHmpJaqZNTy+O4RK6cBLvMJykzizKQEHYjYcaY1kzJvEZvzQupl3Y0JQfw/Ek9S3PHErS8LAaPZYXh/MqTmscwhCmcRcjSWo6hreT/wXyTBf2Y3PBMYWJJPW7E75l/FP8AVT1u05R7Q4xAAAAAElFTkSuQmCC'}
                                    alt="amazon icon"
                                    width={40}
                                    height={40}
                                />
                                Amazon KDP (International)
                            </a>

                            <a
                                href="https://www.flipkart.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group hover:tracking-widest flex items-center gap-2 px-5 py-2 border border-black text-sm tracking-wide hover:bg-black hover:text-white transition"
                            >
                                <SiFlipkart />
                                Notion Press / Flipkart (India)
                            </a>

                            <a
                                href="https://draft2digital.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group hover:tracking-widest flex items-center gap-2 px-5 py-2 border border-black text-sm tracking-wide hover:bg-black hover:text-white transition"
                            >
                                <MdMenuBook />
                                Draft2Digital
                            </a>

                            <a
                                href="https://www.amazon.in"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group hover:tracking-widest flex items-center gap-2 px-5 py-2 border border-black text-sm tracking-wide hover:bg-black hover:text-white transition"
                            >
                                <FaAmazon />
                                Amazon India
                            </a>

                        </div>



                    </div>

                </div>
            </div>
        </section>
    );
};

export default Buybook;
