type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: "primary" | "secondary" | "ghost";
};

export default function Button({
    variant = "primary",
    className = "",
    ...props
}: Props) {
    const styles = {
        primary: "bg-gray-900 mx-auto w-full text-white hover:bg-black",
        secondary: "border py-3 flex  gap-2 hover:bg-gray-100 text-gray-600",
        ghost: "text-gray-600 hover:text-gray-900",
    };

    return (
        <button
            {...props}
            className={`px-4 py-3  rounded-md text-sm font-medium transition disabled:opacity-50 ${styles[variant]} ${className}`}
        />
    );
}
