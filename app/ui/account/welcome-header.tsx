/**
 * Displays the user's information along with a welcome that shows us their screen name.
 */
import {fetchUserByUUID} from "@/app/lib/databaseActions";
import {interTight} from "@/app/ui/fonts";
import Image from "next/image";

export default async function WelcomeHeader(
    { userId } : { userId: string }
) {
    const relevantUser = await fetchUserByUUID(userId);
    if(!relevantUser)
        throw new Error("Unknown error occurred with user.");

    return (
        <div className="w-[30%] flex flex-col justify-between items-center relative pt-10 rounded-b-lg">
            <div className="w-[150px] h-[150px] relative rounded-full overflow-clip">
                <Image
                    className="object-cover"
                    src={`${relevantUser.avatarRef ? '/avatars/'+relevantUser.avatarRef : '/defaultPic.png'}`}
                    fill={true}
                    alt="User's Avatar"
                />
            </div>
            <div className="absolute -z-10 w-full h-[50%] bottom-0 bg-gray-100 rounded-t-lg"></div>
            <p className={`font-bold ${interTight.className}`}>Welcome Back, {relevantUser.screenName}!</p>
        </div>
    )
}