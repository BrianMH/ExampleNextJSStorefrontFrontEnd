import {auth} from "@/auth";
import WelcomeHeader from "@/app/ui/account/welcome-header";
import UserNavLinks from "@/app/ui/account/user-nav-links";

export const metadata = {
    title: "Account",
}

export default async function Page() {
    // grab our auth param so that we can consider it for the auth
    const authToken = await auth();

    // Since we must be authorized (if something looks off then throw an error immediately)
    if(!authToken || !authToken.user)
        throw new Error("Something went wrong with authenticated user. Try logging out and back in.")

    return (
        <div className="flex flex-col items-center w-full h-full text-center">
            {/*  We have the user account panel here (along with an optional link to the dashboard if admin  */}
            <UserNavLinks userRole={authToken.user.role} />
        </div>
    )
}