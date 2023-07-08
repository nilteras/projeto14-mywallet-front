import { Link, useNavigate } from "react-router-dom"
import styled from "styled-components"
import MyWalletLogo from "../components/MyWalletLogo"
import { useState } from "react"
import axios from "axios"

export default function SignUpPage() {
  const [nome, setNome] = useState("")
  const [email, setEmail] = useState("")
  const [senha, setSenha] = useState("")
  const [confirmaSenha, setConfirmaSenha] = useState("")
  const navigate = useNavigate()
  const BaseURL = import.meta.env.VITE_API_URL


  function adicionaUsuario(e) {
    e.preventDefault()

    const body = {
      nome,
      email,
      senha,
      confirmaSenha
    }
    console.log(body)

    const promise = axios.post(`${BaseURL}/cadastro`, body)
    console.log(promise)

    promise.then(res => {
      console.log(res)
      navigate('/')
    })
    promise.catch(err => {
      console.log(err)
      alert(err.response.data)
      setNome("")
      setEmail("")
      setSenha("")
      setConfirmaSenha("")
    })

  }


  return (
    <SingUpContainer>
      <form onSubmit={adicionaUsuario}>
        <MyWalletLogo />
        <input
          data-test="name"
          name="nome"
          placeholder="Nome"
          type="text"
          value={nome}
          onChange={e => setNome(e.target.value)}
          required
        />
        <input
          data-test="email"
          name="email"
          placeholder="E-mail"
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
        <input
          data-test="password"
          name="senha"
          placeholder="Senha"
          type="password"
          value={senha}
          onChange={e => setSenha(e.target.value)}
          required


        />
        <input
          data-test="conf-password"
          name="confirmaSenha"
          placeholder="Confirme a senha"
          type="password"
          value={confirmaSenha}
          onChange={e => setConfirmaSenha(e.target.value)}
          required
        />
        <button data-test="sign-up-submit" type="submit">Cadastrar</button>
      </form>

      <Link to={"/"}>
        Já tem uma conta? Entre agora!
      </Link>
    </SingUpContainer>
  )
}

const SingUpContainer = styled.section`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
