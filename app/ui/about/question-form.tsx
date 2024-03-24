'use client';

import {Button} from "@/app/ui/button";
import {useFormState} from "react-dom";
import {createMessage, MessageState} from "@/app/lib/databaseActions";
import {ArrowRightIcon} from "@heroicons/react/20/solid";
import {useEffect, useRef} from "react";

export default function UserForm() {
    const initialState : MessageState = {message: null, errors: {}};
    const formRef = useRef<HTMLFormElement>(null);
    const [state , dispatch] = useFormState(createMessage, initialState);

    useEffect(() => {
        if(formRef.current && !("errors" in state))
            formRef.current.reset();
    }, [state]);

    return (
        <div className="h-full bg-gray-100 p-10">
            <h1 className="text-4xl font-bold pb-5">Send Us A Message:</h1>

            <form ref={formRef} action={dispatch} className="grid grid-cols-[20%_80%]">
                <label className="m-3 font-bold text-2xl">Name</label>
                <input type="text" name="name" className="border-2 border-gray-300 m-3"/>

                {/*Error for name input*/}
                <div className="col-span-2" id="nameError" aria-live="polite" aria-atomic="true">
                    {state.errors?.name && state.errors.name.map((error: string) => (
                        <p className=" text-sm text-red-500" key={error}>{error}</p>
                    ))}
                </div>

                <label className="m-3 font-bold text-2xl">Email</label>
                <input type="text" name="email" className="border-2 border-gray-300 m-3"/>
                {/*Error for email input*/}
                <div className="col-span-2" id="nameError" aria-live="polite" aria-atomic="true">
                    {state.errors?.email && state.errors.email.map((error: string) => (
                        <p className="text-sm text-red-500" key={error}>{error}</p>
                    ))}
                </div>

                <label className="m-3 font-bold text-2xl">Subject</label>
                <input type="text" name="subject" className="border-2 border-gray-300 m-3"/>
                {/*Error for subject input*/}
                <div className="col-span-2" id="nameError" aria-live="polite" aria-atomic="true">
                    {state.errors?.subject && state.errors.subject.map((error: string) => (
                        <p className="text-sm text-red-500" key={error}>{error}</p>
                    ))}
                </div>

                <label className="m-3 font-bold text-2xl">Message</label>
                <textarea name="message" className="border-2 border-gray-300 m-3 h-[10rem]"></textarea>
                {/*Error for message input*/}
                <div className="col-span-2" id="nameError" aria-live="polite" aria-atomic="true">
                    {state.errors?.message && state.errors.message.map((error: string) => (
                        <p className="mb-2 text-sm text-red-500" key={error}>{error}</p>
                    ))}
                </div>

                <div className="col-span-2 flex flex-row align-middle justify-center">
                    <Button className="text-xl" type="submit">
                        Submit Inquiry <ArrowRightIcon className="ml-2 h-5 w-5 text-gray-50"/>
                    </Button>
                </div>

                {/* Below all elements we can then put the response */}
                <div className="col-span-2 text-center text-sm pt-3">
                    {
                        state.errors?.message ?
                            (<p className="text-red-500">{state.message}</p>) :
                            (<p className="text-green-600">{state.message}</p>)
                    }
                </div>
            </form>
        </div>
    )
}