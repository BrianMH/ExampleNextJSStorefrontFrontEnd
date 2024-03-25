/**
 * Creates a layout with pagination that allows us to see a specific number of products based on their categories.
 * Luckily, because we can implement the use of state through the pathname, this object only needs to know the current
 * path in order to be aware of the user's search.
 */
import PageSizeSelector from "@/app/ui/products/page-size-selector";
import SearchUnderContext from "@/app/ui/products/context-based-search";
import Pagination from "@/app/ui/dashboard/inbox/pagination";
import {Product} from "@/app/lib/definitions";
import ProductOverviewCard from "@/app/ui/dashboard/products/product-card";

export default function PaginatedProdLayout({ numPages, curProducts } : { numPages : number; curProducts : Product[] }) {
    return (
        <div className="w-[100%] h-[100%] flex flex-col">
            {/* First let's give the user an option to set the number of results per page */}
            <div className="w-[100%] flex flex-row px-10 pb-4">
                <div className="px-10 flex-1">
                    <SearchUnderContext placeholder={"Search by product name..."} />
                </div>

                <div>
                    <PageSizeSelector />
                </div>
            </div>

            {/*These would be our product overviews via cards*/}
            <div className="flex-1 flex flex-row gap-12 flex-wrap p-6">
                {curProducts.map(prod => (
                    <ProductOverviewCard
                        key={prod.productId}
                        catId={prod.category.id}
                        prodId={prod.productId}
                        prodName={prod.name}
                        prodDescr={prod.description}
                        prodPrice={prod.priceInCents}
                        prodIms={prod.carouselList}
                        prodOOS={prod.outOfStock}
                        prodRating={0}
                        numRatings={0}
                        linkRef={`/products/${prod.productId}`}
                    />
                ))}
            </div>

            <div className="flex flex-row justify-center align-middle pt-3">
                <Pagination totalPages={numPages} />
            </div>
        </div>
    );
}