require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.24",
  defaultNetwork: "ganache",
  networks: {
    ganache: {
      url: "http://127.0.0.1:7545",
      accounts: ["0x1c5a454d183568388a4eec9b9c4766e3e01d7f9f15fcb14c3961d2c402362926"]
    },
    hardhat: {
      chainId: 5777
    },
  },
};