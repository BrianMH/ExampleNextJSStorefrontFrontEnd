/**
 * Holds all of our database operations to be performed on the server side
 */
'use server';

import {dummySchedule} from "@/app/lib/dummy-data";
import {z} from 'zod';
import {redirect} from "next/navigation";
import {makeLocalRequestWithData} from "@/app/lib/data";
import {AuthError} from "next-auth";
import {signIn} from "@/auth";
import {User} from "@/app/lib/definitions";
import {revalidatePath} from "next/cache";
import bcrypt from "bcrypt";
import * as fs from "fs";

/**
 * Returns the store hours (this is NOT database associated currently)
 */
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

/***************************************************************************************
                                    MESSAGE RELATED FUNCTIONS
 *************************************************************************************/

// message state
export type MessageState = {
    errors?: {
        message?: string[];
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
    message: z.string({
        required_error: "Please enter a message."
    }).min(10, {
        message: "Message must be at least 10 characters in length."
    }),
    date: z.string(),
})
const CreateMessage = MessageFormSchema.omit({id: true, date: true})

/**
 * Allows a user to create a message to be received by the inbox given contact form data
 * @param prevState
 * @param formData
 */
export async function createMessage(prevState : MessageState, formData : FormData) {
    const validatedFields = CreateMessage.safeParse({
        name: formData.get("name"),
        email: formData.get("email"),
        subject: formData.get("subject"),
        message: formData.get("message")
    })

    if(!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: "Missing fields. Failed to send message.",
        }
    }

    // then insert the data to the server via POST
    try {
        const relEndpoint = process.env.API_ENDPOINT_ROOT + "/messages/new_message";
        const response = await makeLocalRequestWithData(relEndpoint, "POST", true, validatedFields.data);

        // TODO: perhaps do some checking here?
    } catch(error) {
        return {
            message: "Failed to send message."
        };
    }

    return {
        message: "Submitted. Please wait 2-3 days for a response.",
    }
}

/***************************************************************************************
                    USER RELATED FUNCTIONS
 *************************************************************************************/

export type UserState = {
    errors?: {
        userId?: string[];
        email?: string[];
        username?: string[];
        screenName?: string[];
        password?: string[];
        avatarRef?: string[];
        role?: string[];
        confirm?: string[];
    };
    message?: string | null;
};

const UserFormSchema = z.object({
    userId: z.string(), // never changed so no validation required
    email: z.string().email(),
    username: z.string().min(6, {
        message: "Username must be longer than 6 characters."
    }),
    screenName: z.string(),
    password: z.string().min(6, {
        message: "Password must be at least 6 characters."
    }),
    avatarRef: z.string(),
    role: z.string(),
    confirm: z.string(),
})

// image params
const MAX_FILE_SIZE = 1000000;
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
const AvatarSchema = z.object({
    avatar: z.instanceof(File)
              .refine((file) => file?.size <= MAX_FILE_SIZE, {
                  message: `Max image size is 1MB.`,
              })
              .refine(file => ACCEPTED_IMAGE_TYPES.includes(file?.type), {
                  message: "Only .jpg, .jpeg, .png and .webp formats are supported.",
              }),
})

const AddUser = UserFormSchema.omit({userId: true, role: true, confirm: true, avatarRef: true});
const UpdateEmail = UserFormSchema.omit({username: true, screenName: true, role: true, password: true, avatarRef: true})
                                                                          .refine((data) => data.email === data.confirm,
                                                                              {
                                                                                        message: "Emails do not match.",
                                                                                        path: ["confirm"],
                                                                              });
const UpdateScreenName = UserFormSchema.omit({username: true, email: true, password: true, avatarRef: true, role: true, confirm: true});
const UpdatePassword = UserFormSchema.omit({email: true, username: true, screenName: true, avatarRef: true, role: true})
                                                                            .refine(data => data.password === data.confirm,
                                                                                {
                                                                                message: "Passwords do not match.",
                                                                                path: ["confirm"],
                                                                                })
const OldPassword = UserFormSchema.omit({userId: true, email: true, username: true, screenName: true, avatarRef: true, role: true, confirm: true});
const UpdateAvatar = UserFormSchema.omit({email: true, username: true, screenName: true, password: true, role: true, confirm: true});

/**
 * Saves our image to the images directory and returns the route corresponding to the image's location
 * @param userId
 * @param imageFile
 */
