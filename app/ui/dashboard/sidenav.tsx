/**
 * Defines the side-nav component to be used in the admin dashboard
 */
import Link from 'next/link';
import NavLinks from '@/app/ui/dashboard/nav-links';
import StoreLogo from '@/app/ui/store-logo';
import { PowerIcon } from '@heroicons/react/24/outline';
import {signOut} from "@/auth";

export default function SideNav() {
    return (
        <div className="flex h-full flex-col px-3 py-4 md:px-2 bg-gray-900">
            <Link
                className="mb-2 flex h-20 items-end justify-start rounded-md bg-red-800 p-4 md:h-40"
                href="/"
            >
                <div className="w-32 text-white md:w-40">
                    <StoreLogo />
                </div>
            </Link>
            <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
                <NavLinks />
                <div className="hidden h-auto w-full grow rounded-md md:block"></div>
                <form
                    action={async ()  => {
                        'use server';
                        await signOut();
                    }}>
                    <button className="flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md bg-red-800 p-3 text-sm text-white font-medium hover:bg-red-700 hover:text-white md:flex-none md:justify-start md:p-2 md:px-3">
                        <PowerIcon className="w-6" />
                        <div className="hidden md:block">Sign Out</div>
                    </button>
                </form>
            </div>
        </div>
    );
}
