/**
 * An inbox based heavily off the Next.JS tutorial's implementation of the invoice table.
 */
import {ShortenedMessage} from '@/app/lib/definitions';
import {fetchPagedMessages} from "@/app/lib/data";
import Link from "next/link";

export default async function InboxTable({
                                                query,
                                                currentPage,
                                         }: {
                                                query: string;
                                                currentPage: number;
}) {
    const messages = await fetchPagedMessages(query, currentPage)

    return (
        <div className="mt-6 flow-root">
            <div className="overflow-x-auto">
                <div className="inline-block min-w-full align-middle">
                    <div className="overflow-hidden rounded-md bg-gray-50 p-2 md:pt-0">
                        <div className="md:hidden">
                            {messages?.map((shortMessage) => (
                                <div
                                    key={shortMessage.id}
                                    className="mb-2 w-full rounded-md bg-white p-4 cursor-pointer"
                                >
                                    <div className="flex items-center justify-between border-b pb-4">
                                        <div>
                                            <p className="text-sm text-gray-500">
                                                {shortMessage.name}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex w-full items-center justify-between border-b py-5">
                                        <div className="flex w-1/2 flex-col">
                                            <p className="text-xs">Subject</p>
                                            <p className="font-medium">{shortMessage.subject}</p>
                                        </div>
                                        <div className="flex w-1/2 flex-col">
                                            <p className="text-xs">Email</p>
                                            <p className="font-medium">{shortMessage.email}</p>
                                        </div>
                                    </div>
                                    <div className="pt-4 text-sm">
                                        <p>{shortMessage.shortMessage}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <table className="hidden min-w-full rounded-md text-gray-900 md:table">
                            <thead className="rounded-md bg-gray-50 text-left text-sm font-normal">
                            <tr>
                                <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                                    Name
                                </th>
                                <th scope="col" className="px-3 py-5 font-medium">
                                    Email
                                </th>
                                <th scope="col" className="px-3 py-5 font-medium">
                                    Subject
                                </th>
                                <th scope="col" className="px-3 py-5 font-medium">
                                    Content
                                </th>
                            </tr>
                            </thead>

                            <tbody className="divide-y divide-gray-200 text-gray-900">
                            {messages.map((shortMessage) => (
                                <tr key={shortMessage.id} className="group bg-white hover:bg-gray-300">
                                    <td className="whitespace-nowrap px-4 py-5 text-sm">
                                        <Link href={`/dashboard/inbox/${shortMessage.id}/view`}>
                                            {shortMessage.name}
                                        </Link>
                                    </td>
                                    <td className="whitespace-nowrap px-4 py-5 text-sm">
                                        <Link href={`/dashboard/inbox/${shortMessage.id}/view`}>
                                            {shortMessage.email}
                                        </Link>
                                    </td>
                                    <td className="whitespace-nowrap px-4 py-5 text-sm">
                                        <Link href={`/dashboard/inbox/${shortMessage.id}/view`}>
                                            {shortMessage.subject}
                                        </Link>
                                    </td>
                                    <td className="whitespace-nowrap px-4 py-5 text-sm">
                                        <Link href={`/dashboard/inbox/${shortMessage.id}/view`}>
                                            {shortMessage.shortMessage}
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}
