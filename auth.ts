import NextAuth from 'next-auth';
import {authConfig} from './auth.config';
import Credentials from "@auth/core/providers/credentials";
import {z} from 'zod';
import {fetchUserByEmail} from "@/app/lib/data";
import bcrypt from 'bcrypt';

// get the required user given their email
async function getUser(email: string) {
    try {
        // use our database API in order to grab a user
        return await fetchUserByEmail(email);
    } catch(error) {
        console.error("Failed to fetch user: ", error);
        throw new Error("Failed to fetch user.");
    }
}

export const { auth, signIn, signOut } = NextAuth({
    ...authConfig,
    providers: [
        Credentials({
            async authorize(credentials) {
                const parsedCredentials = z
                    .object({ email: z.string().email(), password: z.string().min(6) })
                    .safeParse(credentials);

                if(parsedCredentials.success) {
                    const {email, password} = parsedCredentials.data;
                    const user = await getUser(email);
                    if(!user) return null; // user not found

                    // then compare passwords via bcrypt
                    const passwordsMatch = await bcrypt.compare(password, user.password);

                    if(passwordsMatch) return user;
                }

                console.log("Invalid credentials");
                return null;
            },
        }),
    ],
});