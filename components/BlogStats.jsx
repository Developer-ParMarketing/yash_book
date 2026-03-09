"use client";

import { useState } from "react";
import { FaEye } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { FaComment } from "react-icons/fa";

export default function BlogStats({ views, initialLikes, initialComments }) {

    const [likes, setLikes] = useState(initialLikes || 0);
    const [comments, setComments] = useState(initialComments || 0);

    return (
        <div className="flex items-center gap-4 text-sm text-gray-500 mb-6">
            <span className="flex items-center gap-1">
                <FaEye className="text-gray-400" />
                {views}
            </span>

            <span className="flex items-center gap-1">
                <FaHeart className="text-red-500" />
                {likes}
            </span>

            <span className="flex items-center gap-1">
                <FaComment className="text-blue-500" />
                {comments}
            </span>
        </div>
    );
}