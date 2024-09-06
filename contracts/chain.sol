pragma solidity ^0.8.0;

contract Chain {
    enum State { Manufacture, InTransit, Delivered }

    struct Product {
        uint id;
        string name;
        State state;
    }

    uint public productCount = 0;
    mapping(uint => Product) public products;

    event ProductStateChanged(uint indexed productId, State state);

    // Function to create a new product
    function createProduct(string memory _name) public returns (Product memory) {
        productCount++;
        products[productCount] = Product(productCount, _name, State.Manufacture);
        emit ProductStateChanged(productCount, State.Manufacture);
        return products[productCount];
    }

    // Function to move the product to the 'InTransit' state
    function moveToTransit(uint productId) public returns (Product memory) {
        require(products[productId].state == State.Manufacture, "Product must be in the 'Manufacture' state to move to 'Transit'.");
        products[productId].state = State.InTransit;
        emit ProductStateChanged(productId, State.InTransit);
        return products[productId];
    }

    function deliverProduct(uint productId) public {
        require(products[productId].state == State.InTransit, "Product must be in 'Transit' to be delivered.");
        products[productId].state = State.Delivered;
        emit ProductStateChanged(productId, State.Delivered);
    }

    function getProductState(uint productId) public view returns (State) {
        return products[productId].state;
    }

    function getProductsByState(State _state) public view returns (Product[] memory _products) {
        Product[] memory result = new Product[](productCount);
        uint counter = 0;

        for (uint i = 1; i <= productCount; i++) {
            if (products[i].state == _state) {
                result[counter] = products[i];
                counter++;
            }
        }

        Product[] memory finalResult = new Product[](counter);
        for (uint j = 0; j < counter; j++) {
            finalResult[j] = result[j];
        }

        return finalResult;
    }
}