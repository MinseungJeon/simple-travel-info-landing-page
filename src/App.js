import React, { useState } from 'react';
import axios from "axios";
import emailjs from 'emailjs-com';
import { useHistory } from "react-router-dom";
import { useCookies, CookiesProvider } from 'react-cookie';
import styled, { createGlobalStyle } from 'styled-components'
import background from "./background.jpg";
import { FaAdn } from "react-icons/fa";

function App() {
  
  const [originCity, setOriginCity] = useState([])
  const [destinationCity, setDestinationCity] = useState([])
  const [cookies, setCookie] = useCookies(['inputs']);
  const [inputs, setInputs] = useState(cookies.inputs||{});



 const onChangeInput= (e) => {
   setInputs({
     ...inputs,
     [e.target.name]: e.target.value
   })
   if(e.target.name ==="origin"){
     originAPI(e)
   }else if(
     e.target.name ==="destination"
   ){
    destinationAPI(e)  
   }
 }

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
    setCookie("inputs", inputs, {path:"/"})
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
    <CookiesProvider>
      <GlobalStyle/>
      <Container>
        <Title>
          <p>My Trip</p>
          <div><FaAdn/></div>
        </Title>
        <Content>
          <form onSubmit={sendEmail}>
            <div>
              <input name="origin" onChange={onChangeInput} value={inputs.origin||""} placeholder="Origin"/>
            </div>
            <div>
              <input name="destination" onChange={onChangeInput} value={inputs.destination||""} placeholder="Destination"/>
            </div>
            <div>
              <input name="email" onChange={onChangeInput} value={inputs.email||""} placeholder="Email@gmail.com"/>
            </div>
            <div>
              <button disabled={originCity?.length === 0 || destinationCity?.length === 0 || inputs.email?.length === 0}>Submit</button>
            </div>
          </form>
          {(originCity.length === 0 && destinationCity.length === 0) && <p>AT LEAST 1 LETTERS !!! </p>}
          {!inputs.email?.includes("@") && <p>Check including "@" in email address !!! </p>}
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
    </CookiesProvider>
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
  width: 100vw;
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

    @media (max-width: 768px) {
      flex-direction: column;
    }

    input {
      width : 7rem;
      height : 1.5rem;
      @media (max-width: 768px) {
        width : 10rem;
      }
    }

    button {
      width : 5rem;
      height : 1.5rem;

      @media (max-width: 768px) {
        width : 10rem;
      }
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
    margin : 2rem 0;

  }
  .destinationList{
    p {
      background-color : whitesmoke;
      font-weight:bold
    }
    background-color : aquamarine;
  }
`