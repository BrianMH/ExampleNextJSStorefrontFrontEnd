import {auth} from "@/auth";
import WelcomeHeader from "@/app/ui/account/welcome-header";

/**
 * Sticky banner for the products page as it will need a bit of inner navigation
 */
export default async function Layout({ children } : { children : React.ReactNode}) {
    // grab our auth param so that we can consider it for the auth
    const authToken = await auth();

    // Since we must be authorized (if something looks off then throw an error immediately)
    if(!authToken || !authToken.user)
        throw new Error("Something went wrong with authenticated user. Try logging out and back in.");

    return (
        <div className="flex flex-col align-middle w-full h-full">
            <div className="bg-gray-100 h-fit -mt-5 flex flex-col align-middle justify-center border-t-2 border-b-2">
                <h1 className="text-[80px] font-extrabold text-center">Account</h1>
            </div>
            <div className="flex-1 align-middle w-full h-full justify-center text-xl text-center">
                <div className="flex flex-col items-center w-full h-full text-center">
                    {/* Hello user */}
                    <WelcomeHeader userId={authToken.user.userId} />

                    {/* Relevant children */}
                    {children}
                </div>
            </div>
        </div>
    );
}