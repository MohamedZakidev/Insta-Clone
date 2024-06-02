import { Flex } from "@chakra-ui/react"
import { Outlet } from "react-router-dom"
import Sidebar from "./Sidebar"
import { useLocation } from "react-router-dom"

function Layout() {
    const { pathname } = useLocation()

    return (
        <Flex>
            {pathname === "/auth" ? null : <Sidebar />}
            <Outlet />
        </Flex>
    )
}

export default Layout
