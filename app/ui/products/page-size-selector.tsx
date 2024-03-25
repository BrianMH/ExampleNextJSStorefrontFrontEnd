'use client';
import {useSearchParamContextData} from "@/app/ui/products/search-param-context";

/**
 * Allows us to adjust the page size on the fly using search queries
 */

export default function PageSizeSelector() {
    // creates a page size handler
    const handleChangedPageSize = useSearchParamContextData().bind(null, "pageSize");

    return (
        <form className="max-w-sm">
            <label className="h-auto flex-col align-middle" htmlFor="numPerPage">Results per page: </label>

            <select name="numPerPage" id="numPerPage"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5"
                    onChange={(e) => handleChangedPageSize(e.target.value)}>
                <option value="24">24</option>
                <option value="48">48</option>
                <option value="72">72</option>
            </select>
        </form>
    )
}