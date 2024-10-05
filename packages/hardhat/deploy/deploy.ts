import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import { Contract } from "ethers";

/**
 * Deploys a contract named "StoreFraction" using the deployer account
 *
 * @param hre HardhatRuntimeEnvironment object.
 */
const deployYourContract: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployer } = await hre.getNamedAccounts(); // Get deployer account
  const { deploy, log } = hre.deployments; // Deploy contract and log output

  // Deploy the "StoreFraction" contract
  await deploy("StoreFraction", {
    from: deployer,
    args: [], // Pass constructor arguments if needed (none in this case)
    log: true,
    autoMine: true, // Automatically mine on local networks
  });

  // Get the deployed contract instance to interact with it
  const storeFractionContract: Contract = await hre.ethers.getContract("StoreFraction", deployer);

  log("✅ Contract deployed at:", storeFractionContract.address);

  // If the contract hasa any functions to interact with, add them here.
  // For example, to call any function (e.g., getStoreDetails if such a function exists):
  try {
    // Example interaction - adjust according to your contract's actual functions
    const details = await storeFractionContract.getStoreDetails(1);
    log("🏪 Store 1 details:", details);
  } catch (error) {
    log("⚠️ No getStoreDetails function found in StoreFraction.");
  }
};

export default deployYourContract;

deployYourContract.tags = ["StoreFraction"];
