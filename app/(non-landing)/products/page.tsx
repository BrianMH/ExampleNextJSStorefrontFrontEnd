/**
 * Displays the catalog of items along with subcategories
 */
import {fetchProductCategories, fetchNumberProductPages, fetchProductsWithQueryAndCategory} from "@/app/lib/data";
import SearchParamContext from "@/app/ui/products/search-param-context";

export const metadata = {
    title: "Products",
}

// Used in order to modify search query
interface searchParamType {
    searchParams?: {
        category?: string;
        query?: string;
        page?: string;
        numPerPage?: string;
    };
}

export default async function ProductsPage({searchParams,} : searchParamType) {
    // We can first get the data from our helper function (more could be adde here as necessary)
    const query = searchParams?.query || '';
    const category = searchParams?.category || '';
    const currentPage = Number(searchParams?.page) || 1;
    const numPerPage = Number(searchParams?.numPerPage) || 24;
    const totalPages = await fetchNumberProductPages(query, category, numPerPage);

    // along with our products corresponding to these pages
    const curProducts = await fetchProductsWithQueryAndCategory(query, category, currentPage, numPerPage);

    // but we also need our category list in order to find out what to adjust our input by
    const catList = (await fetchProductCategories()).map(cat => ({id: cat.id, name: cat.name}));

    return (
        <div className="w-full flex flex-col md:flex-row h-full p-10 flex-wrap">
            <SearchParamContext catList={catList} numPages={totalPages} curProducts={curProducts}/>
        </div>
    )
}