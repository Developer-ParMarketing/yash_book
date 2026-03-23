"use client";

import Image from "next/image";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import { Cormorant_Garamond } from "next/font/google";

const cormorant = Cormorant_Garamond({
    subsets: ["latin"],
    weight: ["400", "500"],
    style: ["normal", "italic"],
});

const Navbar = () => {
    const [mobileOpen, setMobileOpen] = useState(false);
    const [openMenu, setOpenMenu] = useState(null);

    const toggleMenu = (name) => {
        setOpenMenu(openMenu === name ? null : name);
    };

    const menuItems = [
        {
            name: "home",

            pointer: "home",
        },
        {
            name: "about me",

            pointer: "about-me",
        },
        {
            name: "blogs",

            pointer: 'blogs'
        },
        {
            name: "philosophy",

            pointer: 'philosophy'
        },
        // {
        //     name: "The Book",

        //     pointer: 'The_Book'
        // },
        {
            name: "key ideas",

            pointer: 'key-ideas'
        },
        {
            name: "buy the book",

            pointer: 'buy-the-book'
        },
        {
            name: "contact",

            pointer: 'contact-us'
        },
    ];

    return (
        <header className="w-full bg-[#f9e9d1]  border-[#d8d5c8] relative overflow-x-clip text-black">

            {/* Top Bar */}
            <div className="w-full min-w-0 flex items-center justify-between px-5 md:px-10 xl:px-16 2xl:px-12 h-20 sm:h-24 lg:h-28 xl:h-32">

                {/* Logo */}
                <Link href="/" className="flex-shrink-0">
                    <Image
                        src="/logo.png"
                        alt="logo"
                        width={260}
                        height={60}
                        priority
                        className="w-32 sm:w-40 md:w-48 lg:w-56 xl:w-64 h-auto"


                    />



                </Link>

                {/* Desktop Menu */}
                <nav
                    className="
                        hidden lg:flex items-center
                        gap-2 xl:gap-4 2xl:gap-3
                        uppercase
                        text-[10px] md:text-[11px] lg:text-[12px] xl:text-[13px] 2xl:text-[15px]
                        tracking-[1px] lg:tracking-[2px] xl:tracking-[3px]
                        min-w-0
                        ">

                    {menuItems.map((item, index) => (
                        <div key={item.name} className="relative group flex items-center">

                            {/* Vertical Divider */}
                            {index !== 0 && (
                                <span className="h-6 w-px bg-[#2c2c29] mr-6 font-light "></span>
                            )}

                            {/* Parent */}
                            <Link
                                href={
                                    item.pointer === "about-me" || item.pointer === "contact-us"
                                        ? `/${item.pointer}`
                                        : `/#${item.pointer}`
                                }
                                className="
                                py-4 xl:py-6
                                font-semibold
                                tracking-[2px] xl:tracking-[4px]
                                leading-normal
                            "
                            >
                                {item.name}
                            </Link>


                        </div>
                    ))}


                </nav>

                {/* Mobile Toggle */}
                <button
                    className="lg:hidden"
                    onClick={() => setMobileOpen(!mobileOpen)}
                >
                    {mobileOpen ? <X size={28} /> : <Menu size={28} />}
                </button>
            </div>

            {/* Mobile Menu */}
            {mobileOpen && (
                <div className="lg:hidden border-t border-[#d8d5c8] bg-white">
                    <nav className="flex flex-col p-6 uppercase text-sm">
                        {menuItems.map((item) => (
                            <Link
                                key={item.name}
                                href={
                                    item.pointer === "about-me" || item.pointer === "contact-us"
                                        ? `/${item.pointer}`
                                        : `/#${item.pointer}`
                                }
                                onClick={() => setMobileOpen(false)}
                                className="py-3 border-b font-semibold"
                            >
                                {item.name}
                            </Link>
                        ))}
                    </nav>
                </div>
            )}

        </header>
    );
};

export default Navbar;
