/**
 * Container for the user profile display given the known user UUID
 */
import Link from "next/link";
import {signOut} from "@/auth";
import {redirect} from "next/navigation";
import {
    AtSymbolIcon,
    ChevronLeftIcon,
    LockClosedIcon,
    PowerIcon,
    UserCircleIcon,
    UserIcon
} from "@heroicons/react/24/solid";

const links = [
    {name: "Email", href: "/account/profile/email", icon: AtSymbolIcon},
    {name: "Screen Name", href: "/account/profile/screen-name", icon: UserIcon},
    {name: "Password", href: "/account/profile/password", icon: LockClosedIcon},
    {name: "Avatar", href: "/account/profile/avatar-ref", icon: UserCircleIcon},
]

export default async function UserProfileDisplay(
    { userId } : { userId : string; }
) {

    return (
        <div className="flex flex-col align-middle justify-center bg-gray-100 w-[30%] p-10 rounded-b-lg">
            {/* Our return button can be on top for this time */}
            <form
                action={async () => {
                    'use server';
                    redirect('/account')
                }}>
                <button
                    className="flex relative h-[60px] bg-gray-300 w-full grow items-center justify-center gap-2 rounded-md p-3 text-lg font-bold text-gray-800 hover:bg-gray-800 hover:text-white md:flex-none md:justify-start md:p-2 md:px-3">
                    <ChevronLeftIcon className="w-6"/>
                    <div>Account</div>
                </button>
            </form>

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
        </div>
    )
}