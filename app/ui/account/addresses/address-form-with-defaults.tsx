'use client';
import {AddressState, updateUserAddress} from "@/app/lib/databaseActions";
import {useFormState, useFormStatus} from "react-dom";
import {HomeModernIcon, MapIcon, MapPinIcon, PlusIcon, UserIcon} from "@heroicons/react/24/solid";
import {ExclamationCircleIcon, HomeIcon} from "@heroicons/react/24/outline";
import {Button} from "@/app/ui/button";
import {Address} from "@/app/lib/definitions";

/**
 * A form that allows the user to also set defaults (and is generally used for modifying current values).
 * @param boundUserId
 * @param defaultFormVals
 * @constructor
 */
export default function UserAddressEditForm(
    { defaultFormVals } : { defaultFormVals : Address }
) {
    console.log(defaultFormVals);
    const initialState : AddressState = {message: null, errors: {}};
    const [state , dispatch] = useFormState(updateUserAddress.bind(null, defaultFormVals.addressId), initialState);

    return (
        <form action={dispatch} className="space-y-3 w-[30%] mb-20">
            <div className="flex-1 rounded-lg bg-gray-100 px-10 pb-4">
                <h1 className="font-bold">
                    Modifying Address
                </h1>
                <div className="w-full">
                    <div>
                        <label
                            className="mb-3 mt-5 block font-medium text-gray-900"
                            htmlFor="addressName"
                        >
                            Full Name
                        </label>
                        <div className="relative">
                            <input
                                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                                id="addressName"
                                type="text"
                                name="addressName"
                                placeholder="Enter Name"
                                defaultValue={defaultFormVals.fullName}
                                required
                            />
                            <UserIcon
                                className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900"/>
                        </div>
                    </div>

                    <div className="mt-4">
                        <label
                            className="mb-3 mt-5 block font-medium text-gray-900"
                            htmlFor="address1"
                        >
                            Address 1
                        </label>
                        <div className="relative">
                            <input
                                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                                id="address1"
                                type="text"
                                name="address1"
                                placeholder="1234 Street Blvd"
                                defaultValue={defaultFormVals.address1}
                                required
                            />
                            <HomeIcon
                                className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900"/>
                        </div>

                        <div className="mt-4">
                            <label
                                className="mb-3 mt-5 block font-medium text-gray-900"
                                htmlFor="address2"
                            >
                                Address 2
                            </label>
                            <div className="relative">
                                <input
                                    className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                                    id="address2"
                                    type="text"
                                    name="address2"
                                    placeholder="Apt # / Suit #"
                                    defaultValue={defaultFormVals.address2 ? defaultFormVals.address2 : ""}
                                />
                                <HomeIcon
                                    className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900"/>
                            </div>
                        </div>

                        <div className="mt-4">
                            <label
                                className="mb-3 mt-5 block font-medium text-gray-900"
                                htmlFor="city"
                            >
                                City
                            </label>
                            <div className="relative">
                                <input
                                    className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                                    id="city"
                                    type="text"
                                    name="city"
                                    placeholder="City"
                                    defaultValue={defaultFormVals.city}
                                    required
                                />
                                <MapIcon
                                    className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900"/>
                            </div>
                        </div>

                        <div className="mt-4">
                            <label
                                className="mb-3 mt-5 block font-medium text-gray-900"
                                htmlFor="state"
                            >
                                State
                            </label>
                            <div className="relative">
                                <input
                                    className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                                    id="state"
                                    type="text"
                                    name="state"
                                    placeholder="State"
                                    defaultValue={defaultFormVals.stateCode}
                                    required
                                />
                                <MapIcon
                                    className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900"/>
                            </div>
                        </div>

                        <div className="mt-4">
                            <label
                                className="mb-3 mt-5 block font-medium text-gray-900"
                                htmlFor="zip"
                            >
                                Zip Code
                            </label>
                            <div className="relative">
                                <input
                                    className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                                    id="zip"
                                    type="text"
                                    name="zip"
                                    placeholder="Zip Code"
                                    defaultValue={defaultFormVals.zipCode}
                                    required
                                />
                                <MapPinIcon
                                    className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900"/>
                            </div>
                        </div>

                        <div className="mt-4">
                            <label
                                className="mb-3 mt-5 block font-medium text-gray-900"
                                htmlFor="instructions"
                            >
                                Extra Info
                            </label>
                            <div className="relative">
                                <input
                                    className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                                    id="instructions"
                                    type="text"
                                    name="instructions"
                                    defaultValue={defaultFormVals.extraInfo? defaultFormVals.extraInfo : ""}
                                    placeholder="Enter Additional Details Here"
                                />
                                <HomeModernIcon
                                    className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900"/>
                            </div>
                        </div>

                    </div>
                </div>

                <SubmitButton/>

                <div
                    className="flex h-8 items-end space-x-1 w-full justify-center align-middle"
                    aria-live="polite"
                    aria-atomic="true"
                >
                    {state.message && (
                        <>
                            <ExclamationCircleIcon className="h-5 w-5 text-red-500"/>
                            <p className="text-sm text-red-500">{state.message}</p>
                        </>
                    )}
                </div>
            </div>
        </form>
    );
}

function SubmitButton() {
    const {pending} = useFormStatus();

    return (
        <div className="flex flex-row w-full align-middle justify-center">
            <Button className="mt-8 w-fit pr-5" aria-disabled={pending}>
                <PlusIcon className="h-5 w-5 text-gray-50 mr-1"/> Save Address
            </Button>
        </div>
    );
}