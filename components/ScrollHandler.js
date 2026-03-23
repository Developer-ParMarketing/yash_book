"use client";

import { useEffect } from "react";

const ScrollHandler = () => {
    useEffect(() => {
        const hash = window.location.hash;

        if (hash) {
            const scrollToElement = () => {
                const el = document.querySelector(hash);
                if (el) {
                    el.scrollIntoView({ behavior: "smooth" });
                }
            };

            // Delay to ensure components are rendered
            setTimeout(scrollToElement, 200);
        }
    }, []);

    return null;
};

export default ScrollHandler;