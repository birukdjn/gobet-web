"use client";

import { useState } from "react";
import api from "@/lib/api";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Modal from "@/components/ui/Modal";

export default function requestDriver() {

    const [showDriverModal, setShowDriverModal] = useState(false);
    const [licenseNumber, setLicenseNumber] = useState("");
    const [requestingDriver, setRequestingDriver] = useState(false);

    const requestDriver = async () => {
        try {
            setRequestingDriver(true);
            await api.post("/Driver/request-driver", { licenseNumber });
            alert("Your request has been submitted. Wait for admin approval.");
            setShowDriverModal(false);
            setLicenseNumber("");
        } catch (err: any) {
            alert(err.response?.data?.message || "Request failed");
        } finally {
            setRequestingDriver(false);
        }
    };

    return (
        <main className="min-h-screen bg-gray-50">
            <section className="max-w-7xl mx-auto px-6 py-10">
                {/* Driver Request Modal */}
                <Modal
                    open={showDriverModal}
                    onClose={() => setShowDriverModal(false)}
                    title="Request Driver Access"
                >
                    <p className="text-sm text-gray-500 mb-3">
                        Enter your driver license number. Admin approval is required.
                    </p>

                    <Input
                        placeholder="Driver License Number"
                        value={licenseNumber}
                        onChange={(e) => setLicenseNumber(e.target.value)}
                    />

                    <div className="flex justify-end gap-3 mt-4">
                        <Button variant="secondary" onClick={() => setShowDriverModal(false)}>
                            Cancel
                        </Button>
                        <Button
                            onClick={requestDriver}
                            disabled={requestingDriver || !licenseNumber}
                        >
                            {requestingDriver ? "Submitting..." : "Submit"}
                        </Button>
                    </div>
                </Modal>
            </section>
        </main>
    );
}
