import {interTight} from "@/app/ui/fonts";
import {fetchProductCategories} from "@/app/lib/data";
import ProductCategoryCard from "@/app/ui/dashboard/products/product-category-card";
import AddProductCategoryCard from "@/app/ui/dashboard/products/new-product-category-card";

/**
 * The products page is where management of the products can be performed.
 */
export default async function Page() {
    // first we should get the list of product categories in the database to show them
    const productCategories = await fetchProductCategories();

    return (
        <div className="min-w-full h-full flex flex-col">
            <div className="flex w-full items-center pb-10 justify-between">
                <h1 className={`${interTight.className} text-2xl`}>Product Category</h1>
            </div>

            <div className="flex-1 flex flex-row flex-wrap min-w-full gap-10 align-middle justify-center pb-10">
                {productCategories.map((category) => (
                    <ProductCategoryCard
                        key={category.id}
                        catId={category.id}
                        catName={category.name}
                        descr={category.description}
                        imRef={category.imageRef}
                    />
                ))}

                {/*  And then we can add another card that would take us to a form to add a new category  */}
                <AddProductCategoryCard />
            </div>
        </div>
    )
}