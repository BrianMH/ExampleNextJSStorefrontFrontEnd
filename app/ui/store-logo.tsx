import { BuildingStorefrontIcon } from '@heroicons/react/24/outline';
import {interTight} from '@/app/ui/fonts';
import { STORE_NAME } from "@/app/lib/constants";

export default function StoreLogo() {
    return (
        <div
            className={`${interTight.className} flex flex-row items-center space-x-1 leading-none`}
        >
            <BuildingStorefrontIcon className="h-12 w-12 rotate-[15deg]" />
            <p className="text-[30px]">{STORE_NAME}</p>
        </div>
    );
}