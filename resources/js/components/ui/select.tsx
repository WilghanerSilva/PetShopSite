import { ChangeEventHandler } from "react";

interface SelectProps {
    children: React.ReactNode;
    onChange?: ChangeEventHandler<HTMLSelectElement>;
    value?: string | number;
    name?: string;
}

export default function Select({children, onChange, value, name, }: SelectProps) {
    return (
        <select
            className="w-64 border-1 p-1 border-(--orange) rounded-2xl text-(--orange) outline-none ml-3"
            onChange={onChange}
            value={value}
            name={name}
        >
            {children}
        </select>
    )
}
