/**
 * Top Navigation bar for the site.
 */
'use client';

import {useState} from "react";
import {ShoppingCartIcon} from "@heroicons/react/24/outline";
import StoreLogo from "@/app/ui/store-logo";
import Link from "next/link";
import CategoryLinks from "@/app/ui/category-links";
import StatefulShoppingCartIcon from "@/app/ui/cartIcon";

// used for the cart's link
const cartLink = { name: "cart", href: "/cart"}

/**
 * A top-navigation bar for the landing page that will be carried over in most other pages
 */
export default function TopNav() {
    return (
        <nav className="bg-transparent w-full top-0 start-0">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                {/*Logo side*/}
                <Link
                    className="mb-2 flex h-20 items-end justify-start p-4"
                    href="/"
                >
                    <div className="w-40">
                        <StoreLogo />
                    </div>
                </Link>

                {/*Right side shopping cart button*/}
                <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
                    <Link
                        key={cartLink.name}
                        href={cartLink.href}
                        className="grow items-center justify-center gap-2 rounded-md p-3 text-sm font-medium md:flex-none md:justify-start md:p-2 md:px-3 "
                    >
                        <StatefulShoppingCartIcon />
                    </Link>
                </div>

                {/*Middle part of the navbar with all of our links*/}
                <div className="items-center justify-between flex w-full md:w-auto md:order-1" id="navbar-sticky">
                    <CategoryLinks />
                </div>
            </div>
        </nav>
    )
}