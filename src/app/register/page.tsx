"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";

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
    const [currentRuleIndex, setCurrentRuleIndex] = useState(0);
    const [showRule, setShowRule] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    // ---- Password rules ----
    const rules = [
        { key: "length", text: "At least 6 characters", valid: form.password.length >= 6 },
        { key: "upper", text: "One uppercase letter", valid: /[A-Z]/.test(form.password) },
        { key: "lower", text: "One lowercase letter", valid: /[a-z]/.test(form.password) },
        { key: "number", text: "One number", valid: /[0-9]/.test(form.password) },
        { key: "special", text: "One special character", valid: /[^A-Za-z0-9]/.test(form.password) },
        {
            key: "match",
            text: "Passwords match",
            valid: form.password.length > 0 && form.password === form.confirmPassword,
        },
    ];

    const isPasswordValid = rules.every((r) => r.valid);

    // ---- Progressive rule engine ----
    useEffect(() => {
        if (!form.password && !form.confirmPassword) {
            setShowRule(false);
            setCurrentRuleIndex(0);
            return;
        }

        const currentRule = rules[currentRuleIndex];
        setShowRule(true);

        if (currentRule?.valid) {
            const timer = setTimeout(() => {
                setCurrentRuleIndex((i) => Math.min(i + 1, rules.length - 1));
            }, 700);
            return () => clearTimeout(timer);
        }
    }, [form.password, form.confirmPassword, currentRuleIndex]);

    const register = async () => {
        setError("");

        if (!isPasswordValid) {
            setError("Please complete all password requirements.");
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

    const rule = rules[currentRuleIndex];

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

                    {/* Password */}
                    <div className="flex gap-4">
                        <div className="relative w-full">
                            <input
                                name="password"
                                type={showPassword ? "text" : "password"}
                                placeholder="Password"
                                onChange={handleChange}
                                className="w-full border text-gray-900 rounded-md px-3 py-3 pr-12 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-gray-900"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword((p) => !p)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600 hover:text-gray-900"
                            >
                                {showPassword ? (
                                    <EyeSlashIcon className="w-5 h-5" />
                                ) : (
                                    <EyeIcon className="w-5 h-5" />
                                )}
                            </button>
                        </div>

                        {/* Confirm Password */}
                        <div className="relative w-full">
                            <input
                                name="confirmPassword"
                                type={showConfirmPassword ? "text" : "password"}
                                placeholder="Confirm password"
                                onChange={handleChange}
                                className="w-full border text-gray-900 rounded-md px-3 py-3 pr-12 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-gray-900"
                            />
                            <button
                                type="button"
                                onClick={() => setShowConfirmPassword((p) => !p)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600 hover:text-gray-900"
                            >
                                {showConfirmPassword ? (
                                    <EyeSlashIcon className="w-5 h-5" />
                                ) : (
                                    <EyeIcon className="w-5 h-5" />
                                )}
                            </button>
                        </div>
                    </div>

                    {/* Progressive password rule */}
                    {showRule && rule && !isPasswordValid && (
                        <div
                            className={`rounded-md border px-4 py-3 text-sm transition-all ${rule.valid
                                ? "bg-green-50 border-green-200 text-green-700"
                                : "bg-red-50 border-red-200 text-red-600"
                                }`}
                        >
                            {rule.text}
                        </div>
                    )}

                    <button
                        onClick={register}
                        disabled={loading || !isPasswordValid}
                        className="w-full bg-gray-900 hover:bg-black text-white rounded-md py-3 text-sm font-semibold transition disabled:opacity-50 disabled:cursor-not-allowed"
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
