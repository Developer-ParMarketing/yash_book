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
            <div className="max-w-7xl mx-auto  ">
                {/* TITLE & CORE PREMISE */}
                <div className="pb-12 text-center">
                    <h2
                        className={`
            ${cinzel.className}
            text-3xl sm:text-4xl lg:text-5xl
            tracking-wide
            mb-6 
          `}
                    >
                        The Book
                    </h2>

                    <p
                        className={`${cormorant.className} text-base sm:text-lg leading-relaxed text-gray-800`}
                    >
                        <strong>Core Premise:</strong><br />
                        You already know something isn't working. The harder question is why you're still there.
                        Quitting is not an emotional reaction—it is a rational response to changing conditions.
                        This book provides the language, structure, and clarity to decide without guilt or
                        self-betrayal.
                    </p>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-30 items-start">

                    {/* LEFT CONTENT */}
                    <div className="space-y-8 order-2 lg:order-1">



                        {/* WHAT IT EXPLORES */}
                        <div>
                            <h3 className={`${cinzel.className} text-xl sm:text-2xl mb-4`}>
                                What it Explores
                            </h3>

                            <div className="space-y-3">
                                <p className={`${cormorant.className} text-base sm:text-lg leading-relaxed text-gray-800`}>
                                    <strong>The Deep Psychology:</strong> Why capable, conscientious people remain stuck long after something
                                    has stopped working.
                                </p>

                                <p className={`${cormorant.className} text-base sm:text-lg leading-relaxed text-gray-800`}>
                                    <strong>The Science of Timing:</strong> Distinguishing between patience and inertia, resilience and
                                    self-betrayal.
                                </p>

                                <p className={`${cormorant.className} text-base sm:text-lg leading-relaxed text-gray-800`}>
                                    <strong>Practical Frameworks:</strong> Tools to evaluate staying versus leaving with clarity and restraint.
                                </p>
                            </div>
                        </div>

                        {/* KEY IDEAS */}
                        <div>
                            <h3 className={`${cinzel.className} text-xl sm:text-2xl mb-4`}>
                                Key Ideas
                            </h3>

                            <ul className={`${cormorant.className} space-y-4 text-base sm:text-lg leading-relaxed text-gray-700`}>
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

                    {/* RIGHT IMAGE */}
                    <div className="flex justify-center lg:justify-start order-1 lg:order-2">
                        <div className="w-full max-w-md lg:max-w-none">
                            <img
                                src="cover.jpg"
                                alt="Book Cover"
                                className="w-[450] h-auto object-cover shadow-2xl rounded-sm"
                            />
                        </div>
                    </div>

                </div>
            </div>


            {/*Dummy Section  */}
            {/* <div className="max-w-7xl mx-auto py-10">
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
                            className={`${cormorant.className} text-base md:text-lg leading-relaxed text-gray-800 text-left md:text-center lg:text-center xl:text-center`}
                        >
                            <strong>Core Premise:</strong><br />
                            You already know something isn’t working. The harder question is why you’re still there.
                            Quitting is not an emotional reaction—it is a rational response to changing conditions.
                            This book provides the language, structure, and clarity to decide without guilt or
                            self-betrayal.
                        </p>
                    </div>

                    <div className="flex flex-col md:flex-row w-full md:justify-between gap-10 md:gap-50 lg:gap-50 xl:gap-50">


                        <div className="">
                            <h3 className={`${cinzel.className} text-xl md:text-2xl py-5 text-center`}>
                                What it Explores
                            </h3>

                            <p className={`${cormorant.className} text-base md:text-lg leading-relaxed text-gray-800 text-left`}>
                                The Deep Psychology: Why capable, conscientious people remain stuck long after something
                                has stopped working.
                            </p>

                            <p className={`${cormorant.className} text-base md:text-lg leading-relaxed text-gray-800 mt-2 text-left`}>
                                The Science of Timing: Distinguishing between patience and inertia, resilience and
                                self-betrayal.
                            </p>

                            <p className={`${cormorant.className} text-base md:text-lg leading-relaxed text-gray-800 mt-2 text-left`}>
                                Practical Frameworks: Tools to evaluate staying versus leaving with clarity and restraint.
                            </p>
                        </div>
                        <div>
                            <h3 className={`${cinzel.className} text-xl md:text-2xl py-5 text-center`}>
                                Key Ideas
                            </h3>

                            <ul className={`${cormorant.className} space-y-3 text-base md:text-lg leading-relaxed text-gray-800 text-left`}>
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

            </div> */}
        </section>
    );
};

export default Bookreview;