async function manageFileUpload(userId: string, imageFile: File) : Promise<string> {
    // make sure the path exists
    const imgPath = process.env.AVATAR_IMAGE_PATH + `/${userId}/`;

    // and write to file async
    const fileWritePromise : Promise<string> = fs.promises.rm(imgPath, {recursive: true}).catch(console.log)
        .then(
            () => fs.promises.mkdir(imgPath, {recursive: true}).catch(console.log))
        .then(
            async () => fs.promises.writeFile(imgPath + imageFile.name, Buffer.from(await imageFile.arrayBuffer())))
        .then(
            () => Promise.resolve(`${userId}/${imageFile.name}`)
        );

    return fileWritePromise;
}

/**
 * Performs the user avatar update (via href linking)
 * @param userId
 * @param prevState
 * @param formData
 */
export async function updateUserAvatar(userId: string, prevState: UserState, formData: FormData) {
    // before passing our ref, we need to manage the file upload
    const validatedAvatar = AvatarSchema.safeParse({
        avatar: formData.get("avatar"),
    });
    if(!validatedAvatar.success) {
        return {
            message: "Improper file uploaded.",
        }
    }

    // Now we can convert it to a local file and pass the path back to the server for handling (this could be S3 based
    // in the future) [NOTE THAT THIS IS A RELATIVE PATH AT THIS POINT]
    const newImagePath = await manageFileUpload(userId, validatedAvatar.data.avatar);

    const validatedFields = UpdateAvatar.safeParse({
        userId: userId,
        avatarRef: newImagePath,
    });

    if(!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: "Missing fields. Cannot apply changes.",
        };
    }

    // then insert the data to the server via POST
    try {
        const relEndpoint = process.env.API_ENDPOINT_ROOT + "/api/users/update";
        const response = await makeLocalRequestWithData(relEndpoint, "PATCH", true, validatedFields.data);

        if(response?.success && response.success === false)
            return {
                errors: {},
                message: "A problem occurred on the server during operation."
            };
    } catch(error) {
        return {
            message: "Failed to apply changes to user. Is the server available?"
        };
    }

    revalidatePath('/account/profile/avatar-ref');
    redirect('/account/profile');

    // This will never be reached, but it does shut the interpreter up about typing issues
    return prevState;
}

/**
 * Password update, which requires a bit more effort to perform due to bcrypt comparisons between the old and the passed
 * old password.
 * @param userId
 * @param prevState
 * @param formData
 */
export async function updateUserPassword(userId: string, prevState: UserState, formData: FormData) {
    // for passwords, first validate the new inputs
    const validatedFields = UpdatePassword.safeParse({
        userId: userId,
        password: formData.get("password"),
        confirm: formData.get("confirm")
    });

    // but we also have an old password we need to validate
    const validatedOldPassword = OldPassword.safeParse({
        password: formData.get("old"),
    });

    if(!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: "Missing fields. Cannot apply changes.",
        };
    } else if(!validatedOldPassword.success) {
        return {
            message: "Current password unknown error...",
        };
    }

    // and then try and validate the current password before performing the change
    const relUser = await fetchUserByUUID(userId);
    if(!relUser) {
        return {
            message: "User does not exist.",
        }
    } else if(!(await bcrypt.compare(validatedOldPassword.data.password, relUser.password))) {
        return {
            message: "Current password mismatch.",
        }
    }

    // then insert the data to the server via POST
    try {
        const relEndpoint = process.env.API_ENDPOINT_ROOT + "/api/users/update";
        const response = await makeLocalRequestWithData(relEndpoint, "PATCH", true, validatedFields.data);

        if(response?.success && response.success === false)
            return {
                errors: {},
                message: "A problem occurred on the server during operation."
            };
    } catch(error) {
        return {
            message: "Failed to apply changes to user. Is the server available?"
        };
    }

    revalidatePath('/account/profile/password');
    redirect('/account/profile');

    // This will never be reached, but it does shut the interpreter up about typing issues
    return prevState;
}

/**
 * Performs the user email update and checks the response payload
 * @param userId
 * @param prevState
 * @param formData
 */
export async function updateUserEmail(userId: string, prevState: UserState, formData: FormData) {
    const validatedFields = UpdateEmail.safeParse({
        userId: userId,
        email: formData.get("email"),
        confirm: formData.get("confirm")
    });

    if(!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: "Missing fields. Cannot apply changes.",
        };
    }


    // then insert the data to the server via POST
    try {
        const relEndpoint = process.env.API_ENDPOINT_ROOT + "/api/users/update";
        const response = await makeLocalRequestWithData(relEndpoint, "PATCH", true, validatedFields.data);

        if(response?.success && response.success === false)
            return {
                errors: {},
                message: "A problem occurred on the server during operation."
            };
    } catch(error) {
        return {
            message: "Failed to apply changes to user. Is the server available?"
        };
    }

    revalidatePath('/account/profile/email');
    redirect('/account/profile');

    // This will never be reached, but it does shut the interpreter up about typing issues
    return prevState;
}

