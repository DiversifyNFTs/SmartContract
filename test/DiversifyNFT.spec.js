const { expect } = require("chai");
const { ethers } = require("hardhat");

let signers;
let diversifyNFT;

describe("DiversifyNFT", function () {
  beforeEach(async function () {
    signers = await ethers.getSigners();

    const DiversifyNFT = await ethers.getContractFactory("DiversifyNFT");
    diversifyNFT = await DiversifyNFT.deploy(signers[0].address);
  });

  it("should set the team address", async function () {
    expect(await diversifyNFT.team()).to.equals(signers[0].address);
  });
  it("should mint the NFT", async function () {
    await diversifyNFT.mint([[signers[1].address, "https://some-url.com"]]);
    expect(
      (await diversifyNFT.balanceOf(signers[1].address)).toString()
    ).to.equals("1");
  });

  it("should update the total supply", async function () {
    await diversifyNFT.mint([[signers[1].address, "https://some-url.com"]]);
    expect((await diversifyNFT.totalSupply()).toString()).to.equals("1");
  });

  it("should change the token URI", async function () {
    await diversifyNFT.mint([[signers[1].address, "https://some-url.com"]]);
    await diversifyNFT.changeTokenURI("1", "new-uri.com");
    expect(await diversifyNFT.tokenURI("1")).to.equals("new-uri.com");
  });
  it("should change the team address", async function () {
    await diversifyNFT.changeTeam(signers[1].address);
    await diversifyNFT.connect(signers[1]).acceptTeam();
    expect(await diversifyNFT.team()).to.equals(signers[1].address);
  });
});
