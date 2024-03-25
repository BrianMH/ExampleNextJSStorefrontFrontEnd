/**
 * Holds the methods that will be returning all the desired values from the server
 */
import {unstable_noStore as noStore} from "next/cache";
import type {
    Address,
    Message,
    ProductCategory,
    ShortenedMessage,
    User,
    Notification,
    Product
} from "@/app/lib/definitions";

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
 * Fetches users but in a paged way that allows for querying
 * @param query
 * @param currentPage
 * @param pageSize
 */
export async function fetchPagedUsers(
    query: string,
    currentPage: number,
    pageSize: number = DEFAULT_PAGE_SIZE
) : Promise<User[]> {
    // because our pages are actually 0-indexed server side, we can go ahead and increment it here
    const actualPage = currentPage - 1;

    // fetch our paged values given our current page (and offset if passed)
    const relEndpoint: string = process.env.API_ENDPOINT_ROOT + `/api/users/paged/${pageSize}/${actualPage}?query=${query}`;

    // then access the endpoint
    return makeLocalRequestWithData(relEndpoint, "GET", true);
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

/**
 * Fetches the number of user pages present given a specific page size on the customers page
 * @param query
 * @param pageSize
 */
export async function fetchNumUserPages(
    query: string,
    pageSize: number = DEFAULT_PAGE_SIZE
) : Promise<number> {
    // first use our endpoint
    const relEndpoint: string = process.env.API_ENDPOINT_ROOT + `/api/users/paged/${pageSize}?query=${query}`;

    // then access endpoint like before
    return makeLocalRequestWithData(relEndpoint, "GET", true);
}

/**
 * Fetches a given address by its ID
 * @param addressId
 */
export async function fetchAddressById(
    addressId: string
): Promise<Address> {
    const relEndpoint: string = process.env.API_ENDPOINT_ROOT + `/api/addresses/${addressId}`;

    // then return the response
    const response = await makeLocalRequestWithData(relEndpoint, "GET", true);

    return response;
}

/**
 * Fetches a list of product categories available in the backend
 */
export async function fetchProductCategories() : Promise<ProductCategory[]> {
    const relEndpoint : string = process.env.API_ENDPOINT_ROOT + '/api/categories/all';

    // then return the response
    const response = await makeLocalRequestWithData(relEndpoint, "GET", true);

    return response;
}

/**
 * Fetches our products that fall under a given category
 * @param catId the category id to receive the products for
 */
export async function fetchCategoryWithProducts(
    catId : string
) : Promise<ProductCategory> {
    const relEndpoint : string = process.env.API_ENDPOINT_ROOT + `/api/categories/${catId}`;

    // then return the response
    const response = await makeLocalRequestWithData(relEndpoint, "GET", true);
    return response;
}

/**
 * Returns notifications associated with a given user
 * @param userId
 */
export async function fetchNotificationsByUser(
    userId: string
) : Promise<Notification[]> {
    const relEndpoint : string = process.env.API_ENDPOINT_ROOT + `/api/notifications/byUser/${userId}`;

    // then return response
    const response = await makeLocalRequestWithData(relEndpoint, "GET", true);
    return response;
}

/**
 * Returns the number of pages to be expected given products matching a query and category id
 * @param query
 * @param category
 * @param numPerPage
 */
export async function fetchNumberProductPages(
    query: string,
    category: string,
    numPerPage: number = 24
): Promise<number> {
    const relEndpoint : string = process.env.API_ENDPOINT_ROOT + `/api/products/paged/${numPerPage}?query=${query}` + (category ? `&catId=${category}` : '');

    // then return response
    const response = await makeLocalRequestWithData(relEndpoint, "GET", true);
    return response;
}


/**
 * Allows us to make a specialized query with the database in a paginated manner in order to return mathing Procuts
 * @param query
 * @param category
 * @param currentPage
 * @param numPerPage
 */
export async function fetchProductsWithQueryAndCategory(
    query: string,
    category: string,
    currentPage: number,
    numPerPage: number = 24
) : Promise<Product[]> {
    const actualPage = currentPage-1; // 0-indexed pages
    const relEndpoint : string = process.env.API_ENDPOINT_ROOT + `/api/products/paged/${numPerPage}/${actualPage}?query=${query}` + (category ? `&catId=${category}` : '');

    // then return response
    const response = await makeLocalRequestWithData(relEndpoint, "GET", true);
    return response;
}