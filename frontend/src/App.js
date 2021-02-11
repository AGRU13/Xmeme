import './App.css';
import React,{ useState } from "react";
import Navbar from "./Components/Navbar";
import Container from "./Components/Container";

function App() {
  return (
    <React.Fragment>
      <Navbar/>
      <Container/>
    </React.Fragment>
  );
}

export default App;
