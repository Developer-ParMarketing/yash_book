"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { api } from "../variables";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();

    const handleLogin = async (e) => {
        e.preventDefault();

        const res = await fetch(`${api}/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify({ email, password }),
        });

        const data = await res.json();

        if (res.ok) {

            router.push("/admin");
        } else {
            alert(data.message);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center">
            <form onSubmit={handleLogin} className="space-y-4 w-80">
                <h2 className="text-2xl font-bold">Admin Login</h2>

                <input
                    type="email"
                    placeholder="Email"
                    className="border p-2 w-full"
                    onChange={(e) => setEmail(e.target.value)}
                />

                <input
                    type="password"
                    placeholder="Password"
                    className="border p-2 w-full"
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button className="bg-black text-white p-2 w-full">
                    Login
                </button>
            </form>
        </div>
    );
}