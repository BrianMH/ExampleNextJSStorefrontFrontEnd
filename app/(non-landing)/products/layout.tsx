/**
 * Sticky banner for the products page as it will need a bit of inner navigation
 */
export default function Layout({ children } : { children : React.ReactNode}) {
    return (
        <div className="flex flex-col align-middle w-full h-full">
            <div className="bg-gray-100 h-fit -mt-5 flex flex-col align-middle justify-center border-t-2 border-b-2">
                <h1 className="text-[80px] font-extrabold text-center">Products</h1>
            </div>
            <div className="flex-1 align-middle w-full min-h-screen justify-center text-xl text-center">
                {children}
            </div>
        </div>
    );
}