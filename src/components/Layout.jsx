import { Flex, Spinner } from "@chakra-ui/react"
import { Outlet } from "react-router-dom"
import Sidebar from "./Sidebar"
import { useLocation } from "react-router-dom"
import { useAuthState } from "react-firebase-hooks/auth"
import { auth } from "../firebase/firebase"
import Navbar from "./Navbar"

function Layout() {
    const { pathname } = useLocation()
    const [user, loading] = useAuthState(auth)

    const canRenderSidebar = pathname !== "/auth" && user
    const canRenderNavbar = pathname !== "/auth" && !user && !loading
    const checkingUserIsAuth = !user && loading

    if (checkingUserIsAuth) {
        return <LayoutSpinnr />
    }

    return (
        <Flex flexDirection={canRenderNavbar ? "column" : "row"}>
            {canRenderSidebar ? <Sidebar /> : null}
            {canRenderNavbar ? <Navbar /> : null}
            <Outlet />
        </Flex>
    )
}

export default Layout

function LayoutSpinnr() {
    return (
        <Flex flexDir='column' h='100vh' alignItems='center' justifyContent='center'>
            <Spinner size='xl' />
        </Flex>
    )
}
