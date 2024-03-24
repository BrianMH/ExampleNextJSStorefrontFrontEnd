/**
 * Edit page for the address entry. UI is pretty much shared between create and edit, the only difference is that edit
 * will receive some pre-filled entries due to having a form loaded up.
 */
import {auth} from "@/auth";
import {redirect} from "next/navigation";
import {ChevronLeftIcon} from "@heroicons/react/24/solid";
import UserAddressEditForm from "@/app/ui/account/addresses/address-form-with-defaults";
import {Address} from "@/app/lib/definitions";
import {fetchAddressById} from "@/app/lib/data";

export default async function EditAddressForm({ params } : { params : { id : string } }) {
    // grab our auth param so that we can consider it for the auth
    const authToken = await auth();
    const curAddress : Address = await fetchAddressById(params.id);

    // Since we must be authorized (if something looks off then throw an error immediately)
    if(!authToken || !authToken.user)
        throw new Error("Something went wrong with authenticated user. Try logging out and back in.");

    return (
        <div className="flex flex-col items-center w-full h-full text-center">
            <div className="flex flex-col align-middle justify-center bg-gray-100 w-[30%] p-10 rounded-b-lg -mb-5">
                <form
                    action={async () => {
                        'use server';
                        redirect('/account/addresses')
                    }}
                >
                    <button
                        className="flex relative h-[60px] bg-gray-300 w-full grow items-center justify-center gap-2 rounded-md p-3 text-lg font-bold text-gray-800 hover:bg-gray-800 hover:text-white md:flex-none md:justify-start md:p-2 md:px-3">
                        <ChevronLeftIcon className="w-6"/>
                        <div>Addresses</div>
                    </button>
                </form>

            </div>

            <UserAddressEditForm defaultFormVals={curAddress}/>
        </div>
    )
}