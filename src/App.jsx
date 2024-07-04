import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import Home from "./pages/Home/Home"
import AuthPage from "./pages/AuthPage/AuthPage"
import Layout from "./components/Layout"
import ProfilePage from "./pages/ProflePage/ProfilePage"
import { auth } from "./firebase/firebase"
import { useAuthState } from "react-firebase-hooks/auth"
import "./index.css"

function App() {
  const [user] = useAuthState(auth)
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={user ? <Home /> : <Navigate to={"auth"} />} />
            <Route path="auth" element={user ? <Navigate to="/" /> : <AuthPage />} />
            <Route path=":username" element={<ProfilePage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
