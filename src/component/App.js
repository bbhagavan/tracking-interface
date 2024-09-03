import React, { useCallback, useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Routes,
} from "react-router-dom";
import styled from "styled-components";
import NavigationBar from "./NavigationBar";
import Home from "./Home";
import LoginPage from "./LoginPage";
import AddProduct from "./AddProduct";
import Footer from "./Footer";
import ErrorPage from "./ErrorPageForAddition";
import Products from "./Products";
import { sentTransactions } from "./util/api";
import Web3 from "web3";

const StyledComponent = styled.div`
  text-align: center;
`;
const Button = styled.button`
  padding: 0 10px;
  margin: 10px;
  background-color: black;
  color: white;
`;

export default function App(props) {
  const [supplyChain, setSupplyChain] = useState(null);
  const [web3, setWeb3] = useState(null);

  useEffect(() => {
    const initialize = async () => {
      console.log("Initializing...");

      let web3Obj;
      // if (window.ethereum) {
      //   web3Obj = new Web3(window.ethereum);
      //   try {
      //       await window.ethereum.enable();
      //   } catch (error) {
      //     console.error("User denied account access");
      //   }
      // } else {
        web3Obj = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:7545"));
      // }
      const supplyChainArtifact = await fetch("./Chain.json");
      const supplyChainJson = await supplyChainArtifact.json();

    const networkId = await web3Obj.eth.net.getId();
    
    console.log("Network id, ", networkId);
    console.log("Json: ", supplyChainJson);
    
    // const deployedNetwork = supplyChainJson.networks[networkId];
      
      setSupplyChain(
        new web3Obj.eth.Contract(
            supplyChainJson.abi,
            '0x81E2A73583AC399F71243A5D164213A8F5776e97'
        )
      );

      web3Obj.eth.defaultAccount = (await web3Obj.eth.getAccounts())[0];

      setWeb3(web3Obj);      
      sentTransactions();
    };
    initialize();
  }, []);

  if (!web3 || !supplyChain) {
    return <div>Loading Web3, accounts, and contract...</div>;
  }

  return (
    <Router>
      <StyledComponent>
        <NavigationBar />
        <Container>
          <Routes>
            <Route path="/" exact element={<Home />} />
            <Route path="/login" exact element={<LoginPage />} />
            <Route
              path="/products"
              exact
              element={<Products supplyChain={supplyChain} web3={web3} />}
            />
            {localStorage.getItem("token") ? (
              <>
                <Route path="/addition" exact element={<AddProduct />} />
              </>
            ) : (
              <Route path="/addition" exact element={<ErrorPage />} />
            )}
          </Routes>
        </Container>
        <Footer />
      </StyledComponent>
    </Router>
  );
  // (
  //     <div className="component-app">
  //       Some text to display
  //       <h1>Some header</h1>
  //       <div>
  //         <span>
  //           <Button onClick={() => onClick(state - 1)}>-</Button>
  //         </span>
  //         <span>Now the count is: {state}</span>
  //         <span>
  //           <Button onClick={() => onClick(state + 1)}>+</Button>
  //         </span>
  //       </div>
  //       {state > 10 && (
  //         <div>
  //           <h2>Max count has been reached</h2>
  //         </div>
  //       )}
  //     </div>
  //   );
}
