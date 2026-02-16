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

const Bookreview = () => {
    return (
        <section id="Key_Ideas" className="w-full bg-[#f7f5ef] py-16 px-6 md:px-14 lg:px-20">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-14 md:gap-80 xl:gap-80 lg:gap-80  items-start">

                {/* LEFT IMAGE */}

                <div className="space-y-8 order-2 md:order-1">

                    {/* TITLE */}
                    <div>
                        <h2
                            className={`
                ${cinzel.className}
                text-3xl md:text-4xl lg:text-5xl
                tracking-wide
                mb-4 relative
              `}
                        >
                            The Book

                        </h2>

                        <p
                            className={`${cormorant.className} text-base md:text-lg leading-relaxed text-gray-800`}
                        >
                            <strong>Core Premise:</strong><br />
                            You already know something isn’t working. The harder question is why you’re still there.
                            Quitting is not an emotional reaction—it is a rational response to changing conditions.
                            This book provides the language, structure, and clarity to decide without guilt or
                            self-betrayal.
                        </p>
                    </div>

                    {/* WHAT IT EXPLORES */}
                    <div>
                        <h3 className={`${cinzel.className} text-xl md:text-2xl mb-2`}>
                            What it Explores
                        </h3>

                        <p className={`${cormorant.className} text-base leading-relaxed text-gray-700`}>
                            The Deep Psychology: Why capable, conscientious people remain stuck long after something
                            has stopped working.
                        </p>

                        <p className={`${cormorant.className} text-base leading-relaxed text-gray-700 mt-2`}>
                            The Science of Timing: Distinguishing between patience and inertia, resilience and
                            self-betrayal.
                        </p>

                        <p className={`${cormorant.className} text-base leading-relaxed text-gray-700 mt-2`}>
                            Practical Frameworks: Tools to evaluate staying versus leaving with clarity and restraint.
                        </p>
                    </div>

                    {/* KEY IDEAS */}
                    <div>
                        <h3 className={`${cinzel.className} text-xl md:text-2xl mb-2`}>
                            Key Ideas
                        </h3>

                        <ul className={`${cormorant.className} space-y-3 text-gray-700`}>
                            <li>
                                <strong>The Constraint Stack:</strong> Paralysis is rarely caused by a single fear. It emerges when financial pressure, identity, social expectations, and cognitive bias quietly stack together, making even obvious decisions feel impossible.
                            </li>

                            <li>
                                <strong>The "No More Data" Rule:</strong> When continued staying no longer produces added information, staying stops being thoughtful. It becomes a delay in acting on what you already know.
                            </li>

                            <li>
                                <strong>The Declining Returns Curve:</strong> Most pursuits follow a curve where effort eventually stops compounding. Elite performers exit at the plateau to preserve the energy and optionality required for what comes next.
                            </li>

                            <li>
                                <strong>The QUIT Matrix™:</strong> Most pursuits follow a curve where effort eventually stops compounding. Elite performers exit at the plateau to preserve the energy and optionality required for what comes next.
                            </li>
                        </ul>
                    </div>

                </div>


                {/* RIGHT CONTENT */}
                <div className="flex justify-center md:justify-start order-1 md:order-2">
                    <img
                        src="https://img.freepik.com/premium-vector/creative-vector-modern-book-cover-design-company-brochure-annual-report-design-template_812472-1874.jpg?semt=ais_wordcount_boost&w=740&q=80"
                        alt="Book Cover"
                        className="w-[280px] sm:w-[320px] md:w-[360px] lg:w-[420px] object-cover"
                    />
                </div>
            </div>

            {/*Dummy Section  */}
            <div className="max-w-7xl mx-auto py-10">
                <div className="w-full  text-center ">
                    <div className="py-10">
                        <h2
                            className={`
                ${cinzel.className}
                text-3xl md:text-4xl lg:text-5xl
                tracking-wide
                mb-4 relative
              `}
                        >
                            The Book

                        </h2>
                        <p
                            className={`${cormorant.className} text-base md:text-lg leading-relaxed text-gray-800`}
                        >
                            <strong>Core Premise:</strong><br />
                            You already know something isn’t working. The harder question is why you’re still there.
                            Quitting is not an emotional reaction—it is a rational response to changing conditions.
                            This book provides the language, structure, and clarity to decide without guilt or
                            self-betrayal.
                        </p>
                    </div>
                    {/* <div className="flex w-full justify-between "> */}
                    <div className="flex flex-col md:flex-row w-full md:justify-between gap-10">


                        <div className="">
                            <h3 className={`${cinzel.className} text-xl md:text-2xl py-5 text-center`}>
                                What it Explores
                            </h3>

                            <p className={`${cormorant.className} text-base leading-relaxed text-gray-700 text-left`}>
                                The Deep Psychology: Why capable, conscientious people remain stuck long after something
                                has stopped working.
                            </p>

                            <p className={`${cormorant.className} text-base leading-relaxed text-gray-700 mt-2 text-left`}>
                                The Science of Timing: Distinguishing between patience and inertia, resilience and
                                self-betrayal.
                            </p>

                            <p className={`${cormorant.className} text-base leading-relaxed text-gray-700 mt-2 text-left`}>
                                Practical Frameworks: Tools to evaluate staying versus leaving with clarity and restraint.
                            </p>
                        </div>
                        <div>
                            <h3 className={`${cinzel.className} text-xl md:text-2xl py-5 text-center`}>
                                Key Ideas
                            </h3>

                            <ul className={`${cormorant.className} space-y-3 text-gray-700 text-left`}>
                                <li>
                                    <strong>The Constraint Stack:</strong> Paralysis is rarely caused by a single fear. It emerges when financial pressure, identity, social expectations, and cognitive bias quietly stack together, making even obvious decisions feel impossible.
                                </li>

                                <li>
                                    <strong>The "No More Data" Rule:</strong> When continued staying no longer produces added information, staying stops being thoughtful. It becomes a delay in acting on what you already know.
                                </li>

                                <li>
                                    <strong>The Declining Returns Curve:</strong> Most pursuits follow a curve where effort eventually stops compounding. Elite performers exit at the plateau to preserve the energy and optionality required for what comes next.
                                </li>

                                <li>
                                    <strong>The QUIT Matrix™:</strong> Most pursuits follow a curve where effort eventually stops compounding. Elite performers exit at the plateau to preserve the energy and optionality required for what comes next.
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

            </div>


        </section>
    );
};

export default Bookreview;
