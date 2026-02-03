"use client";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";

export default function PromoManager() {
    return (
        <div className="max-w-2xl bg-white p-8 rounded-2xl border">
            <h3 className="text-xl font-bold mb-4">Create Promo Code</h3>
            <div className="space-y-4">
                <Input placeholder="Code (e.g. GOBET2026)" />
                <div className="grid grid-cols-2 gap-4">
                    <Input type="number" placeholder="Discount %" />
                    <Input type="date" placeholder="Expiry Date" />
                </div>
                <Button>Activate Code</Button>
            </div>
        </div>
    );
}