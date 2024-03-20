'use server';
/**
 * Uses the GMaps API in order to show where the store is located
 */
import { dummySchedule } from "@/app/lib/dummy-data";
import { STORE_ADDRESS } from "@/app/lib/constants";

export default async function StoreLocation() {
    // TODO: Replace this with proper server-side information
    const storeHours = dummySchedule;

    return (
        <div className="flex flex-col h-[500px] md:w-1/4">
            <div className="text-center w-full">
                <p className="font-bold">Come Visit Us In-Person At:</p>
                <p className="text-lg -mb-1">{STORE_ADDRESS.Address0}</p>
                <p className="text-lg -mb-1">{STORE_ADDRESS.Address1}</p>
                <p className="text-lg">{STORE_ADDRESS.Address2}</p>
            </div>
            <iframe
                className="w-full h-full border-2 border-gray-900 z-20"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                src={`https://www.google.com/maps/embed/v1/place?key=${process.env.GMAPS_API_KEY}&q=404+E+Pico+Blvd`}
            />
        </div>
    )
}