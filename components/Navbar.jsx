"use client";

import Image from "next/image";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import Link from "next/link";

const Navbar = () => {
    const [mobileOpen, setMobileOpen] = useState(false);
    const [openMenu, setOpenMenu] = useState(null);

    const toggleMenu = (name) => {
        setOpenMenu(openMenu === name ? null : name);
    };

    const menuItems = [
        {
            name: "home",
            // dropdown: ["Main Home", "Publisher Home", "Alternating Posts"],
            pointer: "home",
        },
        {
            name: "Philosophy",
            // dropdown: ["About", "Contact", "Pricing"],
            pointer: 'Philosophy'
        },
        {
            name: "The Book",
            // dropdown: ["Grid", "Masonry", "Sidebar"],
            pointer: 'The_Book'
        },
        {
            name: "Key Ideas",
            // dropdown: ["Products", "Cart", "Checkout"],
            pointer: 'Key_Ideas'
        },
        {
            name: "Buy the Book",
            // dropdown: ["Landing 1", "Landing 2"],
            pointer: 'Buy_the_Book'
        },
    ];

    return (
        <header className="w-full bg-[#e8e6d8]  border-[#d8d5c8] relative overflow-x-clip text-black">

            {/* Top Bar */}
            <div className="w-full min-w-0 flex items-center justify-between px-5 md:px-10 xl:px-16 2xl:px-12 h-32">

                {/* Logo */}
                <Link href="">
                    <Image
                        src="https://belletrist.qodeinteractive.com/wp-content/uploads/2020/10/logo-01-light.png"
                        alt="logo"
                        width={220}
                        height={60}
                        priority
                        className="invert"

                    />
                </Link>

                {/* Desktop Menu */}
                <nav className="hidden lg:flex items-center gap-8 uppercase text-[16px] tracking-[1.2px] font-menu min-w-0">

                    {menuItems.map((item, index) => (
                        <div key={item.name} className="relative group flex items-center">

                            {/* Vertical Divider */}
                            {index !== 0 && (
                                <span className="h-6 w-px bg-[#2c2c29] mr-6 font-light "></span>
                            )}

                            {/* Parent */}
                            <Link href={`#${item.pointer}`} className="py-6 font-semibold tracking-[5px] leading-loose">
                                {item.name}
                            </Link>


                            {/* Dropdown */}
                            {/* <div
                                className="
                absolute left-0 top-full w-60 bg-white border border-[#e5e2d8]
                shadow-[0_10px_25px_rgba(0,0,0,0.08)]
                opacity-0 invisible
                group-hover:opacity-100 group-hover:visible
                transition-all duration-300 z-50
              "
                            >
                                <ul className="py-4 normal-case text-[14px]">
                                    {item.dropdown.map((sub) => (
                                        <li key={sub}>
                                            <Link
                                                href="#"
                                                className="block px-6 py-2 hover:bg-[#f5f4ef]"
                                            >
                                                {sub}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div> */}
                        </div>
                    ))}

                    {/* Desktop Hamburger */}
                    {/* <button className="ml-4 cursor-pointer">
                      
                        <div className="group flex flex-col gap-1.5 cursor-pointer items-end w-8">

                           
                            <span className="h-0.5 w-full bg-black transition-all duration-300 group-hover:w-5"></span>

                           
                            <span className="h-0.5 w-5 bg-black transition-all duration-300 group-hover:w-full"></span>

                           
                            <span className="h-0.5 w-6 bg-black transition-all duration-300 group-hover:w-full"></span>

                            
                            <span className="h-0.5 w-full bg-black transition-all duration-300 group-hover:w-6"></span>

                        </div>


                    </button> */}
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
                            <div key={item.name} className="py-3 border-b">

                                {/* Parent */}
                                <button
                                    onClick={() => toggleMenu(item.name)}
                                    className="flex justify-between w-full font-semibold"
                                >
                                    {/* <Link href="#">{item.name}</Link> */}
                                    <Link href={`#${item.pointer}`}>
                                        {item.name}
                                        {console.log(item.name)}
                                    </Link>

                                    {/* <span>{openMenu === item.name ? "-" : "+"}</span> */}
                                </button>

                                {/* Dropdown */}
                                {/* {openMenu === item.name && (
                                    <ul className="pl-4 mt-2 space-y-2 normal-case text-gray-600">
                                        {item.dropdown.map((sub) => (
                                            <li key={sub}>
                                                <Link href="#">{sub}</Link>
                                            </li>
                                        ))}
                                    </ul>
                                )} */}
                            </div>
                        ))}

                    </nav>
                </div>
            )}
        </header>
    );
};

export default Navbar;
