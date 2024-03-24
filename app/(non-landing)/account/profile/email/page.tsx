/**
 * Like most other routes under profile. These routes simply allow us to modify some of the values that were given.
 * Note that there is no inherent server checks in place for uniqueness for emails in particular at the moment, so that
 * might be worth investigating a bit.
 */
import {auth} from "@/auth";
import EmailAdjustmentForm from "@/app/ui/account/profile/email/email-adjust-form";
import {fetchUserByUUID} from "@/app/lib/databaseActions";

export const metadata = {
    title: "Change Email",
}

export default async function ProfileDisplay() {
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
            <EmailAdjustmentForm
                oldValue={userObj.email}
                attrName="E-mail"
                boundUserId={authToken.user.userId}
            />
        </div>
    )
}