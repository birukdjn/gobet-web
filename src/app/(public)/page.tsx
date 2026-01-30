"use client";

import Navbar from "@/components/layout/Navbar";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Hero */}
      <section className="max-w-7xl mx-auto px-6 py-24 grid md:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="text-4xl font-bold text-gray-900 leading-tight mb-4">
            Book buses faster.
            <br />
            Travel smarter.
          </h2>
          <p className="text-gray-600 mb-8 max-w-md">
            GoBet helps passengers find buses, book trips, and track journeys —
            all in one simple platform.
          </p>

          <div className="flex gap-4">
            <a
              href="/register"
              className="bg-gray-900 text-white px-6 py-3 rounded-md text-sm font-medium hover:bg-black transition"
            >
              Create account
            </a>
            <a
              href="/login"
              className="border border-gray-300 text-gray-700 px-6 py-3 rounded-md text-sm font-medium hover:bg-gray-100 transition"
            >
              Sign in
            </a>
          </div>
        </div>

        <div className="hidden md:flex justify-center">
          <div className="w-80 h-80 rounded-2xl bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center text-gray-400 text-sm">
            Bus booking UI preview
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="bg-white border-t">
        <div className="max-w-7xl mx-auto px-6 py-20 grid md:grid-cols-3 gap-10">
          <Feature
            title="Find nearby buses"
            desc="Search buses by destination and location instantly."
          />
          <Feature
            title="Book in seconds"
            desc="Reserve seats and pickup points with one tap."
          />
          <Feature
            title="Track trips live"
            desc="See driver location and trip progress in real time."
          />
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 py-6 text-sm text-gray-500 flex justify-between">
          <span>© {new Date().getFullYear()} GoBet</span>
          <div className="flex gap-4">
            <a href="#" className="hover:text-gray-700">Privacy</a>
            <a href="#" className="hover:text-gray-700">Terms</a>
            <a href="#" className="hover:text-gray-700">Support</a>
          </div>
        </div>
      </footer>
    </main>
  );
}

function Feature({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="text-center">
      <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600 text-sm">{desc}</p>
    </div>
  );
}
