import { useCallback, useEffect, useState } from "react";
import { Button, Col, Container, Row, Table } from "react-bootstrap";
import { initialProducts } from "./util/constants";
import styled from "styled-components";
import SearchBar from "./SearchBar";

export default function Products(props) {
  const [state, setState] = useState([...initialProducts]);

  useEffect(() => {
    getProducts().then((res) => {
      console.log("productsFromChain", res);
      const productsFromChain = res.map?.(prod => ({
        id: prod.id, name: prod.name, state: prod.state, details: "Default Product details", isTrackable: true
      }));
      setState(state => ([...state, ...productsFromChain]));
    }).catch((err) => console.error("Error in getting products form block chain!!!"));
    
  }, [])

  const filterProducts = useCallback((text) => {
    setState(initialProducts.filter((prod) => prod.name.includes(text)));
  });

  const addProduct = useCallback(async () => {
    const name = window.prompt(`Enter the product name?`);
    if (!name) return;
    try {
      const prod = await props.supplyChain.methods
        .createProduct(name)
        .call();
        
      console.log("Product is: ", prod.name, prod.id, prod);
      setState((state) => [
        ...state,
        { id: prod.id, name: name, details: "extra product", isTrackable: true, state: 0 },
      ]);
    } catch (error) {
      if (error.code === 4001) {
        console.error("User denied transaction signature.");
      } else {
        console.error("Error Adding product:", error);
      }
    }
  }, [props]);

  const getProducts = useCallback(async () => {
    const ManufactureState = 0;
    try {
      const prods = await props.supplyChain.methods
        .getProductsByState(ManufactureState)
        .call();
        // .send({ from: props.web3.eth.defaultAccount, gas: 500000 });
      console.log("Products in Manufacture state are: ", prods);
      console.log("Here is the products: ", prods.map?.((product) => ({state: product.state, name: product.name})));
      return prods;
    } catch (error) {
      console.error("Error getting products:", error);
    }
  }, [props]);

  const getProductsInTransit = useCallback(async () => {
    const InTransit = 1;
    try {
      const prods = await props.supplyChain.methods
        .getProductsByState(InTransit)
        .call();
        // .send({ from: props.web3.eth.defaultAccount, gas: 500000 });
      console.log("Products in Transit state are: ", prods);
      console.log("Here are the products: ", prods.map?.((product) => ({state: product.state, name: product.name})));
      return prods;
    } catch (error) {
      console.error("Error getting products:", error);
    }
  }, [props]);

  const transferProductToTransit = useCallback(async (product) => {
    try {
      const prods = await props.supplyChain.methods
        .moveToTransit(product.id)
        .call();
        // .send({ from: props.web3.eth.defaultAccount, gas: 500000 });
      setState((state) => state.map(prod => {
          if(prod.id == product.id) {
            return ({ ...prod, state: 1 })
          }
          return prod;
        })
      );
      console.log("Products with id:" + product.id +" is transferred!!", product);
    } catch (error) {
      console.error("Error getting products:", error);
    }
  }, [props]);

  return (
    <Container>
      <SearchBar search={filterProducts} />
      <Table>
        <Row class={'font-weight-bold'}>
          <Col>Name</Col>
          <Col>Details</Col>
          <Col>Track</Col>
        </Row>
        {state?.map?.((product) => (
          <Row key={product.id}>
            <Col>{product.name}</Col>
            <Col>{product.details}</Col>
            <Col>
              <TrackingButton onClick={() => transferProductToTransit(product)} disabled={!product.isTrackable}>
                Transfer
              </TrackingButton>
            </Col>
          </Row>
        ))}
      </Table>
      <Button onClick={addProduct}>Add product</Button>
      <Button onClick={getProducts}>Get products in Manufacture</Button>
      <Button onClick={getProductsInTransit}>Get products in Transit</Button>
    </Container>
  );
}

const TrackingButton = styled.button`
  padding: 5 10;
  background: #11ff11;
`;
