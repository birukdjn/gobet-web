"use client";

import { useState } from "react";
import api from "@/lib/api";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { Bell, Send, Users as UsersIcon, Smartphone } from "lucide-react";

export default function NotificationCenter() {
    const [target, setTarget] = useState("all");
    const [message, setMessage] = useState({ title: "", body: "" });
    const [sending, setSending] = useState(false);

    const handleSend = async () => {
        if (!message.title || !message.body) return alert("Please fill all fields");
        setSending(true);
        try {
            // Logic: Send to API endpoint that triggers Firebase or Socket.io
            await api.post("/admin/notifications/broadcast", { ...message, target });
            alert("Broadcast sent successfully!");
            setMessage({ title: "", body: "" });
        } catch (err) {
            alert("Failed to send notification");
        } finally {
            setSending(false);
        }
    };

    return (
        <div className="max-w-3xl space-y-6">
            <div className="bg-white p-8 rounded-2xl border shadow-sm">
                <div className="flex items-center gap-3 mb-6">
                    <div className="p-3 bg-amber-50 text-amber-600 rounded-xl">
                        <Bell size={24} />
                    </div>
                    <div>
                        <h3 className="text-xl font-bold">System Broadcast</h3>
                        <p className="text-sm text-gray-500">Send an instant alert to users' mobile apps.</p>
                    </div>
                </div>

                <div className="space-y-4">
                    <div>
                        <label className="text-xs font-bold text-gray-400 uppercase mb-2 block">Target Audience</label>
                        <div className="flex gap-2">
                            {["all", "Driver", "Passenger"].map((role) => (
                                <button
                                    key={role}
                                    onClick={() => setTarget(role)}
                                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${target === role
                                            ? "bg-gray-900 text-white"
                                            : "bg-gray-100 text-gray-500 hover:bg-gray-200"
                                        }`}
                                >
                                    {role.charAt(0).toUpperCase() + role.slice(1)}s
                                </button>
                            ))}
                        </div>
                    </div>

                    <Input
                        placeholder="Notification Title (e.g. New Route Available!)"
                        value={message.title}
                        onChange={(e) => setMessage({ ...message, title: e.target.value })}
                    />

                    <textarea
                        className="w-full border text-gray-600 rounded-md px-3 py-3 text-sm focus:ring-2 focus:ring-gray-900 focus:outline-none min-h-[120px]"
                        placeholder="Type your message here..."
                        value={message.body}
                        onChange={(e) => setMessage({ ...message, body: e.target.value })}
                    />

                    <Button
                        onClick={handleSend}
                        disabled={sending}
                        className="flex items-center justify-center gap-2"
                    >
                        {sending ? "Processing..." : <><Send size={18} /> Send Broadcast</>}
                    </Button>
                </div>
            </div>

            <div className="bg-blue-50 p-6 rounded-2xl border border-blue-100 flex gap-4">
                <div className="text-blue-600"><Smartphone size={32} /></div>
                <div className="text-sm text-blue-800">
                    <p className="font-bold">Pro Tip:</p>
                    <p>Keep titles under 50 characters for better visibility on mobile lock screens. Notifications sent here are logged for audit purposes.</p>
                </div>
            </div>
        </div>
    );
}