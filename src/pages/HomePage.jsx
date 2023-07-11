import styled from "styled-components"
import { BiExit } from "react-icons/bi"
import { AiOutlineMinusCircle, AiOutlinePlusCircle } from "react-icons/ai"
import { useNavigate } from "react-router-dom"
import { useContext, useEffect, useState } from "react"
import { UserContext } from "../contexts/UserContext"
import axios from "axios"
import { TokenContext } from "../contexts/TokenContext"

export default function HomePage() {


  const navigate = useNavigate()
  const { user } = useContext(UserContext)
  const { token, setToken } = useContext(TokenContext)
  const BaseURL = import.meta.env.VITE_API_URL
  const [dataUser, setDataUser] = useState([])
  const [transations, setTransations] = useState([])

  useEffect(() => {
    if (localStorage.getItem('token') == undefined) {
      navigate('/')
      return
    }
    const promise = axios.get(`${BaseURL}/home`, {
      headers:
        { Authorization: `Bearer ${token}` }
    })
    promise.then(res => {
      setDataUser(res.data)
      setTransations(res.data.transacoes.reverse())
      console.log(res.data.transacoes)

    })
    promise.catch(err => {
      console.log(err.message)
    })

  }, [])

  function logout() {
    localStorage.removeItem('token')
    setToken('')
    setTransations('')
    setDataUser('')
    navigate('/')
  }


  return (
    <HomeContainer>
      <Header>
        <h1 data-test="user-name">Olá, {user.nome}</h1>
        <BiExit data-test="logout" onClick={logout} />
      </Header>

      <TransactionsContainer>
        <ul>
          {transations.map(t => (
            <ListItemContainer key={t.id}>
              <div>
                <span>{t.data}</span>
                <strong data-test="registry-name" >{t.descricao}</strong>
              </div>
              <Value data-test="registry-amount" color={t.tipo === "entrada" ? "positivo" : "negativo"}>{parseFloat(t.valor).toFixed(2)}</Value>
            </ListItemContainer>
          ))}
        </ul>

        <article>
          <strong>Saldo</strong>
          <Value data-test="total-amount" color={dataUser.saldo > 0 ? "positivo" : "negativo"}>{parseFloat(dataUser.saldo).toFixed(2)}</Value>
        </article>
      </TransactionsContainer>


      <ButtonsContainer>
        <button data-test="new-income" onClick={() => navigate('/nova-transacao/entrada')}>
          <AiOutlinePlusCircle />
          <p>Nova <br /> entrada</p>
        </button>
        <button data-test="new-expense" onClick={() => navigate('/nova-transacao/saida')}>
          <AiOutlineMinusCircle />
          <p>Nova <br />saída</p>
        </button>
      </ButtonsContainer>

    </HomeContainer>
  )
}

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: calc(100vh - 50px);
`
const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 2px 5px 2px;
  margin-bottom: 15px;
  font-size: 26px;
  color: white;
`
const TransactionsContainer = styled.article`
  flex-grow: 1;
  background-color: #fff;
  color: #000;
  border-radius: 5px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  article {
    display: flex;
    justify-content: space-between;   
    strong {
      font-weight: 700;
      text-transform: uppercase;
    }
  }
`
const ButtonsContainer = styled.section`
  margin-top: 15px;
  margin-bottom: 0;
  display: flex;
  gap: 15px;
  
  button {
    width: 50%;
    height: 115px;
    font-size: 22px;
    text-align: left;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    p {
      font-size: 18px;
    }
  }
`
const Value = styled.div`
  font-size: 16px;
  text-align: right;
  color: ${(props) => (props.color === "positivo" ? "green" : "red")};
`
const ListItemContainer = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
  color: #000000;
  margin-right: 10px;
  div span {
    color: #c6c6c6;
    margin-right: 10px;
  }
`