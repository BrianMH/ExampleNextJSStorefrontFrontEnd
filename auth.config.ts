/**
 * Sets up the middleware for use in the website
 */
import type { NextAuthConfig } from 'next-auth';
import {fetchUserByUUID} from "@/app/lib/databaseActions";
import {Roles} from "@/app/lib/definitions";

export const authConfig = {
    pages: {
        signIn: '/login'
    },
    callbacks: {
        authorized({ auth, request: { nextUrl } }) {
            const isLoggedIn = !!auth?.user;

            // Check our callback URL parameter for future redirect
            const callbackUrl = nextUrl.searchParams.get("callbackUrl") || "";

            // dashboard would be limited only to authorized users
            const isOnDashboard = nextUrl.pathname.startsWith('/dashboard');

            // meanwhile account page would be limited to a given user as well
            const isOnAccountPage = nextUrl.pathname.startsWith('/account');

            // and we can check if we are on the login page to move the user away once authenticated
            const isOnLoginPage = nextUrl.pathname.startsWith('/login') || nextUrl.pathname.startsWith('/register');

            // then proceed to block requests given certain pages
            if(isOnDashboard) {
                if(isLoggedIn && auth?.user?.userId) {
                    // for the dashboard in particular, we make sure we only allow authorized users
                    const isAdmin = auth.user.role === Roles.ROLE_ADMIN;

                    if(isAdmin)
                        return true;
                    else
                        return Response.redirect(new URL("/account", nextUrl)); // simply redirect user if they try to access dash
                }
                return false; // otherwise push back to login
            } else if(isOnAccountPage) {
                if(isLoggedIn) return true; // pass user through again if logged
                return false; // push back to login
            } else if(isOnLoginPage && isLoggedIn) {
                return Response.redirect(new URL(callbackUrl, nextUrl));
            } else {
                return true; // these are pages that do not require authentication
            }
        },
        // processes the JWT and modifies it to exclude email
        async jwt({token, user}) {
            if(user?.userId) {
                token.sub = user.userId; // our unique identifier can be email, but UUID is more useful as it is indexed
                token.role = user.role;
                delete token.email;
            }

            return token;
        },
        // modifies the session so that particular attributes are visible from the user inner attribute
        // these attributes would be returned on calling getSession(), getServerSession(), and useSession()
        async session({ session, token, user }) {
            if(token?.sub)
                session.user.userId = token.sub;
            if(token?.role)
                session.user.role = token.role;

            return session;
        }
    },
    session: { strategy: "jwt" },
    providers: [],  // we don't have any providers for now (base pw/email management system)
} satisfies NextAuthConfig;