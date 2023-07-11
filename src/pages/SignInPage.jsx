import styled from "styled-components"
import { Link, useNavigate } from "react-router-dom"
import MyWalletLogo from "../components/MyWalletLogo"
import { useContext, useState } from "react"
import axios from "axios"
import { UserContext } from "../contexts/UserContext"
import { TokenContext } from "../contexts/TokenContext"

export default function SignInPage() {

  const [email, setEmail] = useState("")
  const [senha, setSenha] = useState("")
  const {setUser} = useContext(UserContext)
  const {setToken} = useContext(TokenContext)
  const BaseURL = import.meta.env.VITE_API_URL
  const navigate = useNavigate()

  function realizaLogin(e) {
    e.preventDefault()
    const body = {
      email,
      senha
    }
    
    const promise = axios.post(`${BaseURL}/`,body)

    promise.then(res => {
      console.log(res.data)
      const {_id, nome} = res.data.usuario
      setUser({_id, nome})
      setToken(res.data.token)
      navigate('/home')
    })
    promise.catch(err => {
      alert(err.response.data)
      setEmail("")
      setSenha("")
      
    })

  }

  return (
    <SingInContainer>
      <form onSubmit={realizaLogin}>
        <MyWalletLogo />
        <input
          data-test="email"
          placeholder="E-mail"
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />

        <input
          data-test="password"
          placeholder="Senha"
          type="password"
          value={senha}
          onChange={e => setSenha(e.target.value)}
          required
        />
        <button
          data-test="sign-in-submit"
          type="submit">
          Entrar
        </button>
      </form>

      <Link to={'/cadastro'}>
        Primeira vez? Cadastre-se!
      </Link>
    </SingInContainer>
  )
}

const SingInContainer = styled.section`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
