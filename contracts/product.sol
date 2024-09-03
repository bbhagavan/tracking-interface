// pragma solidity ^0.8.0;

// contract Product {
//     struct Memo{
//         string name;
//         string message;
//         address from;
//         uint timestamp;
//     }

//     Memo[] memos;
//     address payable owner;

//     constructor(){
//         owner = payable(msg.sender);
//     }

//     function buyProduct(string calldata name, string calldata message) public {
//         require(msg.value > 0, "Please pay some money");
//         owner.transfer(msg.value);
//         memos.push(Memo(name, message, msg.sender, block.timestamp));
//     }

//     function getMemo() public view returns(Memo[] memory memo) {
//         return memos;
//     }
// }