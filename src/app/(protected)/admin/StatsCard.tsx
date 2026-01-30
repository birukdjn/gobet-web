type StatsCardProps = {
    title: string;
    value: number;
};

export default function StatsCard({ title, value }: StatsCardProps) {
    return (
        <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center">
            <span className="text-gray-800">{title}</span>
            <span className="text-3xl font-bold">{value}</span>
        </div>
    );
}
