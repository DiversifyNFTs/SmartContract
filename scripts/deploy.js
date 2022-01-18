const { ethers } = require("hardhat");

// ENTER TEAM ADDRESS BELOW;
const TEAM_ADDRESS = "0xee06986E54157FDF85cBa935d41fd47c27ab6F82";
/// ENTER TEAM ADDRESS ABOVE

async function main() {
  const DiversifyNFTMain = await ethers.getContractFactory("DiversifyNFT");
  const DiversifyNFTItem = await ethers.getContractFactory("DiversifyNFTItem");

  if (TEAM_ADDRESS.length != 0) {
    const diversifyNFTMain = await DiversifyNFTMain.deploy(TEAM_ADDRESS);
    const diversifyNFTItem = await DiversifyNFTItem.deploy(TEAM_ADDRESS);

    console.log(`🎉 DiversifyNFTMain Deployed to ${diversifyNFTMain.address}`);
    console.log(`🎉 DiversifyNFTItem Deployed to ${diversifyNFTItem.address}`);
  } else {
    console.log("🔴 Please add team address in the script");
  }
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
