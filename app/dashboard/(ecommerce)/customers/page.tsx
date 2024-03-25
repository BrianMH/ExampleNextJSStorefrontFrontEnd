/**
 * Similar to inbox page, but instead shows customers along with some basic info about them
 */
import {fetchNumPages, fetchNumUserPages} from "@/app/lib/data";
import Search from "@/app/ui/search";
import Pagination from "@/app/ui/dashboard/inbox/pagination";
import {interTight} from "@/app/ui/fonts";
import CustomerTable from "@/app/ui/dashboard/customers/customer-table";

// Used in order to modify search query
interface searchParamType {
    searchParams?: {
        query?: string;
        page?: string;
    };
}

export default async function CustomersPage({searchParams,} : searchParamType) {
    // We can first get the data from our helper function
    const query = searchParams?.query || '';
    const currentPage = Number(searchParams?.page) || 1;
    const totalPages = await fetchNumUserPages(query);

    return (
        <div className="w-full">
            <div className="flex w-full items-center justify-between">
                <h1 className={`${interTight.className} text-2xl`}>Registered Users</h1>
            </div>
            <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
                <Search placeholder="Search users..." />
            </div>
            <CustomerTable query={query} currentPage={currentPage} />
            <div className="mt-5 flex w-full justify-center">
                <Pagination totalPages={totalPages} />
            </div>
        </div>
    );
}