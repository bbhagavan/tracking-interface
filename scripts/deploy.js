const hre = require("hardhat");

async function main() {
    const [deployer] = await hre.ethers.getSigners();
    console.log("Deploying contracts with the account:", deployer.address);

    const SupplyChain = await hre.ethers.getContractFactory("Chain");
    const chain = await SupplyChain.deploy();

    console.log("Chain contract deployed to address:", chain.target);

    const fs = require('fs');
    const artifacts = await hre.artifacts.readArtifact("Chain");

    const deploymentInfo = {
      address: chain.target,
      abi: artifacts.abi,
      networkId: await hre.ethers.provider.getNetwork().chainId,
    };

    fs.writeFileSync('deployment.json', JSON.stringify(deploymentInfo, null, 2));
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });