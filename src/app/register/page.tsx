"use client";

import { useState } from "react";
import api from "@/lib/api";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function RegisterPage() {
    const router = useRouter();
    const [form, setForm] = useState({
        fullName: "",
        email: "",
        phoneNumber: "",
        password: "",
        confirmPassword: "",
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const register = async () => {
        setError("");

        if (form.password !== form.confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        try {
            setLoading(true);

            const payload = {
                fullName: form.fullName,
                email: form.email,
                phoneNumber: form.phoneNumber,
                password: form.password,
            };

            await api.post("/Auth/register", payload);
            router.push("/login");
        } catch (err: any) {
            setError(err.response?.data?.message || "Registration failed");
        } finally {
            setLoading(false);
        }
    };

const loginWithGoogle = () => {
  window.location.href =
    "https://localhost:7170/api/Auth/login-google?redirectUrl=http://localhost:3000/auth/callback";
};

const loginWithFacebook = () => {
  window.location.href =
    "https://localhost:7170/api/Auth/login-facebook?redirectUrl=http://localhost:3000/auth/callback";
};

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
            <div className="w-full max-w-lg bg-white rounded-xl shadow-sm border p-8">
                <h1 className="text-2xl font-semibold text-gray-900 text-center mb-1">
                    Create your account
                </h1>
                <p className="text-gray-500 text-center mb-6 text-sm">
                    Sign up to continue to GoBet
                </p>

                {/* Error */}
                {error && (
                    <div className="mb-4 text-sm text-red-600 bg-red-50 border border-red-200 rounded-md px-3 py-2">
                        {error}
                    </div>
                )}

                {/* Form */}
                <div className="space-y-5">
                    <input
                        name="email"
                        type="email"
                        placeholder="Email address"
                        onChange={handleChange}
                        className="w-full border text-gray-900 rounded-md px-3 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-gray-900"
                    />

                    <div className="flex gap-4">
                        <input
                            name="fullName"
                            placeholder="Full name"
                            onChange={handleChange}
                            className="w-full border text-gray-900 rounded-md px-3 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-gray-900"
                        />
                        <input
                            name="phoneNumber"
                            placeholder="Phone number"
                            onChange={handleChange}
                            className="w-full border text-gray-900 rounded-md px-3 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-gray-900"
                        />
                    </div>

                    <div className="flex gap-4">
                        <input
                            name="password"
                            type="password"
                            placeholder="Password"
                            onChange={handleChange}
                            className="w-full border text-gray-900 rounded-md px-3 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-gray-900"
                        />
                        <input
                            name="confirmPassword"
                            type="password"
                            placeholder="Confirm password"
                            onChange={handleChange}
                            className="w-full border text-gray-900 rounded-md px-3 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-gray-900"
                        />
                    </div>

                    <button
                        onClick={register}
                        disabled={loading}
                        className="w-full bg-gray-900 hover:bg-black text-white rounded-md py-3 text-sm font-semibold transition disabled:opacity-60"
                    >
                        {loading ? "Creating account..." : "Create account"}
                    </button>
                </div>

                <div className="flex items-center gap-3 my-5">
                    <div className="flex-1 h-px bg-gray-200" />
                    <span className="text-gray-400 text-xs">OR</span>
                    <div className="flex-1 h-px bg-gray-200" />
                </div>

                {/* Social login */}
                <div className="flex gap-3">
                    <button
                        onClick={loginWithGoogle}
                        className="w-full flex items-center justify-center gap-3 border rounded-md py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 transition"
                    >
                        <img src="/google.svg" className="w-5 h-5" />
                        Continue with Google
                    </button>

                    <button
                        onClick={loginWithFacebook}
                        className="w-full flex items-center justify-center gap-3 border rounded-md py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 transition"
                    >
                        <img src="/facebook.svg" className="w-5 h-5" />
                        Continue with Facebook
                    </button>
                </div>

                {/* Login link */}
                <p className="text-center text-sm text-gray-500 mt-6">
                    Already have an account?{" "}
                    <Link href="/login" className="text-gray-900 font-medium hover:underline">
                        Log in
                    </Link>
                </p>
            </div>
        </div>
    );
}
