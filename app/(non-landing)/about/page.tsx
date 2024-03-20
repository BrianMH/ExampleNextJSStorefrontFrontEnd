/**
 * The contact page for the store. Contains basic information regarding emails, phone numbers, and even a map to represent
 * a location.
 */
import StoreHours from "@/app/ui/about/store-hours";
import StoreLocation from "@/app/ui/about/store-locator";
import {STORE_NUMBER} from "@/app/lib/constants";
import UserForm from "@/app/ui/about/question-form";

export const metadata = {
    title: "Contact",
}

export default function Page() {
    return (
        <>
            <div className="flex flex-col align-middle w-full h-full">
                <div className="bg-gray-100 h-fit -mt-5 flex flex-col align-middle justify-center border-t-2 border-b-2">
                    <h1 className="text-[80px] font-extrabold text-center">Contact Us</h1>
                </div>
                <div className="flex flex-col align-middle justify-center text-xl text-center m-10">
                    <div className="flex flex-col md:flex-row align-middle justify-evenly mt-6 mb-20">
                        <StoreHours />
                        <StoreLocation />
                    </div>

                    <div className="flex flex-col align-middle md:pl-[20%] md:pr-[20%]">
                        <p>
                            Have any questions for us regarding item quotes, bulk pricing, or delivery options? Feel
                            free to
                            send us a message using the form below or give us a call at the following number during
                            listed store hours:
                        </p>
                        <p className="text-3xl">{STORE_NUMBER}</p>

                        {/*  And we can place a form the user will use to send a message  */}
                        <div className="w-full pt-5">
                            <UserForm />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}