
export const metadata = {
    title: "Account",
}

export default function Page() {
    return (
        <div className="flex flex-col align-middle w-full h-full">
            <div className="bg-gray-100 h-fit -mt-5 flex flex-col align-middle justify-center border-t-2 border-b-2">
                <h1 className="text-[80px] font-extrabold text-center">Account</h1>
            </div>
            <div className="flex flex-col align-middle justify-center text-xl text-center m-10">
                <p>Rest of page</p>
            </div>
        </div>
    )
}