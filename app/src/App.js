import { ethers } from "ethers";
import { useEffect, useState } from "react";
import deploy from "./deploy";
import { NewContract } from "./components/NewContract";
import { ExistingContract } from "./components/ExistingContract";

const provider = new ethers.providers.Web3Provider(window.ethereum);

export async function approve(escrowContract, signer) {
  return await escrowContract.connect(signer).approve();
}

function App() {
  const [escrows, setEscrows] = useState([]);
  const [account, setAccount] = useState();
  const [signer, setSigner] = useState();
  const [loadingDeploy, setLoadingDeploy] = useState(false);

  useEffect(() => {
    async function getAccounts() {
      const accounts = await provider.send("eth_requestAccounts", []);

      setAccount(accounts[0]);
      setSigner(provider.getSigner());
    }

    getAccounts();
  }, [account]);

  async function handleDeploy({ beneficiary, arbiter, value }) {
    try {
      setLoadingDeploy(true);
      const valueParseEther = ethers.utils.parseEther(value);
      const escrowContract = await deploy(
        signer,
        arbiter,
        beneficiary,
        valueParseEther
      );

      await escrowContract.deployed();

      const escrow = {
        address: escrowContract.address,
        arbiter,
        beneficiary,
        value: value.toString(),
        buttonName: "Approve",
        complete: false,
        handleApprove: async () => {
          try {
            escrowContract.on("Approved", () => {
              document.getElementById(escrowContract.address).className =
                "complete";
              document.getElementById(escrowContract.address).innerText =
                "✓ It's been approved!";
            });

            await approve(escrowContract, signer);
          } catch (error) {
            console.log("Approve error: ", error);
          }
        },
      };

      setEscrows([...escrows, escrow]);
    } catch (error) {
      console.log("Deploy Error: ", error);
    } finally {
      setLoadingDeploy(false);
    }
  }

  return (
    <>
      <NewContract deploy={handleDeploy} loading={loadingDeploy} />
      <ExistingContract escrows={escrows} />
    </>
  );
}

export default App;
