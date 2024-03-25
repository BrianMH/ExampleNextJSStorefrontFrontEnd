/**
 * Management page for notifications. This one isn't really that complex either since functionally
 * it'd be the same as the addresses page, but with additional notifications only being generated when
 * the user desires it to be done on the products page.
 *
 * TODO: Implement notification button for specific values on the products page
 */
import NotificationSelectionDisplay from "@/app/ui/account/notifications/notification-selection-display";
import {auth} from "@/auth";

export const metadata = {
    title: "Notifications",
}

export default async function NotificationPage() {
    const authToken = await auth();

    if(!authToken || !authToken.user)
        throw new Error("Failed to identify user. Is the database properly connected?");

    return (
        <div className="flex flex-col items-center pb-10 w-full h-full text-center">
            <NotificationSelectionDisplay userId={authToken.user.userId}/>
        </div>
    )
}