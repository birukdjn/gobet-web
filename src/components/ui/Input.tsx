type Props = React.InputHTMLAttributes<HTMLInputElement>;

export default function Input({ className = "", ...props }: Props) {
    return (
        <input
            {...props}
            className={`w-full border text-gray-600 rounded-md px-3 py-3 text-sm focus:ring-2 focus:ring-gray-900 focus:outline-none ${className}`}
        />
    );
}
