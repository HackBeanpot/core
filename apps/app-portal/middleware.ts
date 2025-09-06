import { NextRequestWithAuth, withAuth } from "next-auth/middleware"
export default withAuth(
    // middleware is triggered AFTER callbacks, allowing for additional authentication logic after the callbacks have been completed
    function middleware(req: NextRequestWithAuth) {
        console.log('middleware/token', req.nextauth.token)
    },
    {
        // callbacks are triggered first
        callbacks: {
            // the authorized callback restricts all matched paths, redirecting unauthorized responses to our signIn page
            authorized: (params) => {
                let { token } = params
                return !!token // returns true (indicating "authorized" status) if token is not null (indicating a logged in status)
            }
        },
        pages: {
            signIn: '/',
        },
    }
)
// This middleware will only restrict paths defined in the matcher array below
export const config = { matcher: ["/admin/:path*"] }