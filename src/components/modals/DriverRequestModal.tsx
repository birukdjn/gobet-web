"use client";

import { useState } from "react";
import { useDriverStore } from "@/store/useDriverStore";
import api from "@/lib/api";
import Modal from "@/components/ui/modal";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";

export default function DriverRequestModal() {
    const { isModalOpen, closeModal } = useDriverStore();
    const [licenseNumber, setLicenseNumber] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async () => {
        try {
            setLoading(true);
            // Matches Swagger POST /api/Driver/request-driver
            await api.post("/Driver/request-driver", {
                licenseNumber: licenseNumber.trim()
            });
            alert("Request submitted! We will notify you via email.");
            closeModal();
            window.location.reload(); // Refresh to show the pending pulse
        } catch (err: any) {
            alert(err.response?.data?.message || "You already have a pending request.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal open={isModalOpen} onClose={closeModal} title="Become a Driver">
            <div className="space-y-4">
                <p className="text-sm text-gray-500">Enter your license details for verification.</p>
                <Input
                    placeholder="License Number"
                    value={licenseNumber}
                    onChange={(e) => setLicenseNumber(e.target.value)}
                />
                <div className="flex justify-end gap-2">
                    <Button variant="secondary" onClick={closeModal}>Cancel</Button>
                    <Button onClick={handleSubmit} disabled={loading || !licenseNumber}>
                        {loading ? "Submitting..." : "Submit Request"}
                    </Button>
                </div>
            </div>
        </Modal>
    );
}