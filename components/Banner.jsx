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

const Banner = () => {
    return (
        <section id="The_Book" className="w-full bg-[#f9e9d1] py-16  px-6 md:px-14 lg:px-20">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 items-center">

                {/* LEFT SIDE IMAGE */}
                <div className="w-full flex justify-center md:justify-start">
                    <img
                        src="book1.png"
                        alt="Writing Expo"
                        className="
             w-auto
              sm:w-70
              md:w-[320px]
              lg:w-105
              xl:w-120
              h-auto
              object-contain
            "
                    />
                </div>

                {/* MIDDLE CONTENT */}
                <div className="text-center md:text-left space-y-4">
                    <h2
                        className={`
              ${cinzel.className}
              text-2xl md:text-3xl lg:text-4xl
              leading-snug
              tracking-wide text-[#6d0101]
            `}
                    >
                        When Staying Stops Making Sense.
                    </h2>

                    <p
                        className={`
              ${cormorant.className}
              text-base md:text-lg
              text-gray-700
              leading-relaxed
              max-w-md mx-auto md:mx-0
            `}
                    >
                        A Guide to knowing when to stay, when to leave & why it matters.
                    </p>

                    {/* BUTTON + LINE ANIMATION */}
                    <div className="group flex items-center gap-4 mt-6 justify-center md:justify-start cursor-pointer w-fit mx-auto md:mx-0">
                        <div className="w-12 h-px bg-black transition-all duration-300 group-hover:w-6"></div>

                        <a
                            href="https://amzn.in/d/04U6MRNH"
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`
                            ${cinzel.className}
                            text-xs tracking-[0.35em]
                            uppercase
                        `}
                        >
                            Explore the Book
                        </a>

                    </div>
                </div>

                {/* RIGHT LOGOS */}
                <div className="grid grid-cols-2 gap-6 place-items-center">
                    {/* <img src="https://belletrist.qodeinteractive.com/wp-content/uploads/2020/08/client1.png" className="h-10 object-contain" />
                    <img src="https://belletrist.qodeinteractive.com/wp-content/uploads/2020/08/client2.png" className="h-10 object-contain" />
                    <img src="https://belletrist.qodeinteractive.com/wp-content/uploads/2020/08/client3.png" className="h-10 object-contain" />
                    <img src="https://belletrist.qodeinteractive.com/wp-content/uploads/2020/08/client4.png " className="h-10 object-contain" />
                    <img src="https://belletrist.qodeinteractive.com/wp-content/uploads/2020/08/client5.png" className="h-10 object-contain" />
                    <img src="https://belletrist.qodeinteractive.com/wp-content/uploads/2020/08/client2.png" className="h-10 object-contain" /> */}
                    <a href="https://amzn.in/d/00RSj7Rp"
                        target="_blank">
                        <img src='amazonekindle.png'
                            alt="amazon icon"
                            width={100}
                            height={10}
                        />
                    </a>

                    <a href="https://www.smashwords.com/books/view/1961153"
                        target="_blank">
                        <img src="smashwordslogo.png" alt="smashwordslogo icon"
                            width={100}
                            height={10} />
                    </a>
                    <a href="https://books2read.com/b/b5ykLl"
                        target="_blank">
                        <img src="book2read.webp" alt="Book2read icon"
                            width={100}
                            height={10} />
                    </a>
                    <a href="https://amzn.in/d/0aNeCkzb"
                        target="_blank">
                        <img src="amazon.png" alt="amazon icon"
                            width={100}
                            height={10} />
                    </a>



                </div>

            </div>
        </section>
    );
};

export default Banner;
