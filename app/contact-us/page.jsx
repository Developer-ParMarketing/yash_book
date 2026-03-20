"use client";

import Image from "next/image";
import { useState } from "react";
import { api } from "../variables";

import { Cinzel, Cormorant_Garamond, Playfair_Display } from "next/font/google";

const cinzel = Cinzel({
    subsets: ["latin"],
    weight: ["400", "500"],
});

export default function ContactSection() {

    const [form, setForm] = useState({
        name: "",
        email: "",
        message: ""
    });


    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        await fetch(`${api}/contact`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(form)
        });

        alert("Message sent!");
        setForm({ name: "", email: "", message: "" });
    };

    return (
        <section className="w-full bg-[#efede7] py-20">
            <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 px-6 items-center">

                {/* LEFT SIDE FORM */}
                <div className="md:order-1 order-2">



                    <h2 className={`${cinzel.className} text-4xl md:text-5xl font-serif mb-8 text-center md:text-left`}>
                        SEND ME A MESSAGE
                    </h2>

                    <form onSubmit={handleSubmit} className="space-y-8">

                        {/* MESSAGE */}
                        <textarea
                            name="message"
                            value={form.message}
                            onChange={handleChange}
                            placeholder="Write your message..."
                            className="w-full h-40 border border-gray-400 bg-transparent p-4 outline-none resize-none"
                            required
                        />

                        {/* INPUTS */}
                        <div className="grid md:grid-cols-2 gap-8">

                            <input
                                type="email"
                                name="email"
                                value={form.email}
                                onChange={handleChange}
                                placeholder="Your Email"
                                className="border-b border-gray-400 bg-transparent outline-none py-2"
                                required
                            />

                            <input
                                type="text"
                                name="name"
                                value={form.name}
                                onChange={handleChange}
                                placeholder="Your Name"
                                className="border-b border-gray-400 bg-transparent outline-none py-2"
                                required
                            />

                        </div>

                        <button
                            type="submit"
                            className="border border-black px-8 py-3 tracking-[4px] text-sm hover:bg-black hover:text-white transition"
                        >
                            SUBMIT
                        </button>

                    </form>

                </div>

                {/* RIGHT SIDE IMAGE */}
                <div className="relative flex justify-center md:order-2 order-1">

                    <video
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="object-contain"
                        width={500}
                        height={500}
                    >
                        <source src="/contactvideo.mp4" type="video/mp4" />
                    </video>

                </div>

            </div>
        </section>
    );
}