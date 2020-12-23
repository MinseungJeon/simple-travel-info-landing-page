import React, { useEffect } from 'react';
import styled from "styled-components";
import { createGlobalStyle } from 'styled-components'
import background from "./background.jpg";
import { FaAdn } from "react-icons/fa";

function NewPage(){

  useEffect(()=>{alert("Loading")},[])

  return (
    <React.Fragment>
      <GlobalStyle/>
      <Container>
        <Title>
          <div><FaAdn/></div>
          <p>Congratulations!</p>
          <p>Your email has been registered.</p>
        </Title>
      </Container>
    </React.Fragment>
  )
}

export default NewPage;

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