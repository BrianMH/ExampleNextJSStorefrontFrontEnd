/**
 * Holds all of our database operations to be performed on the server side
 */
'use server';

import {dummySchedule} from "@/app/lib/dummy-data";
import {z} from 'zod';
import {redirect} from "next/navigation";

export async function getStoreHours() {
    // first we get the results from the database
    // TODO: Replace this with database logic
    const databaseTimes = dummySchedule;

    // Then we can convert it to something we can compare using the Date object since we will only store HH:MM format
    // times
    return databaseTimes.map((givenEntry) => {
        // we need to create Date objects for the oHr and cHr times
        const convertedOHr = new Date();
        const [oHourHr, oHourMin] = givenEntry.oHour.split(":");
        convertedOHr.setUTCHours(Number(oHourHr), Number(oHourMin), 0, 0);

        const convertedCHr = new Date();
        const [cHourHr, cHourMin] = givenEntry.cHour.split(":");
        convertedCHr.setUTCHours(Number(cHourHr), Number(cHourMin), 0, 0);

        return {day: givenEntry.day, oHour: convertedOHr, cHour: convertedCHr, closed: givenEntry.closed};
    });
}

// message state
export type MessageState = {
    errors?: {
        userMessage?: string[];
        name?: string[];
        email?: string[];
        subject?: string[];
    };
    message?: string | null;
};

// Create message schema
const MessageFormSchema = z.object({
    id: z.string(),
    name: z.string({
        required_error: "Please enter a name."
    }).trim().min(2, {
        message: "Please enter a valid name."
    }),
    subject: z.string({
        required_error: "Please enter a subject",
    }).min(5, {
        message: "Please use a more descriptive subject.",
    }),
    email: z.string({
        required_error: "Please enter an email."
    }).email({
        message: "Invalid email address."
    }),
    userMessage: z.string({
        required_error: "Please enter a message."
    }).min(10, {
        message: "Message must be at least 10 characters in length."
    }),
    date: z.string(),
})
const CreateMessage = MessageFormSchema.omit({id: true, date: true})

export async function createMessage(prevState : MessageState, formData : FormData) {
    const validatedFields = CreateMessage.safeParse({
        name: formData.get("name"),
        email: formData.get("email"),
        subject: formData.get("subject"),
        userMessage: formData.get("message")
    })

    if(!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: "Missing fields. Failed to send message.",
        }
    }

    // then insert the data to the server via POST
    try {
        
    } catch(error) {
        return {
            message: "Failed to send message."
        };
    }

    redirect('/about') // refresh page after sending message
}