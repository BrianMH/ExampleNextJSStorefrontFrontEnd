/**
 * A card that represents a particular product category entry in the database
 */
import Link from "next/link";
import Image from "next/image";
import ImageWithLoader from "@/app/ui/dashboard/products/fake-image-loader";

export default function ProductCategoryCard({ catId, catName, descr, imRef }
                                                : { catId: string, catName: string, descr: string, imRef: string }) {
    return (
        <div className="border-2 border-gray-800 shadow-lg w-60 bg-transparent h-96 p-5 hover:bg-white/30">
            <Link
                href={`/dashboard/products/category/${catId}`}
                className="w-full h-full flex flex-col align-middle justify-end"
            >
                {/*In a normal card, we would put the image in here, but this is just a plus sign for our new one*/}
                <div className="flex-1 flex flex-col relative align-middle -z-10 justify-center w-full text-gray-800">
                    <ImageWithLoader imRef={imRef} catName={catName} />
                </div>

                <div className="bg-transparent -z-10 w-full">
                    <div className="text-center font-bold">
                        {catName}
                    </div>
                    <div className="text-center h-[1.5rem] w-full text-sm pt-1 text-gray-700 overflow-clip">
                        {descr}
                    </div>
                </div>
            </Link>
        </div>
    )
}