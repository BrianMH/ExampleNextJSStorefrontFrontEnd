import InboxTable from "@/app/ui/dashboard/inbox/table";
import {fetchNumPages} from "@/app/lib/data";
import Search from "@/app/ui/search";
import Pagination from "@/app/ui/dashboard/inbox/pagination";
import {interTight} from "@/app/ui/fonts";

// Used in order to modify search query
interface searchParamType {
    searchParams?: {
        query?: string;
        page?: string;
    };
}

export default async function Page({searchParams,} : searchParamType) {
    // We can first get the data from our helper function
    const query = searchParams?.query || '';
    const currentPage = Number(searchParams?.page) || 1;
    const totalPages = await fetchNumPages(query);

    return (
        <div className="w-full">
            <div className="flex w-full items-center justify-between">
                <h1 className={`${interTight.className} text-2xl`}>Inbox</h1>
            </div>
            <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
                <Search placeholder="Search invoices..." />
            </div>
            <InboxTable query={query} currentPage={currentPage} />
            <div className="mt-5 flex w-full justify-center">
                <Pagination totalPages={totalPages} />
            </div>
        </div>
    );
}