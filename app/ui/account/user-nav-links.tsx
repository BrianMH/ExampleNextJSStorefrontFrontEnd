import {signOut} from "@/auth";
import Link from "next/link";
import {ClockIcon, Cog8ToothIcon, HomeModernIcon, UserIcon} from "@heroicons/react/24/solid";
import {PowerIcon, ShoppingCartIcon} from "@heroicons/react/24/outline";
import {Roles} from "@/app/lib/definitions";

const links = [
    {name: 'Profile', href: '/account/profile', icon: UserIcon},
    {name: 'Saved Addresses', href: '/account/addresses', icon: HomeModernIcon},
    {name: 'Saved Carts', href: '/account/carts', icon: ShoppingCartIcon},
    {name: 'Notifications', href: '/account/notifications', icon: ClockIcon},
]

export default function UserNavLinks(
    { userRole } : { userRole : string }
) {
    return (
        <div className="flex flex-col align-middle justify-center bg-gray-100 w-[30%] p-10 rounded-b-lg">
            {links.map((link) => {
                const LinkIcon = link.icon;
                return (
                    <Link
                        key={link.name}
                        href={link.href}
                        className="flex relative h-[60px] grow items-center justify-center gap-2 rounded-md p-3 text-lg font-medium text-gray-800 hover:bg-gray-800 hover:text-white md:flex-none md:justify-start md:p-2 md:px-3"
                    >
                        <LinkIcon className="w-6"/>
                        <p>{link.name}</p>
                        <div className="w-[80%] absolute border-gray-300 border-2 bottom-0 left-[10%]"></div>
                    </Link>
                );
            })}

            {/*  Our dashboard icon is a bit special in that it requires admin privileges to see  */}
            {userRole === Roles.ROLE_ADMIN ? (
                <Link
                    key="dashboard"
                    href={"/dashboard"}
                    className="flex h-[60px] grow items-center justify-center gap-2 rounded-md p-3 text-lg font-medium text-gray-800 hover:bg-gray-800 hover:text-white md:flex-none md:justify-start md:p-2 md:px-3"
                >
                    <Cog8ToothIcon className={"w-6"}/>
                    <p>Admin Dashboard</p>
                </Link>
            ) : (
                <></>
            )}

            {/*  And, finally we can place our sign-out button here  */}
            <form
                action={async () => {
                    'use server';
                    await signOut();
                }}>
                <button
                    className="flex h-[60px] mt-20 w-full grow items-center justify-center gap-2 rounded-md bg-red-800 p-3 text-lg text-white font-medium hover:bg-red-700 hover:text-white md:flex-none md:justify-start md:p-2 md:px-3">
                    <PowerIcon className="w-6"/>
                    <div>Sign Out</div>
                </button>
            </form>
        </div>
    )
}