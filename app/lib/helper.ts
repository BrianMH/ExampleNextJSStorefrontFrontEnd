/**
 * Contains some of the helper functions that would be used anywhere in the application
 */

/**
 * Helper function to convert a 24 hour HH:MM time to a JS object
 */
export function convert24HrTimeStringToDate(inputTimeString: string) {
    const toChange = new Date();
    const [passedHr, passedMin] = inputTimeString.split(":");

    // change our object
    toChange.setUTCHours(Number(passedHr), Number(passedMin));

    // and return
    return toChange;
}