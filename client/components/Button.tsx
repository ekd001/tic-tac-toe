import Link from 'next/link';
import React from 'react';
import { ButtonHTMLAttributes } from 'react';
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    href: string;
}
const Button = ({ href, children, className }: ButtonProps) => {
    return (
        <Link href={href}>
            <button className={`font-medium mt-10 p-3 w-[500px] rounded-full ${className}`}>
                {children}
            </button>
        </Link>
    );
}

export default Button