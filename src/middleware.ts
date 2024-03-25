export { default } from "next-auth/middleware"

//protect  your pages with next-auth middleware
export const config = { 
    //protect dashboard page and all its children
    //protect track page and all its children
    //so that you are automatically redirected to login Page if unauthorized
    matcher: ["/dashboard/:path*","/track/:path*"]
 }