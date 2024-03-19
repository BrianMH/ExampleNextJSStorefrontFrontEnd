'use client';

import {
    UserGroupIcon,
    HomeIcon,
    DocumentDuplicateIcon,
    ShoppingBagIcon,
    InboxIcon,
} from '@heroicons/react/24/outline';
import {ChevronDownIcon, ChevronRightIcon} from "@heroicons/react/16/solid";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from "clsx";

// Map of links to display in the side navigation.
// Depending on the size of the application, this would be stored in a database.
const links = [
    { name: 'Home', href: '/dashboard', icon: HomeIcon },
    { name: 'Products', href: '/dashboard/products', icon: ShoppingBagIcon },
    { name: 'Inbox', href: '/dashboard/inbox', icon: InboxIcon} // Proof of concept. Likely to not be implemented.
];

const eCommerceLinks = [
    { name: 'Invoices', href: '/dashboard/invoices', icon: DocumentDuplicateIcon },
    { name: 'Customers', href: '/dashboard/customers', icon: UserGroupIcon },
]

export default function NavLinks() {
    const pathName = usePathname();

    // toggles the hidden attribute of the ecommerce drop-down
    const toggleECommerceDropDown = () => {
        'use client'

        // get our elements
        let DDElem = document.getElementById("dropdown-pages");
        let DDDOwnIcon = document.getElementById("ddDown-ecommerce");
        let DDRightIcon = document.getElementById("ddRight-ecommerce");
        if(DDElem == null)
            return;

        // toggle between hidden or non-hidden based on hidden attribute
        if(DDElem.classList.contains("hidden")) {
            DDElem.classList.remove("hidden");

            if(DDDOwnIcon != null && DDRightIcon != null) {
                DDRightIcon.classList.add("hidden");
                DDDOwnIcon.classList.remove("hidden");
            }
        } else {
            DDElem.classList.add("hidden");

            if(DDDOwnIcon != null && DDRightIcon != null) {
                DDRightIcon.classList.remove("hidden");
                DDDOwnIcon.classList.add("hidden");
            }
        }
    }

    return (
        <>
            {links.map((link) => {
                const LinkIcon = link.icon;
                return (
                    <Link
                        key={link.name}
                        href={link.href}
                        className={clsx("flex h-[48px] grow items-center justify-center gap-2 rounded-md p-3 text-sm font-medium text-gray-400 hover:bg-gray-800 hover:text-white md:flex-none md:justify-start md:p-2 md:px-3 ",
                            {
                                'text-[color:white] bg-gray-800': pathName === link.href,
                            })}
                    >
                        <LinkIcon className="w-6"/>
                        <p className="hidden md:block">{link.name}</p>
                    </Link>
                );
            })}

            {/*Drop down for e-commerce links*/}
            <button type="button"
                    className="flex h-[48px] grow items-center justify-center gap-2 rounded-md p-3 text-sm font-medium text-gray-400 hover:bg-gray-800 hover:text-white md:flex-none md:justify-start md:p-2 md:px-3"
                    onClick={toggleECommerceDropDown}
                    aria-controls="dropdown-pages" data-collapse-toggle="dropdown-pages">
                <ShoppingBagIcon className="w-6" />
                <p className="hidden md:block">E-Commerce</p>
                <ChevronDownIcon id="ddDown-ecommerce" className="hidden w-6" />
                <ChevronRightIcon id="ddRight-ecommerce" className="w-6" />
            </button>
            {/*Hidden tag can be removed to show pages via JS*/}
            <ul id="dropdown-pages" className="hidden px-4 space-y-2">
                {eCommerceLinks.map((link) => {
                    const LinkIcon = link.icon;
                    return (
                        <Link
                            key={link.name}
                            href={link.href}
                            className={clsx("flex h-[48px] grow items-center justify-center gap-2 rounded-md p-3 text-sm font-medium text-gray-400 hover:bg-gray-800 hover:text-white md:flex-none md:justify-start md:p-2 md:px-3 ",
                                {
                                    'text-[color:white] bg-gray-800': pathName === link.href,
                                })}
                        >
                            <LinkIcon className="w-6"/>
                            <p className="hidden md:block">{link.name}</p>
                        </Link>
                    );
                })}
            </ul>
        </>
    );
}
