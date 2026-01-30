"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api";
import Link from "next/link";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";

export default function RegisterPage() {
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

    const rules = [
        { text: "At least 6 characters", valid: form.password.length >= 6 },
        { text: "One uppercase letter", valid: /[A-Z]/.test(form.password) },
        { text: "One lowercase letter", valid: /[a-z]/.test(form.password) },
        { text: "One number", valid: /[0-9]/.test(form.password) },
        { text: "One special character", valid: /[^A-Za-z0-9]/.test(form.password) },
        {
            text: "Passwords match",
            valid: form.password.length > 0 && form.password === form.confirmPassword,
        },
    ];

    const isPasswordValid = rules.every((r) => r.valid);

    useEffect(() => {
        if (!form.password && !form.confirmPassword) {
            setShowRule(false);
            setCurrentRuleIndex(0);
            return;
        }

        const rule = rules[currentRuleIndex];
        setShowRule(true);

        if (rule?.valid) {
            const t = setTimeout(() => {
                setCurrentRuleIndex((i) => Math.min(i + 1, rules.length - 1));
            }, 700);
            return () => clearTimeout(t);
        }
    }, [form.password, form.confirmPassword, currentRuleIndex]);

    const submit = async () => {
        setError("");
        if (!isPasswordValid) {
            setError("Please complete all password requirements.");
            return;
        }

        try {
            setLoading(true);
            await api.post("/Auth/register", {
                fullName: form.fullName,
                email: form.email,
                phoneNumber: form.phoneNumber,
                password: form.password,
            });
            window.location.href = "/login";
        } catch (err: any) {
            setError(err.response?.data?.message || "Registration failed");
        } finally {
            setLoading(false);
        }
    };

    const loginWithGoogle = () => {
        const callback = "http://localhost:3000/auth/callback";
        window.location.href = `https://localhost:7170/api/Auth/login-google?redirectUrl=${encodeURIComponent(
            callback
        )}`;
    };

    const loginWithFacebook = () => {
        const callback = "http://localhost:3000/auth/callback";
        window.location.href = `https://localhost:7170/api/Auth/login-facebook?redirectUrl=${encodeURIComponent(
            callback
        )}`;
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

                {error && (
                    <div className="mb-4 text-sm text-red-600 bg-red-50 border border-red-200 rounded-md px-3 py-2">
                        {error}
                    </div>
                )}

                <div className="space-y-5">
                    <Input
                        name="email"
                        type="email"
                        placeholder="Email address"
                        onChange={handleChange}
                    />

                    <div className="flex gap-4">
                        <Input
                            name="fullName"
                            placeholder="Full name"
                            onChange={handleChange}
                        />
                        <Input
                            name="phoneNumber"
                            placeholder="Phone number"
                            onChange={handleChange}
                        />
                    </div>

                    <div className="flex gap-4">
                        <div className="relative w-full">
                            <Input
                                name="password"
                                type={showPassword ? "text" : "password"}
                                placeholder="Password"
                                onChange={handleChange}
                                className="pr-12"
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

                        <div className="relative w-full">
                            <Input
                                name="confirmPassword"
                                type={showConfirmPassword ? "text" : "password"}
                                placeholder="Confirm password"
                                onChange={handleChange}
                                className="pr-12"
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

                    <Button onClick={submit} disabled={loading || !isPasswordValid}>
                        {loading ? "Creating account..." : "Create account"}
                    </Button>
                </div>

                <div className="flex items-center gap-3 my-5">
                    <div className="flex-1 h-px bg-gray-200" />
                    <span className="text-gray-400 text-xs">OR</span>
                    <div className="flex-1 h-px bg-gray-200" />
                </div>

                <div className="flex flex-col sm:flex-row  justify-between gap-5">
                    <Button variant="secondary" onClick={loginWithGoogle}>
                        <img src="/google.svg" className="w-5 h-5" />
                        Continue with Google
                    </Button>

                    <Button variant="secondary" onClick={loginWithFacebook}>
                        <img src="/facebook.svg" className="w-5 h-5" />
                        Continue with Facebook
                    </Button>
                </div>

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
