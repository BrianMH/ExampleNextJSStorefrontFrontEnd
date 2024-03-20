/**
 * A widget that contacts the server-end in order to find the hours of operation for the store.
 */
'use server';

import {getStoreHours} from "@/app/lib/databaseActions";

export default async function StoreHours() {
    // TODO: Change this to manipulate data from the server
    const storeHours = await getStoreHours();

    // Then we can collect some data that we will need to use
    const curTime = new Date();
    const relevantDate = storeHours.find((givenDayHours) =>
        givenDayHours.oHour.getUTCDay() == curTime.getUTCDay());

    // Then perform type checking and create our flag for the hours
    if(relevantDate == null) {
        throw Error("Passed in dates are missing values.");
    }
    const isCurrentlyOpen = (curTime >= relevantDate.oHour) && (curTime <= relevantDate.cHour);


    return (
        <div className="flex flex-col p-5 justify-center">
            <div className="flex flex-row justify-around w-full border-2 border-gray-400 p-5 bg-gray-100">
                <p className="font-bold">Business Hours</p>
                <p className={`${isCurrentlyOpen ? "text-green-800" : "text-red-800"} font-bold`}>
                    {`${isCurrentlyOpen ? "Open":"Closed"}`}
                </p>
            </div>
            <div className="flex flex-col w-full border-2 border-gray-400 p-5">
                {storeHours.map((givenDayHours) => {

                    return (
                        <div key={givenDayHours.day} className="flex flex-row justify-between">
                            <p className="mr-8 font-bold">
                                {givenDayHours.day}
                            </p>
                            <p className={`${givenDayHours.closed ? "text-red-800" : ""}`}>
                                {`${givenDayHours.closed ? "Closed" : `${givenDayHours.oHour.toLocaleTimeString([], {hour: 'numeric', minute:'2-digit'})} - ${givenDayHours.cHour.toLocaleTimeString([], {hour: 'numeric', minute:'2-digit'})}`}`}
                            </p>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
