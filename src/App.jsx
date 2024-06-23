/* eslint-disable no-unused-vars */
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import Home from "./pages/Home/Home"
import AuthPage from "./pages/AuthPage/AuthPage"
import Layout from "./components/Layout"
import ProfilePage from "./pages/ProflePage/ProfilePage"
import "./index.css"
import useAuthStore from "./store/authStore"

function App() {
  const authUser = useAuthStore((state) => state.user)
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={authUser ? <Home /> : <Navigate to={"auth"} />} />
            <Route path="auth" element={authUser ? <Navigate to="/" /> : <AuthPage />} />
            <Route path=":username" element={<ProfilePage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
