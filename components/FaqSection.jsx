"use client";

import { useState } from "react";

export default function FaqSection({ faqs }) {
    const [open, setOpen] = useState(null);

    return (
        <div className="mt-14 border-t pt-10">
            <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>

            <div className="space-y-3">
                {faqs.map((faq, index) => (
                    <div key={index} className="border rounded-lg overflow-hidden">

                        <button
                            onClick={() => setOpen(open === index ? null : index)}
                            className="w-full flex justify-between items-center text-left p-4 bg-gray-50 font-semibold"
                        >
                            {faq.question}
                            <span>{open === index ? "−" : "+"}</span>
                        </button>

                        {open === index && (
                            <div className="p-4 text-gray-600">
                                {faq.answer}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}