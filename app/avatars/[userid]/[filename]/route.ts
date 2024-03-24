import * as fs from "fs";

/**
 * Defines a route under the database actions that allows the fetching of user avatars.
 *
 * TOOD: Work on middleware to allow only internal requests to the API
 */
export const dynamic = 'force-dynamic'; // force reload on request
export async function GET(request: Request,
                          { params } : { params: { userid: string; filename: string } }) {
    // first generate our relevant path
    const imageToReceive : string = process.env.AVATAR_IMAGE_PATH + `/${params.userid}/${params.filename}`;
    const imageType = imageToReceive.split(".").pop();

    // requested image is incorrect format
    if(!imageType) {
        return Response.error();
    }

    // load image now and return whatever we need
    return fs.promises.readFile(imageToReceive).catch(err => {
        console.log(err);
        return Response.error();
    }).then(imageBuff => {
        if(imageBuff instanceof Response)
            return imageBuff; // this isn't a buffer, but an error propagated downstream
        return new Response( imageBuff,
            {
                status: 200,
                headers: {
                    'Content-Type': `image/${imageType}`,
                    'Content-Length': String(imageBuff.length),
                }
            }
        );
    })
}