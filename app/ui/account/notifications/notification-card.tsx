'use client';
/**
 * A card that represents a single entry of a user's address.
 */
import {Button} from "@/app/ui/button";
import {deleteNotification, toggleNotifications} from "@/app/lib/databaseActions";
import {useFormState} from "react-dom";
import {BellAlertIcon, BellSlashIcon} from "@heroicons/react/24/solid";

export default function NotificationCard(
    { notifyId, notifyName, enabled }
        : { notifyId : string, notifyName : string, enabled : boolean }
) {
    // we can create a functor to apply to our button here
    const [formState, deleteDispatch] = useFormState(deleteNotification.bind(null, notifyId), null);
    const [toggleState, toggleDispatch] = useFormState(toggleNotifications.bind(null, notifyId, !enabled), null);

    return (
        <div
            className="flex relative h-fit grow items-center justify-center gap-2 rounded-md p-3 text-lg font-medium text-gray-800 hover:bg-gray-800 hover:text-white md:flex-none md:justify-start md:p-2 md:px-3">
            <div className="flex-1 flex-row relative ">
                <div className="flex flex-row w-full">
                    <div className="flex flex-col align-middle justify-center">
                        <BellAlertIcon className={"w-6 "+(enabled ? "" : "collapse")}/>
                        <BellSlashIcon className={"w-6 "+(enabled ? "collapse" : "")}/>
                    </div>

                    <div className="flex-1 flex-col align-middle justify-center">
                        <p className="font-bold">{notifyName}</p>
                        <p className={enabled ? "text-green-700" : "text-red-700"}>{enabled ? "On" : "Off"}</p>
                    </div>
                </div>
            </div>

            <div className="flex flex-col align-middle justify-center z-20">
                <form
                    action={toggleDispatch}
                >
                    <Button
                        className="bg-blue-600 hover:bg-blue-800"
                        type="submit"
                    >
                        {enabled ? "Turn Off":"Turn On"}
                    </Button>
                </form>
            </div>

            {/* Delete Button just in case user wants to delete entry */}
            <div className="flex flex-col align-middle justify-center z-20">
                <form
                    action={deleteDispatch}
                >
                    <Button
                        className="bg-red-700 hover:bg-red-900"
                        type="submit"
                    >
                        Delete
                    </Button>
                </form>
            </div>
            <div className="w-[80%] absolute border-gray-300 border-2 bottom-0 left-[10%]"></div>
        </div>
    )
}