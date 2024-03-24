import '@/app/ui/globals.css';
import heroImage from '@/app/ui/heroImage.jpeg'
import Image from "next/image";
import {abrilFatface} from "@/app/ui/fonts";

export default function Page() {
    return (
        <div className="flex-col h-screen">
            {/*At least in theory, this can be replaced with a carousel of some sort. Perhaps a client-sided API to adjust the nav colors as well*/}
            <Image
                className="object-cover fixed w-full h-full bg-amber-50 bg-blend-color -z-10"
                src={heroImage}
                alt="An image of a set of a set of clothing."
                priority
            />
            <div id="overlayDiv" className="fixed w-full h-full bg-[linear-gradient(180deg,rgba(0,0,0,0.75)_0%,rgba(0,0,0,0.00)_10%)] z-10">
                <div id="messageDiv" className="fixed flex flex-col shadow-md bg-white/[0.7] right-[10%] top-[30%] p-4 z-20 w-1/3 h-1/3 justify-center align-middle">
                    <p className={`${abrilFatface.className} text-[40px] md:text-[45px] lg:text-[60px] text-center`}>X Fashion</p>
                </div>
            </div>
        </div>
    );
}
