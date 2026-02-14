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

const Subscribe = () => {
    return (
        <section className="w-full bg-[#eceae0] py-20 px-6 md:px-14 lg:px-20">

            <div className="max-w-7xl xl:max-w-[1400px] mx-auto">

                <div className="flex flex-col lg:flex-row gap-12 lg:gap-24 items-start">

                    {/* LEFT TITLE */}
                    <div className="w-full lg:w-1/2">
                        <h2
                            className={`
                ${cinzel.className}
                text-4xl md:text-5xl lg:text-6xl
                leading-tight
                tracking-wide
              `}
                        >
                            Subscribe to <br />
                            Our Newsletter
                        </h2>
                    </div>

                    {/* RIGHT CONTENT */}
                    <div className="w-full lg:w-1/2 space-y-6">

                        <p
                            className={`
                ${cormorant.className}
                text-base md:text-lg
                text-gray-700
                leading-relaxed
              `}
                        >
                            Sed ut perspiciatis unde omnis iste natus error sit voluptatem
                            accusantium doloremque laudantium, ut perspiciatis utota.
                        </p>

                        {/* EMAIL INPUT */}
                        <div className="relative w-full max-w-md">

                            <input
                                type="email"
                                placeholder="Add your e-mail"
                                className={`
                  ${cormorant.className}
                  w-full
                  bg-transparent
                  border-b border-black
                  outline-none
                  pb-2
                  pr-10
                  text-base
                `}
                            />

                            {/* SEND ICON */}
                            <button className="absolute right-0 bottom-2 text-lg">
                                ➤
                            </button>

                        </div>

                    </div>

                </div>

            </div>

        </section>
    );
};

export default Subscribe;
