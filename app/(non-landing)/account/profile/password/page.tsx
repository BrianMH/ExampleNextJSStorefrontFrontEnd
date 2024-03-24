/**
 * The same as the others, but this time to adjust the password (which might require a bit more care due to bcrypt)
 */
import {auth} from "@/auth";
import PasswordAdjustForm from "@/app/ui/account/profile/password/password-adjust-form";

export const metadata = {
    title: "Change Password",
}

export default async function ProfileDisplay() {
    // grab our auth param so that we can consider it for the auth
    const authToken = await auth();

    // Since we must be authorized (if something looks off then throw an error immediately)
    if(!authToken || !authToken.user)
        throw new Error("Something went wrong with authenticated user. Try logging out and back in.");

    return (
        <div className="flex flex-col items-center w-full h-full text-center">
            {/*  We have the user account panel here (along with an optional link to the dashboard if admin  */}
            <PasswordAdjustForm
                attrName="Password"
                boundUserId={authToken.user.userId}
            />
        </div>
    )
}