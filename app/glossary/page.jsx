"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { api } from "../variables";

export default function GlossaryPage() {
    const [data, setData] = useState([]);
    const [search, setSearch] = useState("");

    const fetchData = async (query = "") => {
        const res = await fetch(
            `${api}/glossary?search=${query}`
        );
        const result = await res.json();
        setData(result.data || []);
    };

    useEffect(() => {
        fetchData();
    }, []);

    // 🔤 Group by first letter
    const grouped = data.reduce((acc, item) => {
        const letter = item.title[0].toUpperCase();
        if (!acc[letter]) acc[letter] = [];
        acc[letter].push(item);
        return acc;
    }, {});

    return (
        <div className="max-w-5xl mx-auto px-4 py-10">
            <h1 className="text-4xl font-bold mb-6">Glossary</h1>

            {/* 🔍 Search */}
            <input
                type="text"
                placeholder="Search term..."
                className="w-full border p-3 mb-6 rounded"
                value={search}
                onChange={(e) => {
                    setSearch(e.target.value);
                    fetchData(e.target.value);
                }}
            />

            {/* 🔤 A-Z List */}
            {Object.keys(grouped)
                .sort()
                .map((letter) => (
                    <div key={letter} className="mb-8">
                        <h2 className="text-2xl font-semibold mb-3">{letter}</h2>

                        <div className="grid gap-3">
                            {grouped[letter].map((item) => (
                                <Link
                                    key={item._id}
                                    href={`/glossary/${item.slug}`}
                                    className="block border p-4 rounded hover:bg-gray-50 transition"
                                >
                                    <h3 className="text-lg font-medium text-blue-600">
                                        {item.title}
                                    </h3>
                                    <p className="text-sm text-gray-600">
                                        {item.shortDesc}
                                    </p>
                                </Link>
                            ))}
                        </div>
                    </div>
                ))}
        </div>
    );
}