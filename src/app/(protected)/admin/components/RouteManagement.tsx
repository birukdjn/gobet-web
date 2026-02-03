"use client";

import { useState, useEffect } from "react";
import api from "@/lib/api";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { MapPin, Plus, Trash2, Route as RouteIcon, Navigation } from "lucide-react";

type Route = {
    id: string;
    origin: string;
    destination: string;
    via: string; // New field for the specific path (e.g., Kebenna)
    basePrice: number;
    estimatedDuration: string;
};

export default function RouteManagement() {
    const [routes, setRoutes] = useState<Route[]>([]);
    const [loading, setLoading] = useState(true);
    const [showAddForm, setShowAddForm] = useState(false);

    // Form State
    const [newRoute, setNewRoute] = useState({
        origin: "",
        destination: "",
        via: "",
        basePrice: 0,
        estimatedDuration: ""
    });

    const fetchRoutes = async () => {
        try {
            const res = await api.get("/admin/routes");
            setRoutes(res.data);
        } catch (err) {
            console.error("Failed to fetch routes");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { fetchRoutes(); }, []);

    const handleCreateRoute = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await api.post("/admin/routes", newRoute);
            setNewRoute({ origin: "", destination: "", via: "", basePrice: 0, estimatedDuration: "" });
            setShowAddForm(false);
            fetchRoutes();
        } catch (err) {
            alert("Failed to create route");
        }
    };

    const deleteRoute = async (id: string) => {
        if (!confirm("Are you sure? This may affect active trips.")) return;
        try {
            await api.delete(`/admin/routes/${id}`);
            fetchRoutes();
        } catch (err) {
            alert("Delete failed");
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div className="space-y-1">
                    <h3 className="text-xl font-bold text-gray-800">System Routes</h3>
                    <p className="text-sm text-gray-500">Define terminals and specific pathways (e.g. via Kebenna)</p>
                </div>
                <Button
                    onClick={() => setShowAddForm(!showAddForm)}
                    className="!w-auto flex items-center gap-2"
                >
                    {showAddForm ? "Cancel" : <><Plus size={18} /> Add New Route</>}
                </Button>
            </div>

            {showAddForm && (
                <form onSubmit={handleCreateRoute} className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm grid md:grid-cols-2 gap-4 animate-in slide-in-from-top-2">
                    <Input
                        placeholder="Origin (e.g., Megenagna)"
                        value={newRoute.origin}
                        onChange={(e) => setNewRoute({ ...newRoute, origin: e.target.value })}
                        required
                    />
                    <Input
                        placeholder="Destination (e.g., Piassa)"
                        value={newRoute.destination}
                        onChange={(e) => setNewRoute({ ...newRoute, destination: e.target.value })}
                        required
                    />
                    <div className="md:col-span-2">
                        <Input
                            placeholder="Via / Pathway (e.g., Kebenna, Aware, or 6 Killo)"
                            value={newRoute.via}
                            onChange={(e) => setNewRoute({ ...newRoute, via: e.target.value })}
                            required
                        />
                    </div>
                    <Input
                        type="number"
                        placeholder="Base Price (ETB)"
                        onChange={(e) => setNewRoute({ ...newRoute, basePrice: Number(e.target.value) })}
                        required
                    />
                    <Input
                        placeholder="Est. Duration (e.g., 25 mins)"
                        value={newRoute.estimatedDuration}
                        onChange={(e) => setNewRoute({ ...newRoute, estimatedDuration: e.target.value })}
                    />
                    <Button type="submit" className="md:col-span-2">Save Route Configuration</Button>
                </form>
            )}

            <div className="grid gap-4">
                {loading ? (
                    <p className="text-center py-10 text-gray-400">Loading routes...</p>
                ) : routes.length === 0 ? (
                    <div className="text-center py-10 bg-gray-50 rounded-xl border border-dashed">
                        <p className="text-gray-400">No routes defined yet.</p>
                    </div>
                ) : routes.map((route) => (
                    <div key={route.id} className="bg-white p-5 rounded-xl border flex items-center justify-between hover:shadow-md transition">
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-blue-50 rounded-lg text-blue-600">
                                <RouteIcon size={24} />
                            </div>
                            <div>
                                <div className="flex items-center gap-2">
                                    <p className="font-bold text-gray-900 text-lg">{route.origin} → {route.destination}</p>
                                    <span className="bg-gray-100 text-gray-600 text-[10px] font-bold px-2 py-0.5 rounded uppercase flex items-center gap-1">
                                        <Navigation size={10} /> {route.via || 'Direct'}
                                    </span>
                                </div>
                                <p className="text-sm text-gray-500 font-medium">
                                    {route.basePrice} ETB • <span className="text-gray-400">{route.estimatedDuration}</span>
                                </p>
                            </div>
                        </div>
                        <button
                            onClick={() => deleteRoute(route.id)}
                            className="p-2 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-full transition-all"
                        >
                            <Trash2 size={20} />
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}