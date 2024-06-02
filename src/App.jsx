/* eslint-disable no-unused-vars */
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from "./pages/Home/Home"
import AuthPage from "./pages/AuthPage/AuthPage"
import Layout from "./components/Layout"

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="auth" element={<AuthPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
