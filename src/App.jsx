/* eslint-disable no-unused-vars */
import { Button } from "@chakra-ui/react"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from "./pages/Home/Home"
import AuthPage from "./pages/AuthPage/AuthPage"

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route index element={<Home />} />
            <Route path="auth" element={<AuthPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
