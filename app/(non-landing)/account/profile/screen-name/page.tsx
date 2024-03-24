/**
 * Modifies the screen name
 */
import {auth} from "@/auth";
import {fetchUserByUUID} from "@/app/lib/databaseActions";
import ScreenNameAdjustmentForm from "@/app/ui/account/profile/screen-name/name-adjust-form";

export const metadata = {
    title: "Change Name",
}

export default async function ScreenNameDisplay() {
    // grab our auth param so that we can consider it for the auth
    const authToken = await auth();

    // Since we must be authorized (if something looks off then throw an error immediately)
    if(!authToken || !authToken.user)
        throw new Error("Something went wrong with authenticated user. Try logging out and back in.");

    // in this particular case since we modify user parameters, we do need to acquire the user object itself from the
    // server
    const userObj = await fetchUserByUUID(authToken.user.userId);

    if(!userObj)
        throw new Error("Something went wrong with authenticated user. Try logging out and back in.");

    return (
        <div className="flex flex-col items-center w-full h-full text-center">
            {/*  We have the user account panel here (along with an optional link to the dashboard if admin  */}
            <ScreenNameAdjustmentForm
                oldValue={userObj.screenName}
                attrName="Screen Name"
                boundUserId={authToken.user.userId}
            />
        </div>
    )
}