/**
 * Performs the user screen name update and checks the response payload
 * @param userId
 * @param prevState
 * @param formData
 */
export async function updateUserScreenName(userId: string, prevState: UserState, formData: FormData) {
    const validatedFields = UpdateScreenName.safeParse({
        userId: userId,
        screenName: formData.get("screenName"),
    });

    if(!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: "Missing fields. Cannot apply changes.",
        };
    }


    // then insert the data to the server via POST
    try {
        const relEndpoint = process.env.API_ENDPOINT_ROOT + "/api/users/update";
        const response = await makeLocalRequestWithData(relEndpoint, "PATCH", true, validatedFields.data);

        if(response?.success && response.success === false)
            return {
                errors: {},
                message: "A problem occurred on the server during operation."
            };
    } catch(error) {
        return {
            message: "Failed to apply changes to user. Is the server available?"
        };
    }

    revalidatePath('/account/profile/screen-name');
    redirect('/account/profile');

    // This will never be reached, but it does shut the interpreter up about typing issues
    return prevState;
}

/**
 * Fetches a user object from the database
 * @param userId the user's UUID to acquire
 */
export async function fetchUserByUUID(userId: string) : Promise<User|null> {
    try {
        const relEndpoint = process.env.API_ENDPOINT_ROOT + `/api/users/${userId}`;
        const response = await makeLocalRequestWithData(relEndpoint, "GET", true);

        return response;
    } catch(error) {
        console.log("Failed to fetch user: ", error);
        return null;
    }
}

/**
 * This is used to allow our form to communicate with the authorization API
 *
 * @param prevState contains state errors
 * @param formData the form data to be retrieved.
 */
export async function authenticate(
    prevState: string | undefined,
    formData: FormData,
) {
    try {
        await signIn('credentials', formData);
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case 'CredentialsSignin':
                    return 'Invalid credentials.';
                default:
                    return 'Something went wrong.';
            }
        }
        throw error;
    }
}

/**
 * While above only deals with authentication, this function first persists the user
 * to the database (waits for the response), and then performs the registration.
 *
 * @param prevState
 * @param formData
 */
export async function addUserAndAuthenticate(
    prevState: string | undefined,
    formData: FormData,
) {
    // first we need to persist the user to the database using our FormData
    const validatedFields = AddUser.safeParse({
        email: formData.get("email"),
        username: formData.get("username"),
        screenName: formData.get("screenName"),
        password: formData.get("password"),
    });

    if(!validatedFields.success) {
        console.log("Failed to process input: ", validatedFields.error.flatten().fieldErrors);
        return "Improperly formatted input field"
    }

    try {
        // we should encrypt user password before sending it out to the server
        validatedFields.data.password = await bcrypt.hash(validatedFields.data.password, 11);

        const relEndpoint = process.env.API_ENDPOINT_ROOT + '/api/users/add';
        const response = await makeLocalRequestWithData(relEndpoint, "POST", true, validatedFields.data);

        // make sure our response is properly formatted before continuing login
        if("message" in response) {
            console.log(response["message"]);
            return "Error on user creation..."
        }
    } catch(error) {
        console.log("Failed to create user. Aborting due to :", error);
        return "Failed to create user due to database error.";
    }

    // And now we can proceed to begin authentication
    return await authenticate(undefined, formData);
}

/***************************************************************************************
                                    ADDRESS RELATED FUNCTIONS
 *************************************************************************************/

export type AddressState = {
    errors?: {
        addressId?: string[];
        fullName?: string[];
        address1?: string[];
        address2?: string[];
        city?: string[];
        stateCode?: string[];
        zipCode?: string[];
        extraInfo?: string[];
        queryUser?: string[];
    };
    message?: string | null;
};

const AddressFormSchema = z.object({
    addressId: z.coerce.string(),
    fullName: z.string(),
    address1: z.string(),
    address2: z.string().optional(),
    city: z.string(),
    stateCode: z.string().length(2, {
        message: "State code must be used (2 characters)",
    }),
    zipCode: z.string().length(5, {
        message: "Zip code must be 5 digits long.",
    }),
    extraInfo: z.string().optional(),

    queryUser: z.string(),
});

const AddAddress = AddressFormSchema.omit({addressId: true});
const UpdateAddress = z.optional(AddressFormSchema.omit({queryUser: true}));

