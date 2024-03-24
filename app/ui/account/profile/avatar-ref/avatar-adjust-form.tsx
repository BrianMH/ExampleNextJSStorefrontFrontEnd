'use client';

import {redirect} from "next/navigation";
import {ChevronLeftIcon, UserCircleIcon} from "@heroicons/react/24/solid";
import {Button} from "@/app/ui/button";
import {useFormState, useFormStatus} from "react-dom";
import {updateUserAvatar, UserState} from "@/app/lib/databaseActions";

/**
 * Currently, the avatar feature simply takes external links to avatars and treats it as valid, but this can be modified
 * to contain either the uploaded blobs or some other method that can at least be cached server side without issue.
 */

export default function AvatarAdjustmentForm(
    {
        attrName,
        boundUserId,
    }
        :
        {
            attrName: string;
            boundUserId: string;
        }
) {
    const initialState : UserState = {message: null, errors: {}};
    const [state , dispatch] = useFormState(updateUserAvatar.bind(null, boundUserId), initialState);

    return (
        <div className="flex flex-col align-middle justify-center bg-gray-100 w-[30%] p-10 rounded-b-lg">
            {/* Our return button can be on top for this time */}
            <form
                action={async () => {
                    redirect('/account/profile')
                }}>
                <button
                    className="flex relative h-[60px] bg-gray-300 w-full grow items-center justify-center gap-2 rounded-md p-3 text-lg font-bold text-gray-800 hover:bg-gray-800 hover:text-white md:flex-none md:justify-start md:p-2 md:px-3">
                    <ChevronLeftIcon className="w-6"/>
                    <div>Profile</div>
                </button>
            </form>

            {/*  We then have another form down over here that manages the new request */}
            <form
                action={dispatch}
            >
                {/* Shows us what the attribute we're modifying is */}
                <div
                    className="h-auto w-full text-center grow items-center justify-center gap-2 rounded-md p-3 text-xl mt-3 font-bold text-gray-800 md:flex-none md:justify-start md:p-2 md:px-3">
                    Currently Modifying : {attrName}
                </div>

                <div className="col-span-2" id="nameError" aria-live="polite" aria-atomic="true">
                    <p className="text-sm mt-2 text-red-500">{state.message}</p>
                </div>

                <label
                    className="mb-3 mt-5 block text-xl font-medium text-gray-900"
                    htmlFor="avatar"
                >
                    New {attrName}
                </label>
                <div className="relative">
                    <input
                        className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                        id="avatar"
                        type="file"
                        name="avatar"
                        accept="image/*"
                        required
                    />
                    <UserCircleIcon
                        className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900"/>
                </div>

                <div className="text-sm pt-2 italic text-black">
                    Restrictions: 1MB Limit
                </div>

                <div id="nameError" aria-live="polite" aria-atomic="true">
                    {state.errors?.avatarRef && state.errors.avatarRef.map((error: string) => (
                        <p className="text-sm mt-2 text-red-500" key={error}>{error}</p>
                    ))}
                </div>

                {/*  And then we have our submit button  */}
                <div className="flex flex-row w-full justify-center">
                    <SubmitButton/>
                </div>

            </form>
        </div>
    )
}

function SubmitButton() {
    const {pending} = useFormStatus();

    return (
        <Button
            className="mt-10 h-[60px] w-32"
            type="submit"
            aria-disabled={pending}
        >
            <p className="text-center w-full text-lg">Submit</p>
        </Button>
    );
}