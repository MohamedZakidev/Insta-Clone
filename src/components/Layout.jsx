import { Flex } from "@chakra-ui/react"
import { Outlet } from "react-router-dom"
import Sidebar from "./Sidebar"
import { useLocation } from "react-router-dom"
import { useAuthState } from "react-firebase-hooks/auth"
import { auth } from "../firebase/firebase"

function Layout() {
    const { pathname } = useLocation()
    const [user] = useAuthState(auth)

    const canRenderSidebar = pathname !== "/auth" && user
    return (
        <Flex>
            {canRenderSidebar ? <Sidebar /> : null}
            <Outlet />
        </Flex>
    )
}

export default Layout
