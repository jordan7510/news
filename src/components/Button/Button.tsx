interface ButtonProps {
    label?: string,
    className?: string
}
export default function Button({ label, className }: ButtonProps) {
    return (
        <button className={`${className} font-medium text-sm px-2 py-1 rounded-md border text-brand border-brand hover:bg-brand hover:text-white duration-300 cursor-pointer`}>
            {label}
        </button>
    )
}