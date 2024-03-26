/**
 * TODO: Implement the [prodid] modification page for the dashbaord
 */
export default async function ProductEditPage ( { params } : { params : {catId : string; prodId: string }}) {
    return (
        <>
            <p>Viewing page corresponding to...</p>
            <p>catId : {params.catId}</p>
            <p>prodId: {params.prodId}</p>
        </>
    );
}