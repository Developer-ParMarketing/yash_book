"use client";

import { useState } from "react";
import { FaShareAlt } from "react-icons/fa";
import { api } from "@/app/variables";

export default function ShareButton({ slug, initialShares }) {

    const [shares, setShares] = useState(initialShares || 0);

    const handleShare = async () => {

        const url = window.location.href;

        // native share (mobile)
        if (navigator.share) {
            await navigator.share({
                title: document.title,
                url: url,
            });
        } else {
            navigator.clipboard.writeText(url);
            alert("Link copied!");
        }

        try {

            const res = await fetch(`${api}/blogs/post/${slug}/share`, {
                method: "POST",
            });

            const data = await res.json();

            setShares(data.shares);

        } catch (err) {
            console.error(err);
        }
    };

    return (
        <button
            onClick={handleShare}
            className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-100 transition"
        >
            <FaShareAlt />
            Share {shares}
        </button>
    );
}