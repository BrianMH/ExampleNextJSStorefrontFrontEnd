'use client';

import {redirect} from "next/navigation";
import {ChevronLeftIcon, UserIcon} from "@heroicons/react/24/solid";
import {Button} from "@/app/ui/button";
import {useFormState, useFormStatus} from "react-dom";
import {updateUserScreenName, UserState} from "@/app/lib/databaseActions";

/**
 * Form used to modify given user e-mail (Note: this will be used as a template for all other change forms, so forgive the
 * redundancy as the operations don't seem to take well to generalization due to their client-sided nature)
 */

export default function ScreenNameAdjustmentForm(
    {
        oldValue,
        attrName,
        boundUserId,
    }
        :
        {
            oldValue : string;
            attrName: string;
            boundUserId: string;
        }
) {
    const initialState : UserState = {message: null, errors: {}};
    const [state , dispatch] = useFormState(updateUserScreenName.bind(null, boundUserId), initialState);

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

                <label
                    className="mb-3 mt-5 block text-xl font-medium text-gray-900"
                    htmlFor="old"
                >
                    Current {attrName}
                </label>
                <div className="relative">
                    <input
                        className="peer block w-full text-center rounded-md border bg-gray-100 text-gray-700 py-[9px] pl-10 text-sm outline-2"
                        id="old"
                        type="text"
                        name="old"
                        defaultValue={oldValue}
                        disabled={true}
                        aria-disabled={true}
                    />
                </div>

                <label
                    className="mb-3 mt-5 block text-xl font-medium text-gray-900"
                    htmlFor="email"
                >
                    New {attrName}
                </label>
                <div className="relative">
                    <input
                        className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                        id="screenName"
                        type="text"
                        name="screenName"
                        placeholder="Enter your email address"
                        required
                    />
                    <UserIcon
                        className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900"/>
                </div>

                <div className="col-span-2" id="nameError" aria-live="polite" aria-atomic="true">
                    {state.errors?.screenName && state.errors.screenName.map((error: string) => (
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