/**
 * Update's a user's address given form data
 * @param addressId
 * @param prevState
 * @param formData
 */
export async function updateUserAddress(addressId: string, prevState: AddressState, formData: FormData) {
    const validatedFields = UpdateAddress.safeParse({
        addressId: addressId,
        fullName: formData.get("addressName"),
        address1: formData.get("address1"),
        address2: formData.get("address2"),
        city: formData.get("city"),
        stateCode: formData.get("state"),
        zipCode: formData.get("zip"),
        extraInfo: formData.get("instructions"),
    });

    if(!validatedFields.success) {
        console.log(validatedFields.error.flatten());
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: "Missing fields. Cannot apply changes.",
        };
    }

    // then insert the data to the server via POST
    try {
        const relEndpoint = process.env.API_ENDPOINT_ROOT + "/api/addresses/patch";
        const response = await makeLocalRequestWithData(relEndpoint, "PATCH", true, validatedFields.data);

        if(response?.success && response.success === false)
            return {
                errors: {},
                message: "A problem occurred on the server during operation."
            };
    } catch(error) {
        return {
            message: "Failed to apply changes to user. Is the server available?"
        };
    }

    // no re-validation needed for this change as it's a new entry
    redirect('/account/addresses');

    // This will never be reached, but it does shut the interpreter up about typing issues
    return prevState;
}

/**
 * Removes an address from the database. Since the user has no direct access to this call, it's safe enough to
 * apply without additional matching
 * @param addressId
 * @param state
 * @param formData
 */
export async function deleteAddress(addressId: string, state: string|null, formData: FormData) : Promise<string|null> {
    try {
        const relEndpoint = process.env.API_ENDPOINT_ROOT + `/api/addresses/${addressId}`;
        await makeLocalRequestWithData(relEndpoint, "DELETE", true);

        revalidatePath('/account/addresses');
        redirect('/account/addresses');

        return "success";
    } catch(error) {
        console.log(error);
        return null;
    }
}

/**
 * Adds a given address to a specified user
 * @param userId
 * @param prevState
 * @param formData
 */
export async function addAddressToUser(userId: string, prevState: AddressState, formData: FormData) {
    const validatedFields = AddAddress.safeParse({
        queryUser: userId,

        fullName: formData.get("addressName"),
        address1: formData.get("address1"),
        address2: formData.get("address2"),
        city: formData.get("city"),
        stateCode: formData.get("state"),
        zipCode: formData.get("zip"),
        extraInfo: formData.get("instructions"),
    });

    if(!validatedFields.success) {
        console.log(validatedFields.error.flatten());
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: "Missing fields. Cannot apply changes.",
        };
    }

    // then insert the data to the server via POST
    try {
        const relEndpoint = process.env.API_ENDPOINT_ROOT + "/api/addresses/add";
        const response = await makeLocalRequestWithData(relEndpoint, "POST", true, validatedFields.data);

        if(response?.success && response.success === false)
            return {
                errors: {},
                message: "A problem occurred on the server during operation."
            };
    } catch(error) {
        return {
            message: "Failed to apply changes to user. Is the server available?"
        };
    }

    // no re-validation needed for this change as it's a new entry
    redirect('/account/addresses');

    // This will never be reached, but it does shut the interpreter up about typing issues
    return prevState;
}

/***************************************************************************************
                            NOTIFICATION RELATED FUNCTIONS
 *************************************************************************************/
/**
 * Asks our database to change the enabled element of the notification
 * @param notifId
 * @param toChangeTo
 * @param state
 * @param formData
 */
export async function toggleNotifications(notifId: string, toChangeTo: boolean, state: string|null, formData: FormData) : Promise<string|null> {
    try {
        const relEndpoint = process.env.API_ENDPOINT_ROOT + `/api/notifications/${notifId}`;
        await makeLocalRequestWithData(relEndpoint, "PATCH", true, {enabled: toChangeTo});

        revalidatePath('/account/notifications');

        return "success";
    } catch(error) {
        console.log(error);
        return null;
    }
}

/**
 * Asks our database to delete a given notification based on the passed id.
 * @param notifId
 * @param state
 * @param formData
 */
export async function deleteNotification(notifId: string, state: string|null, formData: FormData) : Promise<string|null> {
    try {
        const relEndpoint = process.env.API_ENDPOINT_ROOT + `/api/notifications/${notifId}`;
        await makeLocalRequestWithData(relEndpoint, "DELETE", true);

        revalidatePath('/account/notifications');

        return "success";
    } catch(error) {
        console.log(error);
        return null;
    }
}