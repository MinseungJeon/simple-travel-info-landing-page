import React, {useState} from 'react';
import axios from "axios";
import emailjs from 'emailjs-com';
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { createGlobalStyle } from 'styled-components'
import background from "./background.jpg";
import { FaAdn } from "react-icons/fa";

function App() {
  
  const [originCity, setOriginCity] = useState([])
  const [destinationCity, setDestinationCity] = useState([])
  const [email, setEmail] = useState("")

  const originAPI = (e) => {
    if(e.target.value === ""){
      setOriginCity([])
      return
    }
    axios.get(`https://restcountries.eu/rest/v2/capital/${e.target.value}`)
    .then((response)=>{setOriginCity(response.data)})
    .catch(()=>{setOriginCity([])})
  }

  const destinationAPI = (e) => {
    if(e.target.value === ""){
      setDestinationCity([])
      return
    }
    axios.get(`https://restcountries.eu/rest/v2/capital/${e.target.value}`)
    .then((response)=>{setDestinationCity(response.data)})
    .catch(()=>{setDestinationCity([])})
  }

  let history = useHistory();
  
  const sendEmail = (e) => {
    e.preventDefault();
    

    emailjs.sendForm('service_8z0ahe8', 'template_9w6uesp', e.target, 'user_7qxPOgv286TSU1lHEJVg4')
      .then((result) => {
          console.log(result.text);
          history.push("/newpage");
      }, (error) => {
          console.log(error.text);
      });
      e.target.reset();
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
          <form onSubmit={sendEmail}>
            <div>
              <input name="origin" onChange={originAPI} placeholder="Origin"/>
            </div>
            <div>
              <input name="destination" onChange={destinationAPI} placeholder="Destination"/>
            </div>
            <div>
              <input onChange={(e)=>{setEmail(e.target.value)}} placeholder="Email@gmail.com"/>
            </div>
            <div>
              <button disabled={originCity.length === 0 || destinationCity.length === 0 || email.length === 0}>Submit</button>
            </div>
          </form>
          {(originCity.length === 0 && destinationCity.length === 0) && <p>AT LEAST 1 LETTERS !!! </p>}
          {!email?.includes("@") && <p>Check including "@" in email address !!! </p>}
        </Content>
        <Modal>
          <ul className="originList">
            <p>Origin</p>
            {originCity.slice(0, 5).map((a, i)=>{
                return <li key={i}>{a.capital}</li>
            })}  
          </ul>
          <ul className="destinationList">
            <p>Destinatiion</p>
            {destinationCity.slice(0, 5).map((a, i)=>{
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

  form {
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

  p {
    width : 100vw;
    border : 1px solid red;
    font-weight : 700;
    color : red;
    text-align : center;
    background : black;
    z-index : 5;
  }
`
const Modal = styled.div`
  border : 1px solid black;
  text-align : center;
  z-index : 10;
  border : none;

  .originList{
    p {
      background-color : whitesmoke;
      font-weight:bold;
    }
    background-color : aquamarine;
    margin : 50px 0;

  }
  .destinationList{
    p {
      background-color : whitesmoke;
      font-weight:bold
    }
    background-color : aquamarine;
  }
`