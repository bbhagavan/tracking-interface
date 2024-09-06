require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.24",
  defaultNetwork: "ganache",
  networks: {
    ganache: {
      url: "http://127.0.0.1:7545",
      accounts: ["0x235c7e18c97317ad06b9c0402465836268d4ac937f4513232fcadd8f32452080"]
    },
    hardhat: {
      chainId: 5777
    },
  },
};