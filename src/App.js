import React, {useState} from 'react';
import axios from "axios";
import styled from "styled-components";
import { createGlobalStyle } from 'styled-components'
import background from "./background.jpg";
import { FaAdn } from "react-icons/fa";

function App() {
  const [searchCity, setSearchCity] = useState([])
  const [email, setEmail] = useState("")

  const api = (e) => {
    console.log(e.target)
    if(e.target.value === ""){
      setSearchCity([])
      return
    }
    axios.get(`https://restcountries.eu/rest/v2/capital/${e.target.value}`)
    .then((response)=>{setSearchCity(response.data)})
    .catch(()=>{setSearchCity([])})
  }

  return (
    <React.Fragment>
      <GlobalStyle/>
      <Container>
        <Title>
          <p>My Trip</p>
          <div><FaAdn/></div>
        </Title>
        <Content>
          <div className="form">
            <div>
              <input onChange={api} placeholder="Origin"/>
            </div>
            <div>
              <input onChange={api} placeholder="Destination"/>
            </div>
            <div>
              <input onChange={(e)=>{setEmail(e.target.value)}} placeholder="Email@gmail.com"/>
            </div>
            <div>
              <button disabled={searchCity.length === 0 || email.length === 0}>Submit</button>
            </div>
          </div>
        </Content>
        <Modal>
          <ul>
            {searchCity.slice(0, 5).map((a, i)=>{
                return <li key={i}>{a.capital}</li>
            })}
          </ul>
        </Modal>
      </Container>
    </React.Fragment>
  );
}

export default App;

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }
`

const Container = styled.div`
  height : 100vh;
  background-image : url(${background});
  background-size : cover;
`

const Title = styled.div`
  font-size : 3rem;
  font-weight : 800;
  text-align : center;
`
const Content = styled.div`
  .form {
    display : flex;
    justify-content : center;
    align-items : center;
    
    input {
      height : 30px;
      margin : 5px;
    }

    button {
      width : 100px;
      height : 30px;
    }
  }
`
const Modal = styled.div`
  border : 1px solid black;
  text-align : center;
  z-index : 10;
  background-color : whitesmoke;
  border : none;
`