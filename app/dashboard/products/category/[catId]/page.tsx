/**
 * The category view page for the product category. This page basically lets us view the products that are under the
 * current category.
 */
import {fetchCategoryWithProducts} from "@/app/lib/data";
import Breadcrumbs from "@/app/ui/breadcrumbs";
import {Product} from "@/app/lib/definitions";
import NewProductCard from "@/app/ui/dashboard/products/new-product-card";
import ProductOverviewCard from "@/app/ui/dashboard/products/product-card";

export default async function CategoryViewPage({ params } : { params : { catId: string } }) {
    // first we get all of the products associated with the category (along with the category itself)
    const categoryWithProducts = await fetchCategoryWithProducts(params.catId);
    const products : Product[] = categoryWithProducts.relProducts || [];

    return (
        <div className="min-w-full h-full flex flex-col">
            <div className="flex w-full items-center pb-4 justify-between">
                {/* First add the breadcrumbs */}
                <Breadcrumbs
                    breadcrumbs={[
                        {label: "Product Category", href: "/dashboard/products"},
                        {label: "Products", href: `/dashboard/products/category/${params.catId}`, active: true}
                    ]}
                />
            </div>

            {/* And we can go ahead and display all the products that fall under this category */}
            <div className="flex-1 flex flex-row flex-wrap min-w-full gap-10 align-middle justify-center pb-10">
                {products.map(( prod ) =>
                    (
                        <ProductOverviewCard
                            key={`${prod.productId}`}
                            catId={params.catId}
                            prodId={prod.productId}
                            prodName={prod.name}
                            prodDescr={prod.description}
                            prodIms={prod.carouselList}
                            prodOOS={prod.outOfStock}
                            prodPrice={prod.priceInCents}
                            prodRating={0} // right now we don't have ratings, but that might change...
                            numRatings={0}
                            linkRef={`/dashboard/products/category/${params.catId}/product/${prod.productId}`}
                        />
                    )
                )}

                <NewProductCard
                    catId={params.catId}
                />
            </div>
        </div>
    )
}