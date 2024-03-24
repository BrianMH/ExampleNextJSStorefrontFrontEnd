'use client';
/**
 * A card that represents a single entry of a user's address.
 */
import Link from "next/link";
import {HomeIcon} from "@heroicons/react/24/outline";
import {Button} from "@/app/ui/button";
import {deleteAddress} from "@/app/lib/databaseActions";
import {useFormState} from "react-dom";

export default function AddressCard(
    { addressId, addressName, address1, address2, city, state, zip }
        : { addressId: string, addressName: string, address1: string, address2: string|null, city: string, state: string, zip: string }
) {
    // we can create a functor to apply to our button here
    const [formState, dispatch] = useFormState(deleteAddress.bind(null, addressId), null);

    return (
        <div
            className="flex relative h-fit grow items-center justify-center gap-2 rounded-md p-3 text-lg font-medium text-gray-800 hover:bg-gray-800 hover:text-white md:flex-none md:justify-start md:p-2 md:px-3">
            <Link
                href={`/account/addresses/${addressId}/edit`}
                className="flex-1 flex-row relative "
            >
                <div className="flex flex-row w-full">
                    <div className="flex flex-col align-middle justify-center">
                        <HomeIcon className="w-6"/>
                    </div>

                    <div className="flex-1 flex-col align-middle justify-center">
                        <p className="font-bold">{addressName}</p>
                        <p>{address1}</p>
                        {address2 ? <p>{address2}</p> : <></>}
                        <p>{city}, {state} {zip}</p>
                    </div>
                </div>
            </Link>

            {/* Delete Button just in case user wants to delete entry */}
            <div className="flex flex-col align-middle justify-center z-20">
                <form
                    action={dispatch}
                >
                    <Button
                        className="bg-red-700 hover:bg-red-900"
                        type="submit"
                    >
                        Delete
                    </Button>
                </form>
            </div>
            <div className="w-[80%] absolute border-gray-300 border-2 bottom-0 left-[10%]"></div>
        </div>
    )
}