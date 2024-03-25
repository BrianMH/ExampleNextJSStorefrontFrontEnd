/**
 * A stand-in for the square to select in order to create a new product.
 */
import Link from "next/link";
import {PlusCircleIcon} from "@heroicons/react/24/solid";
import Rating from "@/app/ui/dashboard/products/rating-widget";

export default function NewProductCard(
    { catId } : { catId : string })
{
    return (
        <div className="border-2 border-gray-800 shadow-lg w-64 bg-transparent h-96 p-5 hover:bg-white/30">
            <Link
                href={`/dashboard/products/category/${catId}/product/new`}
                className="w-full h-full flex flex-col align-middle justify-end"
            >
                {/*In a normal card, we would put the image in here, but this is just a plus sign for our new one*/}
                <div className="flex-1 flex flex-col relative align-middle -z-10 justify-center w-full text-gray-800">
                    <PlusCircleIcon className="h-[60px]" />
                </div>

                <div className="flex flex-col bg-transparent -z-10 w-full">
                    <div className="overflow-clip text-sm text-gray-500">
                        (Example)
                    </div>
                    <div className="text-lg">
                        Add New Product
                    </div>
                    <div className="pr-3 text-xl font-bold">
                        $x.xx
                    </div>
                    <div className="h-[1rem] mt-1 w-full">
                        <Rating rating={3} numRatings={0}/>
                    </div>
                </div>
            </Link>
        </div>
    )
}