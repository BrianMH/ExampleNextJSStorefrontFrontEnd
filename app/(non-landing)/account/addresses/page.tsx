/**
 * Allows a user to add/delete/modify all of their saved addresses.
 */
import {auth} from "@/auth";
import AddressSelectionDisplay from "@/app/ui/account/addresses/address-selection-display";

export default async function AddressesOverview() {

    // grab our auth param so that we can consider it for the auth
    const authToken = await auth();

    // Since we must be authorized (if something looks off then throw an error immediately)
    if(!authToken || !authToken.user)
        throw new Error("Something went wrong with authenticated user. Try logging out and back in.")

    return (
        <div className="flex flex-col items-center w-full h-full text-center">
            <AddressSelectionDisplay userId={authToken.user.userId}/>
        </div>
    )
}