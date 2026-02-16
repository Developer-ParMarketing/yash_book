"use client";

import React from "react";
import { Playfair_Display, Cinzel, Cormorant_Garamond } from "next/font/google";
import { FaLinkedin } from "react-icons/fa";


const playfair = Playfair_Display({
    subsets: ["latin"],
    weight: ["400", "500", "600", "700"],
});

const cinzel = Cinzel({
    subsets: ["latin"],
    weight: ["400", "500"],
});

const cormorant = Cormorant_Garamond({
    subsets: ["latin"],
    weight: ["400", "500", "600"],
});

const Post = () => {
    return (
        <div id="Philosophy" className="min-h-screen bg-[#f9f8f4] py-16 sm:py-20 md:py-24 lg:py-28 px-5 sm:px-8 md:px-12 lg:px-16">
            <div className="max-w-7xl   mx-auto space-y-20 sm:space-y-28 md:space-y-36">

                {/* Philosophy Section */}
                <section className=" text-center  md:text-left lg:text-left xl:text-left ">
                    <h1
                        className={`
              ${playfair.className}
              text-4xl sm:text-5xl md:text-5xl lg:text-6xl
              font-normal tracking-wide text-gray-900
              relative inline-block pb-4 sm:pb-5 text-center
            `}
                    >
                        Philosophy

                    </h1>

                    <p
                        className={`
              ${cormorant.className}
            
              text-base sm:text-lg md:text-xl
              leading-relaxed sm:leading-loose
              text-gray-700 font-light tracking-wide mt-6
             
            `}
                    >
                        His work explores the tension between who we are and who we are expected
                        to be, focusing on the subtle ways judgment, identity, and emotion shape
                        the paths we stay on or leave behind. Rather than offering prescriptions,
                        he focuses on structure, pattern, and the hidden logic behind human
                        behavior. The aim is to help readers recognize what they already sense
                        and navigate their choices without guilt, fear, or self-betrayal.
                    </p>
                </section>

                {/* Background Section */}
                <section className=" text-center  md:text-left lg:text-left xl:text-left ">
                    <h1
                        className={`
              ${playfair.className}
              text-4xl sm:text-5xl md:text-5xl lg:text-6xl
              font-normal tracking-wide text-gray-900
              relative inline-block pb-4 sm:pb-5
            `}
                    >
                        Background

                    </h1>

                    <h2
                        className={`
              ${cinzel.className}
              mt-6 sm:mt-8 md:mt-10
              text-xl sm:text-2xl md:text-2.5xl
              font-normal italic text-gray-700
              tracking-wide relative
            `}
                    >
                        From Business Systems to Human Decisions

                    </h2>

                    <p
                        className={`
              ${cormorant.className}
              mt-3 sm:mt-5 md:mt-7
              text-base sm:text-lg md:text-xl
              leading-relaxed sm:leading-loose
              text-gray-700 font-light tracking-wide
           
            `}
                    >
                        His professional work centers on optimizing systems—whether for regulatory
                        compliance, operational resilience, or agile delivery. Over the past 15+ years,
                        Yashasvi has observed a parallel pattern in how individuals and teams approach
                        personal and professional commitments: we often optimize for persistence
                        by default, without evaluating the long-term returns. His writing grows
                        out of close observation of the small frictions and quiet hesitations
                        that define everyday life. Drawing on personal experiences as lenses
                        rather than lessons, his work spans decision-making, the psychology of
                        endurance, and the search for coherence in modern life.
                    </p>
                    <div className="pt-10 flex justify-center md:justify-start">
                        <a
                            href="https://www.linkedin.com/in/YOUR-PROFILE"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-700 hover:text-blue-600 transition duration-300"
                        >
                            <FaLinkedin className="text-3xl sm:text-4xl cursor-pointer" />
                        </a>
                    </div>
                </section>


            </div>
        </div>
    );
};

export default Post;