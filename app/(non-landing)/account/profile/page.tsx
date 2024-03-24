import {auth} from "@/auth";
import WelcomeHeader from "@/app/ui/account/welcome-header";
import UserProfileDisplay from "@/app/ui/account/profile/user-settings-display";

/**
 * Presents a user with their current profile settings
 */
export const metadata = {
    title: "Profile",
}

export default async function ProfileDisplay() {
    // grab our auth param so that we can consider it for the auth
    const authToken = await auth();

    // Since we must be authorized (if something looks off then throw an error immediately)
    if(!authToken || !authToken.user)
        throw new Error("Something went wrong with authenticated user. Try logging out and back in.")

    return (
        <div className="flex flex-col items-center w-full h-full text-center">
            {/*  We have the user account panel here (along with an optional link to the dashboard if admin  */}
            <UserProfileDisplay userId={authToken.user.userId} />
        </div>
    )
}