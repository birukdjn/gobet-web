export default function Footer() {
    return (
        <footer className="border-t bg-white mt-auto py-8">
            <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
                <div className="flex flex-col items-center md:items-start">
                    <span className="text-xl font-bold text-gray-900">GoBet</span>
                    <p className="text-xs text-gray-500 mt-1">
                        © {new Date().getFullYear()} All rights reserved.
                    </p>
                </div>

                <div className="flex gap-6 text-sm text-gray-600">
                    <a href="#" className="hover:text-gray-900 transition">Privacy Policy</a>
                    <a href="#" className="hover:text-gray-900 transition">Terms of Service</a>
                    <a href="#" className="hover:text-gray-900 transition">Contact Support</a>
                </div>
            </div>
        </footer>
    );
}