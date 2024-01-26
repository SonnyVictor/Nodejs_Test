const ethers = require("ethers");
const { BigNumber } = require("ethers");
require('dotenv').config()

const ContractInvest = require("./ABIContractInvest.json");

function calculateGasFunction(value) {
    const numerator = value.mul(BigNumber.from(10000).add(BigNumber.from(1000)));
    const denominator = BigNumber.from(10000);
  
    return numerator.div(denominator);
}
const privateKey = process.env.PRIVATE_KEY_ADDRESS_CLAIM;

console.log(privateKey)
const intervalMinutes = 30;
const intervalMilliseconds = intervalMinutes * 60 * 1000;
const fnDistributeCoin = async () => {
  // Node RPC
  const provider = new ethers.providers.JsonRpcProvider("https://bsc-testnet.publicnode.com");
  //Contract Distribute token for 6 wallet
  const contractAddress = "0x24dead49891a97cFecd089F9F6513CC861ab8AA9";
  const contractAbi = ContractInvest;
  // PrivateKey of address Claim 
  // Public Address = 0xd4Ea99B44fD5adc3C9a888c7deB261788e1C0260
  const privateKey = (process.env.PRIVATE_KEY_ADDRESS_CLAIM).toString();
    // connect address to interact contract with nodejs 
  const wallet = privateKey ? new ethers.Wallet(privateKey, provider) : null;
  const contractDistribute = new ethers.Contract(contractAddress, contractAbi, wallet || provider);
  //interact contract with nodejs . 
  try {
    //caluelate Gas
    const gasPrice = await provider.getGasPrice();
    const gasEstimation = await contractDistribute.estimateGas.distributeCoin();
    const SignAddressDistributeCoin = await contractDistribute.distributeCoin({
        gasPrice:gasPrice,
        gasLimit: calculateGasFunction(gasEstimation),
    });
    await SignAddressDistributeCoin.wait()
    console.log("Success",SignAddressDistributeCoin)
  } catch (error) {
    console.error("Error:", error.message || error);

  }

};
fnDistributeCoin();
setInterval(fnDistributeCoin, intervalMilliseconds);
const fnDistributeToken = async (addressToken) => {
    // Node RPC
    const provider = new ethers.providers.JsonRpcProvider("https://bsc-testnet.nodereal.io/v1/752a9b9dd032492da8b585a548be07cf");
  
    //Contract Distribute token for 6 wallet
    const contractAddress = "0x24dead49891a97cFecd089F9F6513CC861ab8AA9";
    const contractAbi = ContractInvest;
  
    // PrivateKey of address Claim 
    // const privateKey = process.env.PRIVATE_KEY_ADDRESS_CLAIM;
    const privateKey = (process.env.PRIVATE_KEY_ADDRESS_CLAIM).toString();

  
  
    // connect address to interact contract with nodejs 
    const wallet = privateKey ? new ethers.Wallet(privateKey, provider) : null;
    const contractDistribute = new ethers.Contract(contractAddress, contractAbi, wallet || provider);
  
    //interact contract with nodejs . 
    try {
        const gasPrice = await provider.getGasPrice();
        const gasEstimation = await contractDistribute.estimateGas.distributeToken(addressToken);
        const SignAddressDistributeToken = await contractDistribute.distributeToken(addressToken,{
            gasPrice:gasPrice,
            gasLimit:calculateGasFunction(gasEstimation)
        });
        await SignAddressDistributeToken.wait();
        console.log("Success",SignAddressDistributeToken)        
    } catch (error) {
        console.error("Error:", error.message || error);

    }

};

const addressTokenUSDT = "0x55d398326f99059fF775485246999027B3197955"
const addressTokenTest ="0xc95E220F43094D2A464b60E7BAF538a636C511dc"
//  fnDistributeToken(addressTokenTest)

