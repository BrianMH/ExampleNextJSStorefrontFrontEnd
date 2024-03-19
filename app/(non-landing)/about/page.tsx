/**
 * The contact page for the store. Contains basic information regarding emails, phone numbers, and even a map to represent
 * a location.
 */
import StoreHours from "@/app/ui/about/store-hours";

export default function Page() {
    return (
        <>
            <div className="flex flex-col align-middle w-full h-full z-20">
                <div className="bg-gray-100 h-1/6 -mt-5 flex flex-col align-middle justify-center border-t-2 border-b-2">
                    <h1 className="text-[80px] font-extrabold text-center">Contact Us</h1>
                </div>
                <div className="bg-amber-100 flex flex-col align-middle justify-center text-xl text-center m-10">
                    <StoreHours />

                    <p>
                        Have any questions for us regarding item quotes, bulk pricing, or delivery options? Feel free to
                        send as a message using the form below or give us a call at the following number during store hours:
                    </p>
                    <p> xxx - xxx - xxxx </p>
                </div>
            </div>
        </>
    )
}