import TopNav from "@/app/ui/TopNav";

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
        <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
            <div className="w-full flex-none md:w-80">
                <TopNav />
            </div>
            <div className="flex-grow p-6 md:overflow-y-auto md:p-12">{children}</div>
        </div>
    );
}