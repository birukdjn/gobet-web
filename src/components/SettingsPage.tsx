"use client";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";

export default function SettingsPage() {
    return (
        <div className="space-y-8 bg-white p-8 rounded-2xl border">
            <section>
                <h4 className="font-bold mb-4">Pricing Configuration</h4>
                <div className="grid md:grid-cols-2 gap-6">
                    <div>
                        <label className="text-xs font-bold text-gray-500 mb-1 block uppercase">System Commission (%)</label>
                        <Input defaultValue="15" />
                    </div>
                    <div>
                        <label className="text-xs font-bold text-gray-500 mb-1 block uppercase">Base Booking Fee (ETB)</label>
                        <Input defaultValue="5" />
                    </div>
                </div>
            </section>
            <Button variant="primary">Save Global Settings</Button>
        </div>
    );
}