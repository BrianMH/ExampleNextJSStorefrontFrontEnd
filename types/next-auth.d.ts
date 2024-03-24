import NextAuth, { User } from "next-auth"
import { JWT } from "next-auth/jwt"

// We need to augment this as our DTO passes in the userId variable and will be used in this program on the server-side
// Note that for now, we leave roles embedded into the program as it would be useful in the program.
declare module "next-auth" {
    interface User {
        userId: string;
        role: string;
    }
}

// meanwhile we can adjust the JWT
declare module "next-auth/jwt" {
    interface JWT {
        id: string;
        role: string;
    }
}