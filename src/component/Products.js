import { useCallback, useState } from "react";
import { Button, Col, Container, Row, Table } from "react-bootstrap";
import { initialProducts } from "./util/constants";
import styled from "styled-components";
import SearchBar from "./SearchBar";

export default function Products(props) {
  const [state, setState] = useState([...initialProducts]);

  const filterProducts = useCallback((text) => {
    setState(initialProducts.filter((prod) => prod.name.includes(text)));
  });

  const addProduct = useCallback(async () => {
    const name = window.prompt(`Enter the product name?`);
    if (!name) return;
    try {
      await props.supplyChain.methods
        .createProduct(name)
        .send({ from: props.web3.eth.defaultAccount, gas: 500000 });
      setState((state) => [
        ...state,
        { id: name, name: name, details: "extra product" },
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
      console.log("Products in Manufacture state are: ", prods);
      console.log("Here is the products: ", prods.map?.((product) => product.name));
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
              <TrackingButton disabled={!product.isTrackable}>
                Scan
              </TrackingButton>
            </Col>
          </Row>
        ))}
      </Table>
      <Button onClick={addProduct}>Add product</Button>
      <Button onClick={getProducts}>Get products in Manufacture</Button>
    </Container>
  );
}

const TrackingButton = styled.button`
  padding: 5 10;
  background: #11ff11;
`;
