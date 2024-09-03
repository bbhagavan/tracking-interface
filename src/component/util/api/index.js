import { Network, Alchemy } from 'alchemy-sdk';

const settings = {
  apiKey: "9KitLQkaE-RnBQXgmIAESOYwn9Zuct8O",
  network: Network.ETH_MAINNET,
};

const alchemy = new Alchemy(settings);

// get all the sent transactions from given address
export const sentTransactions = () => {
    console.log("sending call to blockchain");
    
    alchemy.core.getAssetTransfers({
  fromBlock: "0x0",
  fromAddress: "0x994b342dd87fc825f66e51ffa3ef71ad818b6893",
  category: ["erc721", "external", "erc20"],
}).then((res) => console.log(res));

}

export function getAllProducts() {
    return 
}