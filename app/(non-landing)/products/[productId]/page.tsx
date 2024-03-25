/**
 * Represents the view page of a particular product identified by a certain product ID
 */

export const metadata = {
    title: "Product View",
}

export default async function ProductViewpage(
    { params }
        : { params: { productId: string } }) {
    return (
        <div className="h-full w-full p-6 border-2 border-black">
            <p>Viewing product page of product with ID - {params.productId}</p>
        </div>
    )
}