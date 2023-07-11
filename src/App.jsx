import { BrowserRouter, Routes, Route } from "react-router-dom"
import styled from "styled-components"
import HomePage from "./pages/HomePage"
import SignInPage from "./pages/SignInPage"
import SignUpPage from "./pages/SignUpPage"
import TransactionsPage from "./pages/TransactionPage"
import { useState } from "react"
import { UserContext } from "./contexts/UserContext"
import { TokenContext } from "./contexts/TokenContext"

export default function App() {

  const [user, setUser] = useState({})
  const [token, setToken] = useState({})

  return (
    <PagesContainer>
      <BrowserRouter>
        <TokenContext.Provider value={{ token, setToken }}>
          <UserContext.Provider value={{ user, setUser }}>
            <Routes>
              <Route path="/" element={<SignInPage />} />
              <Route path="/cadastro" element={<SignUpPage />} />
              <Route path="/home" element={<HomePage />} />
              <Route path="/nova-transacao/:tipo" element={<TransactionsPage />} />
            </Routes>
          </UserContext.Provider>
        </TokenContext.Provider>
      </BrowserRouter>
    </PagesContainer>
  )
}

const PagesContainer = styled.main`
  background-color: #8c11be;
  width: calc(100vw - 50px);
  max-height: 100vh;
  padding: 25px;
`
