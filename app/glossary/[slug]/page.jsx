"use client";

import { api } from "@/app/variables";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function GlossaryDetail() {
    const { slug } = useParams();
    const [data, setData] = useState(null);

    // 🔥 FAQ open state
    const [openIndex, setOpenIndex] = useState(null);

    const toggleFAQ = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    const fetchData = async () => {
        const res = await fetch(`${api}/glossary/${slug}`);
        const result = await res.json();
        setData(result.data);
    };

    useEffect(() => {
        if (slug) fetchData();
    }, [slug]);

    if (!data) return <p className="p-10">Loading...</p>;

    return (
        <div className="max-w-7xl mx-auto px-4 py-10">

            {/* TITLE */}
            <h1 className="text-4xl font-bold mb-4">
                {data.title}
            </h1>

            {/* SHORT DESC */}
            <div className="border-l-4 border-black bg-gray-50 p-4 mb-6">
                <p className="text-lg">{data.shortDesc}</p>
            </div>

            {/* 🔥 SECTIONS */}
            <div className="space-y-8">
                {data.sections?.map((section, index) => (
                    <div key={index}>
                        <h2 className="text-2xl font-semibold mb-3">
                            {section.heading}
                        </h2>

                        <div
                            className="prose max-w-none"
                            dangerouslySetInnerHTML={{
                                __html: section.content,
                            }}
                        />
                    </div>
                ))}
            </div>

            {/* 🔥 FAQ SECTION (ACCORDION) */}
            {data.faqs?.length > 0 && (
                <div className="mt-12">
                    <h2 className="text-2xl font-bold mb-6">
                        Frequently Asked Questions
                    </h2>

                    <div className="space-y-3">
                        {data.faqs.map((faq, index) => (
                            <div
                                key={index}
                                className="border rounded-lg overflow-hidden"
                            >
                                {/* QUESTION */}
                                <button
                                    onClick={() => toggleFAQ(index)}
                                    className="w-full flex justify-between items-center p-4 text-left font-semibold bg-gray-50 hover:bg-gray-100 transition"
                                >
                                    <span>{faq.question}</span>

                                    {/* ICON */}
                                    <span
                                        className={`text-xl transform transition-transform ${openIndex === index ? "rotate-45" : ""
                                            }`}
                                    >
                                        +
                                    </span>
                                </button>

                                {/* ANSWER */}
                                <div
                                    className={`transition-all duration-300 ease-in-out ${openIndex === index
                                            ? "max-h-[500px] p-4"
                                            : "max-h-0 overflow-hidden"
                                        }`}
                                >
                                    <div
                                        className="text-gray-700"
                                        dangerouslySetInnerHTML={{
                                            __html: faq.answer,
                                        }}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}