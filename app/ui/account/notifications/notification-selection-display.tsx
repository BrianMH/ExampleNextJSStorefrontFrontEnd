/**
 * Presents our users with their current set of notifications
 */
import {redirect} from "next/navigation";
import {ChevronLeftIcon} from "@heroicons/react/24/solid";
import {fetchNotificationsByUser} from "@/app/lib/data";
import NotificationCard from "@/app/ui/account/notifications/notification-card";

export default async function NotificationSelectionDisplay(
    { userId } : { userId : string }
) {
    const notificationList = await fetchNotificationsByUser(userId);

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

            {/*If no addresses present*/}
            {notificationList.length === 0 ? (
                <div className="pt-4">
                    No notifications currently exist.
                </div>
            ) : <></>}

            {/*If address exists*/}
            {notificationList.map((curNotif) => {
                return (
                    <NotificationCard
                        key={`${curNotif.id}`}
                        notifyId={curNotif.id}
                        notifyName={curNotif.notifyFor.name}
                        enabled={curNotif.enabled}
                    />
                );
            })}
        </div>
    )
}