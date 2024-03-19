/**
 * Holds the links that determines the categories that show up in the middle of the bar.
 */
'use client';

import Link from "next/link";
import clsx from "clsx";
import {usePathname} from "next/navigation";

const catLinks = [
    { name: "Products", href: "/products" },
    { name: "Account", href: "/account" },
    { name: "Contact", href: "/about" },
]

export default function CategoryLinks() {
    const pathName = usePathname();

    return (
        <>
            {catLinks.map((link) => {
                return (
                    <Link
                        key={link.name}
                        href={link.href}
                        className={clsx("flex h-[48px] grow items-center justify-center gap-4 p-3 text-2xl font-bold hover:text-gray-400 md:flex-none md:justify-start md:p-2 md:px-3 ",
                            {
                                'border-[6px] rounded-md border-transparent border-b-black': pathName === link.href,
                            })}
                    >
                        <p>{link.name}</p>
                    </Link>
                );
            })}        </>
    )
}