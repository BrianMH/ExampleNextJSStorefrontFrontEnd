/**
 * An extremely simple login page just to appease the Next.JS based verification
 */
import LoginForm from "@/app/ui/login-form";

export const metadata = {
    title: "Login",
}

export default function LoginPage() {
    return (
        <main className="flex flex-col items-center w-full md:h-full">
            <div className="bg-gray-100 w-full h-fit -mt-5 align-middle justify-center border-t-2 border-b-2">
                <h1 className="text-[80px] font-extrabold text-center">Login</h1>
            </div>
            <div className="h-full flex flex-col justify-center">
                <LoginForm />
            </div>
        </main>
    );
}