/**
 * A customer variant of the inbox table
 */
import {ShortenedMessage} from '@/app/lib/definitions';
import {fetchPagedMessages, fetchPagedUsers} from "@/app/lib/data";
import Link from "next/link";
import Image from "next/image";

export default async function CustomerTable({
                                             query,
                                             currentPage,
                                         }: {
    query: string;
    currentPage: number;
}) {
    const users = await fetchPagedUsers(query, currentPage)

    return (
        <div className="mt-6 flow-root">
            <div className="overflow-x-auto">
                <div className="inline-block min-w-full align-middle">
                    <div className="overflow-hidden rounded-md bg-gray-50 p-2 md:pt-0">
                        <div className="md:hidden">
                            {users?.map((curUser) => (
                                <div
                                    key={`${curUser.id}`}
                                    className="mb-2 w-full rounded-md bg-white p-4 cursor-pointer"
                                >
                                    <div className="relative flex flex-row align-middle justify-items-start border-b pb-4">
                                        <Image
                                            className="object-contain flex flex-col align-middle justify-center p-1"
                                            src={`${curUser.avatarRef ? '/avatars/'+curUser.avatarRef : '/defaultPic.png'}`}
                                            fill={true}
                                            alt="User's Avatar"
                                        />
                                        <div className="text-sm text-gray-500 flex flex-col align-middle justify-center">
                                            {curUser.screenName}
                                        </div>
                                    </div>
                                    <div className="flex w-full items-center justify-between border-b py-5">
                                        <div className="flex w-1/2 flex-col">
                                            <p className="text-xs">Username</p>
                                            <p className="font-medium">{curUser.username}</p>
                                        </div>
                                        <div className="flex w-1/2 flex-col">
                                            <p className="text-xs">Email</p>
                                            <p className="font-medium">{curUser.email}</p>
                                        </div>
                                    </div>
                                    <div className="pt-4 text-sm">
                                        <p>Currently unused. Perhaps numbers related to customer owned invoices?</p>
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
                                    Username
                                </th>
                                <th scope="col" className="px-3 py-5 font-medium">
                                    Email
                                </th>
                                <th scope="col" className="px-3 py-5 font-medium">
                                    Etc.
                                </th>
                            </tr>
                            </thead>

                            <tbody className="divide-y divide-gray-200 text-gray-900">
                            {users.map((curUser) => (
                                <tr key={`${curUser.id}`} className="group bg-white hover:bg-gray-300">
                                    <td className="whitespace-nowrap px-4 py-5 text-sm relative">
                                        <div>
                                            <Image
                                                className="object-contain object-left p-1"
                                                src={`${curUser.avatarRef ? '/avatars/'+curUser.avatarRef : '/defaultPic.png'}`}
                                                fill={true}
                                                alt="User's Avatar"
                                            />
                                            <div className="flex ml-16">
                                                {curUser.screenName}
                                            </div>
                                        </div>
                                    </td>
                                    <td className="whitespace-nowrap px-4 py-5 text-sm">
                                        <div>
                                            {curUser.username}
                                        </div>
                                    </td>
                                    <td className="whitespace-nowrap px-4 py-5 text-sm">
                                        <div>
                                            {curUser.email}
                                        </div>
                                    </td>
                                    <td className="whitespace-nowrap px-4 py-5 text-sm">
                                        <div>
                                            Currently unused. Perhaps numbers related to customer owned invoices?
                                        </div>
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
