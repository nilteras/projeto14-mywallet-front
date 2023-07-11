import axios from "axios"
import { useContext, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import styled from "styled-components"
import { TokenContext } from "../contexts/TokenContext"

export default function TransactionsPage() {

  const { tipo } = useParams()
  const navigate = useNavigate()
  const [valor, setValor] = useState('')
  const [descricao, setDescricao] = useState('')
  const {token} = useContext(TokenContext)
  const BaseURL = import.meta.env.VITE_API_URL

  function novaTransacao(e) {
    e.preventDefault()
    let renderValor = Number(valor)
    const body = {
      valor: renderValor,
      descricao
    }
    const promise = axios.post(`${BaseURL}/nova-transacao/${tipo}`, body, {
      headers:
        { Authorization: `Bearer ${token}` }
    })
      promise.then(res => {
        console.log(res.data)
        navigate('/home')
      })
      promise.catch(err => {
        console.log(err)
        setDescricao('')
        setValor('')
      })
  }

  return (
    <TransactionsContainer tipo={tipo}>
      <h1>Nova {tipo === 'entrada' ? 'Entrada' : 'Saida'}</h1>
      <form onSubmit={novaTransacao}>

        <input
          data-test="registry-amount-input"
          name="valor"
          placeholder="Valor"
          type="number"
          value={valor}
          onChange={e => setValor(e.target.value)}
          required
        />
        <input
          data-test="registry-name-input"
          placeholder="Descrição"
          type="text"
          value={descricao}
          onChange={e => setDescricao(e.target.value)}
          required
        />
        <button data-test="registry-save" type="submit">Salvar {tipo === 'entrada' ? 'Entrada' : 'Saida'}</button>
      </form>
    </TransactionsContainer>
  )
}

const TransactionsContainer = styled.main`
  height: calc(100vh - 50px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;

  h1 {
    align-self: flex-start;
    margin-bottom: 40px;
  }
`
