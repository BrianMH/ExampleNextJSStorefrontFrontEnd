/**
 * TODO: Implement the new product page
 */

export default async function ProductCreationPage( { params } : { params : { catId : string } }) {
    return (
        <>
            <p>Creation page for...</p>
            <p>catId : {params.catId}</p>
        </>
    )
}