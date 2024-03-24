/**
 * Handles the view of the email along with the deletion. Includes a breadcrumb in order to be able to return to the
 * previous location.
 */
import {fetchMessageById} from "@/app/lib/data";
import Breadcrumbs from "@/app/ui/breadcrumbs";

export default async function Page({ params } : { params: { id: string }}) {
    const id = params.id;
    const message = await fetchMessageById(id);

    if(!message) {
        throw Error("No such message exists");
    }

    // then prepare our created date (Z as server time is typically UTC based)
    const createdDate = new Date(message.created + 'Z');

    return (
        <div className="w-full h-full">
            {/* First add the breadcrumbs */}
            <Breadcrumbs
                breadcrumbs={[
                    {label: "Inbox", href: "/dashboard/inbox"},
                    {label: "Message", href: `/dashboard/inbox/${id}/view`, active: true}
                ]}
            />

            <div className="grid grid-rows-[25%_75%] w-full h-[95%] border-2 border-gray-400 bg-gray-50 p-10">
                <div className="h-full w-full border-b-2 border-gray-300 flex flex-col justify-between p-10">
                    {/*  Here would be the information that represents message metadata  */}
                    <div>
                        <p className="text-2xl font-bold pb-3">{message.subject}</p>
                        <p className="text-xl">{message.name} - ({message.email})</p>
                    </div>
                    <div>
                        <span className="font-bold">Received:</span> {createdDate.toLocaleString()}
                    </div>
                </div>
                <div className="h-full w-full text-xl p-10">
                    {message.message}
                </div>
            </div>
        </div>
    )
}