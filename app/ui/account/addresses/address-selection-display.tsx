/**
 * Shows a user their list of addresses
 */
import {redirect} from "next/navigation";
import {ChevronLeftIcon, PlusIcon} from "@heroicons/react/24/solid";
import Link from "next/link";
import {fetchAddressesByUser} from "@/app/lib/data";
import AddressCard from "@/app/ui/account/addresses/address-card";

export default async function AddressSelectionDisplay(
    { userId } : { userId : string; }
) {
    // we need to get our addresses now
    const addressList = await fetchAddressesByUser(userId);

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

            {/* We also add a button to allow for a user to create a completely new address */}
            <Link
                href="/account/addresses/create"
                className="flex relative h-[60px] w-full grow items-center justify-center gap-2 rounded-md p-3 text-lg font-bold text-gray-800 hover:bg-gray-800 hover:text-white md:flex-none md:justify-start md:p-2 md:px-3"
            >
                <PlusIcon className="w-6"/>
                <div>Add New Address</div>
                <div className="w-[80%] absolute border-gray-300 border-2 bottom-0 left-[10%]"></div>
            </Link>

            {/*If no addresses present*/}
            {addressList.length === 0 ? (
                <div className="pt-4">
                    No addresses currently saved.
                </div>
            ) : <></>}

            {/*If address exists*/}
            {addressList.map((address) => {
                return (
                    <AddressCard
                        key={address.addressId}
                        addressId={address.addressId}
                        addressName={address.fullName}
                        address1={address.address1}
                        address2={address.address2}
                        city={address.city}
                        state={address.stateCode}
                        zip={address.zipCode}
                    />
                );
            })}

        </div>
    )
}
