/**
 * A card that represents the addition of a new category. It's otherwise visually the same as
 * the normal product cards that are used for products
 */
import {PlusCircleIcon} from "@heroicons/react/24/solid";
import Link from "next/link";

export default function AddProductCategoryCard() {
    return (
        <div className="border-2 border-gray-800 shadow-lg w-64 bg-transparent h-96 p-5 hover:bg-white/30">
            <Link
                href={"/dashboard/products/category/new"}
                className="w-full h-full flex flex-col align-middle justify-end"
            >
                {/*In a normal card, we would put the image in here, but this is just a plus sign for our new one*/}
                <div className="flex-1 flex flex-col relative align-middle -z-10 justify-center w-full text-gray-800">
                    <PlusCircleIcon className="h-[60px]" />
                </div>

                <div className="bg-transparent -z-10 w-full">
                    <div className="text-center font-bold">
                        Add new category
                    </div>
                </div>
            </Link>
        </div>
    )
}