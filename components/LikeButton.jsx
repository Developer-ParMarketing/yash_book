"use client";

import { useState, useEffect } from "react";
import { api } from "@/app/variables";

export default function LikeButton({ slug, initialLikes, onLike }) {

    const [likes, setLikes] = useState(initialLikes || 0);
    const [liked, setLiked] = useState(false);
    const [loading, setLoading] = useState(false);

    const [userId, setUserId] = useState(null);

    useEffect(() => {
        let id = localStorage.getItem("blogUser");

        if (!id) {
            id = crypto.randomUUID();
            localStorage.setItem("blogUser", id);
        }

        setUserId(id);
    }, []);

    const handleLike = async () => {

        if (loading || !userId) return;

        setLoading(true);

        try {
            const res = await fetch(`${api}/blogs/post/${slug}/like`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ userId }),
            });

            const data = await res.json();

            setLikes(data.likes);

            if (onLike) {
                onLike(data.likes);
            }
            setLiked(data.liked);

        } catch (err) {
            console.error(err);
        }

        setLoading(false);
    };

    return (
        <button
            onClick={handleLike}
            className={`flex items-center gap-2 px-4 py-2 border rounded-lg transition 
            ${liked ? "bg-blue-500 text-white" : "hover:bg-gray-100"}`}
        >
            👍 {liked ? "Liked" : "Like"} {likes}
        </button>
    );
}