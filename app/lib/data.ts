/**
 * Holds the methods that will be returning all the desired values from the server
 */
import {unstable_noStore as noStore} from "next/cache";
import type {Address, Message, ShortenedMessage, User} from "@/app/lib/definitions";

type RequestType = "POST" | "GET" | "DELETE" | "PATCH" | "PUT";
type PayloadType = Record<string, any> | null;
/**
 * Helper function to request an online attribute
 * @param url the endpoint to acquire data from
 * @param requestType the type of request to make
 * @param jsonResponse whether or not to expect a JSON object in the return value
 * @param data the data to convert to JSON to pass as the body to the server
 *
 * @return The response returned (or the body of the response if jsonResponse is true)
 */
export async function makeLocalRequestWithData(url: string, requestType: RequestType, jsonResponse: boolean = false, data: PayloadType = null) {
    noStore(); // prevent any caching of response

    let response = await fetch(url, {
        method: requestType,
        headers: {"Content-Type": "application/json"},
        ...(data && {body: JSON.stringify(data)})
    });

    try {
        if (jsonResponse)
            return response.json();
        else
            return response;
    } catch(error) {
        console.error("Database Error: ", error);
        throw new Error("Failed to generate a proper response...")
    }
}


const DEFAULT_PAGE_SIZE : number = 10;
/**
 * Fetches all messages with pagination
 *
 * @param query A filtering mechanism for the query
 * @param currentPage the page to retrieve (note that this is 1-indexed even though the API is 0-indexed!)
 * @param pageSize the size of the page to return
 *
 * @return a promise containing the relevant information
 */
export async function fetchPagedMessages(
    query: string,
    currentPage: number,
    pageSize: number = DEFAULT_PAGE_SIZE
) : Promise<ShortenedMessage[]> {
    // because our pages are actually 0-indexed server side, we can go ahead and increment it here
    const actualPage = currentPage - 1;

    // fetch our paged values given our current page (and offset if passed)
    const relEndpoint : string = process.env.API_ENDPOINT_ROOT + `/messages/paged/${pageSize}/${actualPage}?query=${query}`;

    // then access the endpoint
    return makeLocalRequestWithData(relEndpoint, "GET", true);
}

/**
 * And this fetches number of pages to use with pagination
 *
 * @param query The query for which to prompt the number of pages from
 * @param pageSize the size of the page to return
 */
export async function fetchNumPages(
    query: string,
    pageSize: number = DEFAULT_PAGE_SIZE
) : Promise<number> {
    // first use our endpoint
    const relEndpoint : string = process.env.API_ENDPOINT_ROOT + `/messages/paged/${pageSize}?query=${query}`;

    // then access endpoint like before
    return makeLocalRequestWithData(relEndpoint, "GET", true);
}

/**
 * Fetches all data of a particular message
 * @param msgId the id of the message to acquire
 * @return a promise containing the contents of the relevant message
 */
export async function fetchMessageById(
    msgId: string
) : Promise<Message|null> {
    // we use our endpoint again
    const relEndpoint : string = process.env.API_ENDPOINT_ROOT + `/messages/${msgId}`;

    // then return the single message
    const response = await makeLocalRequestWithData(relEndpoint, "GET", true);
    if('operationSuccess' in response) // this means it's an error response instead of the actual object
        return null;

    return response;
}

/**
 * Fetches a given user given their email. Since this is server-sided, there's no reason to shorten
 * the transmitted data until it becomes an issue.
 */
export async function fetchUserByEmail(
    email: string
) : Promise<User|null> {
    // again use our endpoint
    const relEndpoint : string = process.env.API_ENDPOINT_ROOT + `/api/users/email/${email}`;

    // then return the message
    const response = await makeLocalRequestWithData(relEndpoint, "GET", true);
    if('operationSuccess' in response)
        return null;

    return response;
}

/**
 * Fetches a list of addresses given a specific user.
 */
export async function fetchAddressesByUser(
    userId: string
): Promise<Address[]> {
    const relEndpoint : string = process.env.API_ENDPOINT_ROOT + `/api/addresses/byUser/${userId}`;

    // then return the message
    const response = await makeLocalRequestWithData(relEndpoint, "GET", true);

    return response;
}

export async function fetchAddressById(
    addressId: string
): Promise<Address> {
    const relEndpoint: string = process.env.API_ENDPOINT_ROOT + `/api/addresses/${addressId}`;

    // then return the response
    const response = await makeLocalRequestWithData(relEndpoint, "GET", true);

    return response;
}