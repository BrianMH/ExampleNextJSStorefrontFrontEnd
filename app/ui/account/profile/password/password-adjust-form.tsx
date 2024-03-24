'use client';

import {redirect} from "next/navigation";
import {ChevronLeftIcon} from "@heroicons/react/24/solid";
import {AtSymbolIcon} from "@heroicons/react/24/outline";
import {Button} from "@/app/ui/button";
import {useFormState, useFormStatus} from "react-dom";
import {updateUserPassword, UserState} from "@/app/lib/databaseActions";

/**
 * Unlike before, for the password we will also require the user to submit the old password in order to commit to
 * the change to the new one. Security will be the only reason this is the case.
 */

export default function PasswordAdjustForm(
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
    const [state , dispatch] = useFormState(updateUserPassword.bind(null, boundUserId), initialState);

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
                {/* General error display */}
                <div className="col-span-2" id="nameError" aria-live="polite" aria-atomic="true">
                    <p className="text-sm mt-2 text-red-500">{state.message}</p>
                </div>

                {/* Shows us what the attribute we're modifying is */}
                <div
                    className="h-auto w-full text-center grow items-center justify-center gap-2 rounded-md p-3 text-xl mt-3 font-bold text-gray-800 md:flex-none md:justify-start md:p-2 md:px-3">
                    Currently Modifying : {attrName}
                </div>

                <label
                    className="mb-3 mt-5 block text-xl font-medium text-gray-900"
                    htmlFor="old"
                >
                    Current Password
                </label>
                <div className="relative">
                    <input
                        className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                        id="old"
                        type="password"
                        name="old"
                        placeholder="Enter current password."
                        required
                    />
                    <AtSymbolIcon
                        className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900"/>
                </div>

                <label
                    className="mb-3 mt-5 block text-xl font-medium text-gray-900"
                    htmlFor="password"
                >
                    New Password
                </label>
                <div className="relative">
                    <input
                        className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                        id="password"
                        type="password"
                        name="password"
                        placeholder="Enter new password"
                        required
                    />
                    <AtSymbolIcon
                        className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900"/>
                </div>

                <div className="col-span-2" id="nameError" aria-live="polite" aria-atomic="true">
                    {state.errors?.password && state.errors.password.map((error: string) => (
                        <p className="text-sm mt-2 text-red-500" key={error}>{error}</p>
                    ))}
                </div>

                <label
                    className="mb-3 mt-5 block text-xl font-medium text-gray-900"
                    htmlFor="confirm"
                >
                    Confirm E-mail
                </label>
                <div className="relative">
                    <input
                        className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                        id="confirm"
                        type="password"
                        name="confirm"
                        placeholder="Re-enter new password."
                        required
                    />
                    <AtSymbolIcon
                        className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900"/>
                </div>

                <div className="col-span-2" id="nameError" aria-live="polite" aria-atomic="true">
                    {state.errors?.confirm && state.errors.confirm.map((error: string) => (
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