type StatsCardProps = {
    title: string;
    value: number;
    color?: "blue" | "green" | "amber" | "purple";
};

export default function StatsCard({ title, value, color = "blue" }: StatsCardProps) {
    const colorMap = {
        blue: "text-blue-600 bg-blue-50",
        green: "text-emerald-600 bg-emerald-50",
        amber: "text-amber-600 bg-amber-50",
        purple: "text-purple-600 bg-purple-50"
    };

    return (
        <div className="bg-white rounded-2xl shadow-sm border p-6 transition-transform hover:scale-[1.02]">
            <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">{title}</p>
            <div className="flex items-center gap-4">
                <span className="text-4xl font-black text-gray-900">{value.toLocaleString()}</span>
                <div className={`p-2 rounded-lg ${colorMap[color]}`}>
                    {/* Placeholder for small sparkline or icon */}
                </div>
            </div>
        </div>
    );
}