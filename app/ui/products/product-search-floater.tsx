'use client';
/**
 * A floaty search box that would accompany the content. Because this content is adjustable by the user, it also requires
 * that the content be held on the client-side
 */
import {useSearchParamContextData} from "@/app/ui/products/search-param-context";

export default function SearchFloater({ catList } : { catList : { id : string ; name : string }[] }) {
    // creates a page size handler
    const handleCategorySelector = useSearchParamContextData().bind(null, "category");

    return (
        <div className="h-[43rem] flex flex-col w-80 relative md:fixed border-gray-600 p-3 border-2 md:shadow-lg">
            <div className={"w-full font-bold"}>
                Search options
            </div>
            <form className="max-w-sm py-4">
                <label className="h-auto w-full block pb-2 flex-col align-middle" htmlFor="category">Category: </label>

                <select name="category" id="category"
                        className="bg-gray-50 border border-gray-300 w-full text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5"
                        onChange={(e) => handleCategorySelector(e.target.value)}>
                    <option value=""></option>
                    {catList.map(category => (
                        <option key={category.id} value={category.id}>{category.name}</option>
                    ))}
                </select>
            </form>

            <div className="flex-1 border-2 border-amber-700 p-3">
                In here would be other options once variants are implemented...
            </div>
        </div>
    );
}