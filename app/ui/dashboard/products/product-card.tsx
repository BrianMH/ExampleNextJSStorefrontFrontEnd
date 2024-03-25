/**
 * Much in the same vein as the product category card, these product cards can be served also to the end-user to give
 * what is essentially a preview of the current product (along with the price).
 */
import Link from "next/link";
import Rating from "@/app/ui/dashboard/products/rating-widget";
import ImageWithLoader from "@/app/ui/dashboard/products/fake-image-loader";

// This is only used here because of the default chosen
const imageLoader = ({src, width, quality} : {src: string, width:number, quality?:number}) => {
    return `https://images.pexels.com/photos/${src}?auto=compress&cs=tinysrgb&w=${width}&dpr=1`
}

export default function ProductOverviewCard(
    { catId, prodId, prodName, prodDescr, prodOOS, prodIms, prodPrice, prodRating = 3, numRatings = 0, linkRef }
        : { catId : string; prodId: string; prodName: string; prodDescr: string; prodOOS: boolean; prodIms: string[]; prodPrice: number, prodRating: number, numRatings: number, linkRef: string }
) {
    // carousel was too annoying to implement, so just take the first image for now
    const firstImRef = prodIms.at(0);

    if(!firstImRef)
        throw Error("Image had no set images when they are required");

    return (
        <div className="border-2 border-gray-800 shadow-lg w-64 bg-transparent h-96 p-5 hover:bg-white/30">
            <Link
                href={linkRef}
                className="w-full h-full flex flex-col align-middle justify-end"
            >
                {/*In a normal card, we would put the image in here, but this is just a plus sign for our new one*/}
                <div className="flex-1 flex flex-col relative align-middle -z-10 justify-center w-full text-gray-800">
                    <ImageWithLoader imRef={firstImRef} catName={catId} />
                </div>

                <div className="flex flex-col bg-transparent -z-10 w-full">
                    <div className="overflow-clip text-sm text-gray-700">
                        {prodDescr}
                    </div>
                    <div className="text-lg">
                        {prodName}
                    </div>
                    <div className="pr-3 text-xl font-bold">
                        {`$${(prodPrice / 100).toFixed(2)}`}
                    </div>
                    <div className="h-[1rem] mt-1 w-full">
                        <Rating rating={prodRating} numRatings={numRatings}/>
                    </div>
                </div>
            </Link>
        </div>
    )
}