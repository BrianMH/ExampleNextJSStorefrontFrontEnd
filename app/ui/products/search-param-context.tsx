'use client';
import SearchFloater from "@/app/ui/products/product-search-floater";
import PaginatedProdLayout from "@/app/ui/products/paginated-products";
import {createContext, useContext} from "react";
import {usePathname, useRouter, useSearchParams} from "next/navigation";
import {Product} from "@/app/lib/definitions";

// ========================= CONTEXT DECLARATION ==================================
// And define our context to propagate to the children
const ActualizedSearchContext = createContext((type: string, term: string) => {});

// along with a function for them to use to collect the data
export const useSearchParamContextData = () => {
    const context = useContext(ActualizedSearchContext);

    if (!context) {
        throw new Error("useData must be used within a <Parent />");
    }

    return context;
};

/**
 * A component that functions like a context for the search param state and allows it to be set and propagated to all
 * elements. This is bound to get messy because all the logic from all components will get mixed here and can get
 * potentially really ugly. Might have to see if there's a better way...
 */
export default function SearchParamContext({ catList, numPages, curProducts } : { catList : { id: string; name: string }[];
                                                                                  numPages : number;
                                                                                  curProducts : Product[] }) {
    // we used our passed list to create a selection wrapper that adjusts the search query
    const pathname = usePathname();
    const oldParams = useSearchParams();
    const { replace } = useRouter();

    // Handles any type of change for us and builds a path given those set of changes
    const genericHandlerSetter = (type: string, term: string) => {
        const params = new URLSearchParams();
        if(!type)
            return;     // skip setting state if called abnormally

        // try to regenerate all props first
        oldParams.forEach((value, key) => params.set(key, value));

        // and then reset page and prompt the new query
        params.set('page', '1');
        if(type === "category") {
            if (term)
                params.set('category', term);
            else
                params.delete('category');
        } else if(type === "search") {
            if(term) {
                params.set('query', term);
            } else {
                params.delete('query');
            }
        } else if(type === "pageSize") {
            if(term === '24') {
                params.delete('pageSize');
            } else {
                params.set('pageSize', term);
            }
        }

        replace(`${pathname}?${params.toString()}`);
    }

    return (
        <ActualizedSearchContext.Provider value={genericHandlerSetter}>
            <div className="w-96 h-[70%] relative p-8">
                    <SearchFloater catList={catList}/>
            </div>
            <div className="flex-1 p-8">
                <PaginatedProdLayout numPages={numPages} curProducts={curProducts}/>
            </div>
        </ActualizedSearchContext.Provider>
    )
}