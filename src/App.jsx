/* eslint-disable no-unused-vars */
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from "./pages/Home/Home"
import AuthPage from "./pages/AuthPage/AuthPage"
import Layout from "./components/Layout"
import ProfilePage from "./pages/ProflePage/ProfilePage"
import "./index.css"

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="auth" element={<AuthPage />} />
            <Route path=":username" element={<ProfilePage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
