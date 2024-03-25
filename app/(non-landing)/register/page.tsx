/**
 * Registration form for a user
 */
import LoginForm from "@/app/ui/login-form";
import RegisterForm from "@/app/ui/register-form";

export default function RegisterPage() {
    return (
        <main className="flex flex-col items-center w-full md:h-full">
            <div className="bg-gray-100 w-full h-fit -mt-5 align-middle justify-center border-t-2 border-b-2">
                <h1 className="text-[80px] font-extrabold text-center">Register</h1>
            </div>
            <div className="h-full min-w-[20%] flex flex-col justify-center">
                <RegisterForm />
            </div>
        </main>
    )
}