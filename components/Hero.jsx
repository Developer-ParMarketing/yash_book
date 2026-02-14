"use client";

import React from "react";
import Image from "next/image";
import { Cormorant_Garamond } from "next/font/google";
import { motion } from "framer-motion";


const cormorant = Cormorant_Garamond({
    subsets: ["latin"],
    weight: ["400", "500", "600"],
});

const Hero = () => {
    return (
        <section className="relative w-full h-[80vh] md:h-h-[85vh] xl:h-h-[85vh] lg:h-[90vh] bg-[#e8e6d8] overflow-hidden flex ">
            <div className="relative w-full max-w-7xl mx-auto px-6 md:px-10 xl:px-16  mt-[150] md:mt-20 xl:mt-20 lg:mt-20">


                <div className="relative flex justify-center items-center">
                    <motion.div
                        initial={{ opacity: 0, y: 80 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1.2 }}
                    >


                        <Image
                            src="https://belletrist.qodeinteractive.com/wp-content/uploads/2020/09/main-home-rev-1.jpg"
                            alt="hero"
                            width={900}
                            height={600}
                            priority
                            className="relative z-20 w-65 sm:w-90 md:w-125 lg:w-135 xl:w-150 h-auto object-cover"
                        />
                    </motion.div>


                    <motion.div
                        initial={{ opacity: 0, y: 80, scale: 0.8 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{ duration: 1.2, ease: "easeOut", delay: 0.5 }}
                        className="absolute z-30 left-[2%] sm:left-[5%] md:left-[8%] lg:left-[8%] xl:left-[8%]
             top-[75%] sm:top-[70%] md:top-[65%] lg:top-[65%] xl:top-[65%]"
                    >
                        <Image
                            src="https://belletrist.qodeinteractive.com/wp-content/uploads/2020/09/home-1-rev-3.png"
                            alt="book"
                            width={160}
                            height={160}
                            className="w-20 sm:w-24 md:w-30 lg:w-70"
                        />
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 80, rotate: -10, scale: 0.8 }}
                        animate={{ opacity: 1, x: 0, rotate: 0, scale: 1 }}
                        transition={{ duration: 1.2, ease: "easeOut", delay: 0.7 }}
                        className="
    absolute z-30 
    -right-[10%]        /* mobile */
    sm:right-[6%] 
    md:-right-[5%] 
    lg:right-[2%]
    -bottom-[2%]
  "
                    >
                        <Image
                            src="https://belletrist.qodeinteractive.com/wp-content/uploads/2020/09/home-1-rev-2.png"
                            alt="feather"
                            width={240}
                            height={240}
                            className="w-30 md:w-60 lg:w-70"
                        />
                    </motion.div>



                    {/* BIG NAME TEXT */}
                    {/* <h1
                        className={`
    absolute top-1/2 left-0 w-full -translate-y-1/2
    uppercase text-black pointer-events-none z-30
    flex flex-col items-center gap-70
    sm:block
    ${cormorant.className}
  `}
                    >
                        <span
                            className="
      relative
      sm:absolute
      sm:left-[-3vw] md:left-[10] lg:left-[10] xl:left-[-80]
      text-[32px] sm:text-[80px] md:text-[30px] lg:text-[50px] xl:text-[80px]
      leading-none font-bold
    "
                        >
                            yashasvi
                        </span>

                        <span
                            className="
      relative
      sm:absolute
      sm:right-[-3vw] md:left-[550] lg:left-[700] xl:left-[835]
      text-[32px] sm:text-[80px] md:text-[30px] lg:text-[50px] xl:text-[80px]
      leading-none font-bold
    "
                        >
                            prasad
                        </span>
                    </h1> */}
                    <h1
                        className={`
    absolute top-1/2 left-0 w-full -translate-y-1/2
    uppercase text-black pointer-events-none z-30
    flex flex-col items-center gap-70
    sm:block
    ${cormorant.className}
  `}
                    >
                        <motion.span
                            initial={{ opacity: 0, x: -120, rotate: -5 }}
                            animate={{ opacity: 1, x: 0, rotate: 0 }}
                            transition={{ duration: 1.2, ease: "easeOut", delay: 0.3 }}
                            className="
      relative
      sm:absolute
      sm:left-[-3vw] md:left-[10] lg:left-[10] xl:left-[-80]
      text-[32px] sm:text-[80px] md:text-[30px] lg:text-[50px] xl:text-[80px]
      leading-none font-bold
    "
                        >
                            yashasvi
                        </motion.span>

                        <motion.span
                            initial={{ opacity: 0, x: 120, rotate: 5 }}
                            animate={{ opacity: 1, x: 0, rotate: 0 }}
                            transition={{ duration: 1.2, ease: "easeOut", delay: 0.6 }}
                            className="
      relative
      sm:absolute
      sm:right-[-3vw] md:left-[550] lg:left-[700] xl:left-[835]
      text-[32px] sm:text-[80px] md:text-[30px] lg:text-[50px] xl:text-[80px]
      leading-none font-bold
    "
                        >
                            prasad
                        </motion.span>
                    </h1>


                    <motion.div
                        initial={{ opacity: 0, y: 60, scale: 0.8 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{ duration: 1.2, ease: "easeOut", delay: 1 }}
                        className="absolute z-30 -bottom-[52%] md:-bottom-[22%] lg:-bottom-[22%] xl:-bottom-[22%]"
                    >
                        <Image
                            src="https://belletrist.qodeinteractive.com/wp-content/uploads/2020/09/main-home-rev-01.png"
                            alt="feather"
                            width={20}
                            height={20}
                        />
                    </motion.div>


                </div>
            </div>
        </section>
    );
};

export default Hero;
