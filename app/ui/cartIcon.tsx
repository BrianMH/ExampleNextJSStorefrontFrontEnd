/**
 * Stateful representation of the cart icon. Will be needed when managing cart items
 */
import {ShoppingCartIcon} from "@heroicons/react/24/outline";

export default function StatefulShoppingCartIcon() {

    return (
        <div className="relative bg-inherit text-inherit">
            <ShoppingCartIcon className="h-[30px]"/>
            <div className="h-[50px] w-[50px] absolute rounded-md -z-10 bg-gray-400 -top-2.5 -left-2.5"></div>
        </div>
    )
}