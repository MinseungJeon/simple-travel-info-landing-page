import React from 'react';
import styled from "styled-components";
import { createGlobalStyle } from 'styled-components'
import background from "./background.jpg";
import { FaAdn } from "react-icons/fa";

function App() {
  return (
    <React.Fragment>
      <GlobalStyle/>
      <Container>
        <Title>
          <p>My Trip</p>
          <div><FaAdn/></div>
        </Title>
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