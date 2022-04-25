import { Container } from '@material-ui/core';
import React from 'react';
import './App.css';
import MainRouter from './MainRouter';


function App() {
  return (
    <Container
    fixed 
    style={{backgroundColor:"#ccc",
            top:"0px",
            left:"0px",
            overflow:"auto",
            minWidth:"100%",
            height: '100vh',
            margin:'0',
            backgroundColor:'#a2c3c8',
            }}>
      <MainRouter />
    </Container>
  );
}

export default App;
