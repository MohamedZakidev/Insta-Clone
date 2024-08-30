import CreatePost from './CreatePost'
import Home from './Home'
import Notifications from './Notifictions'
import ProfileLink from './ProfileLink'
import Search from './Search'

function SidebarItems() {
    return (
        <>
            <Home />
            {/* Search to be added */}
            <Search />
            <Notifications />
            <CreatePost />
            <ProfileLink />
        </>
    )
}

export default SidebarItems
