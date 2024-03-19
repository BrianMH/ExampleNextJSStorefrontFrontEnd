import TopNav from "@/app/ui/topnav";

/**
 * This will hold the top bar that will be present in the front-page. It will only contain
 * 1) The site logo
 * 2) A search bar for products
 * 3) A button to access a user's account page
 *
 * Most fashion stores seem to be opting for extremely simple front-pages that instead show-off their hero image carousel,
 * so I wanted to try and attempt doing the same.
 */
export default function Layout({ children } : { children : React.ReactNode}) {
    return (
        <div className="flex h-screen flex-col">
            <div className="w-full z-10 text-black">
                <TopNav />
            </div>
            {/*Need padding to push the fixed nav-bar and content in the right place*/}
            <div className="flex-1 m-0 -z-10">{children}</div>
            <div className="bg-gray-100">Footer</div>
        </div>
    );
}