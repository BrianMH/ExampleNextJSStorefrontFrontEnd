/**
 * A page used to create a new product category
 */
import {interTight} from "@/app/ui/fonts";
import ProductCategoryCard from "@/app/ui/dashboard/products/product-category-card";

export default function CreateNewCategory() {
    return (
        <div className="min-w-full h-full flex flex-col">
            <div className="flex w-full items-center pb-10 justify-between">
                <h1 className={`${interTight.className} text-2xl`}>Product Category</h1>
            </div>
        </div>
    )
}