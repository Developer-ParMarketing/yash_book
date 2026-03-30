"use client";

import Image from "next/image";
import { useState } from "react";
import { api } from "../variables";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { Cinzel, Cormorant_Garamond, Playfair_Display } from "next/font/google";

const cinzel = Cinzel({
    subsets: ["latin"],
    weight: ["400", "500"],
});

export default function ContactSection() {

    const [form, setForm] = useState({
        name: "",
        email: "",
        phone: "",
        message: ""
    });
    const [success, setSuccess] = useState(false);


    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };



    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await fetch(`${api}/contact`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(form)
            });

            setSuccess(true);

            setTimeout(() => {
                setSuccess(false);
            }, 3000);
            setForm({ name: "", email: "", message: "" });

        } catch (error) {
            console.error(error);
        }
    };
    return (
        <section className="w-full bg-[#f9f8f4] py-20">
            <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 px-6 items-center">

                {/* LEFT SIDE FORM */}
                <div className="md:order-1 order-2">



                    <h1 className={`${cinzel.className} text-4xl md:text-5xl font-serif mb-8 text-center md:text-left`}>
                        SEND ME A MESSAGE
                    </h1>

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

                            <PhoneInput
                                country={"in"}
                                value={form.phone}
                                onChange={(phone) => setForm({ ...form, phone })}

                                containerClass="w-full"

                                inputClass="!w-full !bg-transparent !border-0 !border-b !border-gray-400 !rounded-none !py-2 !pl-12 !text-black focus:!outline-none focus:!shadow-none"

                                buttonClass="!bg-transparent !border-0"

                                dropdownClass="!text-black"
                            />


                        </div>

                        <button
                            type="submit"
                            className="border border-black px-8 py-3 tracking-[4px] text-sm hover:bg-black hover:text-white transition"
                        >
                            SUBMIT
                        </button>


                        {success && (
                            <p className="text-green-600 mt-4 text-sm tracking-wide">
                                Thanks for your message!
                            </p>
                        )}

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