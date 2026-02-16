"use client";

import Image from "next/image";
import Link from "next/link";
import { Cormorant_Garamond } from "next/font/google";
import { FaInstagram, FaFacebook, FaLinkedin } from "react-icons/fa";

const cormorant = Cormorant_Garamond({
    subsets: ["latin"],
    weight: ["400", "500"],
    style: ["normal", "italic"],
});

const Footer = () => {
    return (
        <footer className="w-full bg-black text-white overflow-x-hidden px-5 md:px-10 xl:px-16 2xl:px-12">

            <div className="w-full px-7.5 pt-38.75  flex flex-col items-center text-center">

                <Image
                    src="https://belletrist.qodeinteractive.com/wp-content/uploads/2020/10/logo-01-light.png"
                    alt="logo"
                    width={180}
                    height={60}
                    priority
                    className="mb-7.5"
                />

                <p
                    className={`max-w-130 text-[28px] leading-[1.6em] text-[#cfcfcf] mb-7.5 ${cormorant.className} font-medium`}
                >
                    Leaving is not giving up; it is choosing to keep going, differently. Reclaim your judgment from the moral pressure of automatic persistence.

                    all the stories that truly matter.
                </p>

                <div
                    className={`flex items-center gap-7.5 text-[18px] italic tracking-[0.08em] ${cormorant.className} font-medium pb-10`}
                >
                    <a target="_blank" href="https://www.facebook.com/profile.php?id=61587945454452" className="hover:opacity-70 transition ">
                        <FaFacebook />   Fb.
                    </a>
                    <a target="_blank" href="https://www.instagram.com/whenstayingstopsmakingsense/" className="hover:opacity-70 transition">
                        <FaInstagram />   In.
                    </a>
                    <a target="_blank" href="https://www.linkedin.com/company/when-staying-stops-making-sense/?viewAsMember=true" className="hover:opacity-70 transition">
                        <FaLinkedin />  Ld.
                    </a>
                </div>
                <div className="border-b border-2 bg-white w-60 "></div>
                <p
                    className={`max-w-130 text-[28px] leading-[1.6em] text-[#cfcfcf] pt-7.5 ${cormorant.className} font-medium`}
                >
                    Author Profile
                </p>
                <div
                    className={`flex items-center gap-7.5 text-[18px] italic tracking-[0.08em] ${cormorant.className} font-medium`}
                >

                    <a target="_blank" href="https://www.linkedin.com/in/yashasvi-prasad/" className="hover:opacity-70 transition">
                        <FaLinkedin />  Ld.
                    </a>
                </div>

            </div>

            <div
                className={` border-[#1a1a1a] flex flex-col md:flex-row justify-between items-center px-7.5 py-9.5 text-[18px] font-medium  ${cormorant.className}`}
            >
                <p>Written with heart</p>
                <p>
                    Copyright {new Date().getFullYear()} © yashasvi prasad
                </p>

            </div>

        </footer>
    );
};

export default Footer;
