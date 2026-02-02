"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import api from "@/lib/api";

export default function HomePage() {
  const { user } = useAuth();
  const router = useRouter();

  const [status, setStatus] = useState<string>("None");
  const [quickSearch, setQuickSearch] = useState("");

  // Single useEffect to handle driver verification status
  useEffect(() => {
    const checkStatus = async () => {
      if (user) {
        try {
          // Matches Swagger: GET /api/Driver/my-request-status
          const res = await api.get("/Driver/my-request-status");
          setStatus(res.data.status);
        } catch (err) {
          console.error("Status check failed:", err);
          setStatus("None");
        }
      }
    };
    checkStatus();
  }, [user]);

  const handleQuickSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!quickSearch.trim()) return;
    router.push(`/passenger?search=${encodeURIComponent(quickSearch)}`);
  };

  const getDashboardPath = () => {
    if (user?.role.includes("Admin")) return "/admin";
    if (user?.role.includes("Driver")) return "/driver";
    return "/passenger";
  };

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Pending Application Alert */}
      {status === "Pending" && (
        <div className="max-w-7xl mx-auto px-6 pt-6">
          <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl animate-pulse flex items-center justify-between shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-amber-500 rounded-full" />
              <p className="text-amber-800 font-medium text-sm md:text-base">
                🚀 Your driver application is under review. We'll update you soon!
              </p>
            </div>
            <span className="text-[10px] font-bold bg-amber-200 text-amber-900 px-2 py-1 rounded uppercase">
              Pending
            </span>
          </div>
        </div>
      )}

      <section className="max-w-7xl mx-auto px-6 py-16 md:py-24 grid md:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <h2 className="text-4xl md:text-6xl font-extrabold text-gray-900 leading-tight">
            {user ? `Welcome back, ${user.fullname || user.role}!` : "Book buses faster. Travel smarter."}
          </h2>

          <p className="text-lg md:text-xl text-gray-600 max-w-md">
            {user
              ? "Manage your active trips or find your next ride across the city."
              : "Real-time bus booking and tracking for modern travelers in your city."}
          </p>

          <div className="pt-4">
            {user ? (
              <div className="space-y-6">
                {user.role.includes("Passenger") && (
                  <form onSubmit={handleQuickSearch} className="flex flex-col sm:flex-row gap-2 max-w-lg">
                    <Input
                      placeholder="Enter destination..."
                      value={quickSearch}
                      onChange={(e) => setQuickSearch(e.target.value)}
                    />
                    <Button type="submit" className="sm:w-32">Find Bus</Button>
                  </form>
                )}

                <div className="flex flex-wrap gap-4">
                  <Link href={getDashboardPath()}>
                    <Button variant="primary" className="px-8 !w-auto">Go to Dashboard</Button>
                  </Link>
                </div>
              </div>
            ) : (
              <div className="flex gap-4">
                <Link href="/register"><Button variant="primary">Get Started</Button></Link>
                <Link href="/login"><Button variant="secondary">Sign In</Button></Link>
              </div>
            )}
          </div>
        </div>

        {/* Decorative Graphic Element */}
        <div className="hidden md:flex justify-end">
          <div className="w-full max-w-md aspect-square bg-gradient-to-br from-gray-900 to-gray-700 rounded-3xl shadow-2xl p-8 flex flex-col justify-center items-center text-white text-center">
            <div className="text-5xl mb-4">🚌</div>
            <h3 className="text-2xl font-bold">GoBet Mobility</h3>
            <p className="text-gray-300 mt-2">Connecting people to places, one trip at a time.</p>
          </div>
        </div>
      </section>

      {/* Feature Section based on User Role */}
      <section className="bg-white border-t py-20">
        <div className="max-w-7xl mx-auto px-6">
          <h3 className="text-2xl font-bold text-gray-900 mb-10 text-center md:text-left">Your Capabilities</h3>
          <div className="grid md:grid-cols-3 gap-8">
            {user?.role.includes("Admin") ? (
              <>
                <Feature title="Verify Drivers" desc="Review and approve license submissions to maintain safety." />
                <Feature title="System Audit" desc="Monitor booking analytics and trip success rates." />
                <Feature title="User Control" desc="Manage account permissions and system access levels." />
              </>
            ) : user?.role.includes("Driver") ? (
              <>
                <Feature title="Route Manager" desc="Publish your destinations and seat availability." />
                <Feature title="Live Tracking" desc="Share your real-time GPS coordinates with passengers." />
                <Feature title="Earnings" desc="Track your trip history and revenue reports." />
              </>
            ) : (
              <>
                <Feature title="Live Tracking" desc="See exactly where your bus is on the map." />
                <Feature title="Quick Booking" desc="Skip the station lines and book in under 30 seconds." />
                <Feature title="Verified Safety" desc="Every driver is vetted by our admin team for your peace of mind." />
              </>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}

function Feature({ title, desc }: { title: string, desc: string }) {
  return (
    <div className="p-8 rounded-3xl border border-gray-100 bg-gray-50/50 hover:bg-white hover:shadow-xl hover:border-transparent transition-all duration-300">
      <h4 className="text-xl font-bold text-gray-900 mb-3">{title}</h4>
      <p className="text-gray-600 text-sm leading-relaxed">{desc}</p>
    </div>
  );
}