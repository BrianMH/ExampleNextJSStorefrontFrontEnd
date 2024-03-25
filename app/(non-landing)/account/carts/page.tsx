/**
 * Additional cart functionality
 *
 * TODO: NOT IMPLEMENTED
 */
import {redirect} from "next/navigation";
import {ChevronLeftIcon} from "@heroicons/react/24/solid";

export const metadata = {
    title: "Saved Carts",
}

export default async function SavedCartPage() {
    return (
        <div className="flex flex-col align-middle justify-center bg-gray-100 w-[30%] p-10 rounded-b-lg">
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

            <p className="pt-3">Implement me!</p>
        </div>
    )
}