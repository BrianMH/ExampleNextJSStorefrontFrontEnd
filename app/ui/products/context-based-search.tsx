'use client';
/**
 * Performs the same operations that the normal search component does, but using the product-based context created
 */
import {MagnifyingGlassIcon} from '@heroicons/react/24/outline';
import {useSearchParams} from "next/navigation";
import {useDebouncedCallback} from "use-debounce";
import {useSearchParamContextData} from "@/app/ui/products/search-param-context";

export default function SearchUnderContext({placeholder}: { placeholder: string }) {
    // we can read normally as these are generally immutable
    const searchParam = useSearchParams();

    // And then use the search params to manipulate the current URL
    const handleSearch = useDebouncedCallback(useSearchParamContextData().bind(null, "search"), 300);

    return (
        <div className="relative flex flex-1 flex-shrink-0">
            <label htmlFor="search" className="sr-only">
                Search
            </label>
            <input
                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                placeholder={placeholder}
                onChange={(e) => {
                    handleSearch((e.target.value));
                }}
                defaultValue = {searchParam.get('query')?.toString()}
            />
            <MagnifyingGlassIcon
                className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900"/>
        </div>
    );
}