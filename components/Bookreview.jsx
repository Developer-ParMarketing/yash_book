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
        <section className="w-full bg-[#f7f5ef] py-16 px-6 md:px-14 lg:px-20">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-14 items-start">

                {/* LEFT IMAGE */}

                <div className="space-y-8">

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
                                <strong>The Constraint Stack:</strong> Paralysis is rarely caused by a single fear.
                                Financial pressure, identity, expectations, and cognitive bias quietly stack together.
                            </li>

                            <li>
                                <strong>The "No More Data" Rule:</strong> When staying stops producing new information,
                                it becomes delay rather than thoughtful patience.
                            </li>

                            <li>
                                <strong>The Declining Returns Curve:</strong> Elite performers exit at the plateau to
                                preserve energy and future optionality.
                            </li>

                            <li>
                                <strong>The QUIT Matrix™:</strong> A strategic quitting framework organizing Energy,
                                Trajectory, Identity, and Opportunity Cost.
                            </li>
                        </ul>
                    </div>

                </div>


                {/* RIGHT CONTENT */}
                <div className="flex justify-center md:justify-start">
                    <img
                        src="https://img.freepik.com/premium-vector/creative-vector-modern-book-cover-design-company-brochure-annual-report-design-template_812472-1874.jpg?semt=ais_wordcount_boost&w=740&q=80"
                        alt="Book Cover"
                        className="w-[280px] sm:w-[320px] md:w-[360px] lg:w-[420px] object-cover"
                    />
                </div>
            </div>
        </section>
    );
};

export default Bookreview;
