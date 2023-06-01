import { ConnectWallet, Web3Button, useContract } from "@thirdweb-dev/react";
import type { NextPage } from "next";
import styles from "../styles/Home.module.css";
import { useState } from "react";
import { ThirdwebSDK } from "@thirdweb-dev/sdk/evm";


const Home: NextPage = () => {
  const contractAddress = "0xaDd9b7e30D7AA6620502754d51360796bC0ff3A6";
  const { contract } = useContract(contractAddress);
  const [counter, setCounter] = useState<string | undefined>(undefined);

  async function getCounter() {
    if (!contract) return;

    const counter = await contract.call("getCounter");
    setCounter(counter.toString());
  }

  getCounter();

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <ConnectWallet></ConnectWallet>
        <h1>Counter Dapp</h1>
        <h3>{counter}</h3>
        <Web3Button
        contractAddress={contractAddress}
        action={() => getCounter()}
        
        >Refresh Counter</Web3Button>
        <br />
        <Web3Button
        contractAddress={contractAddress}
        action={(contract) => contract.call("incrementCounter")}
        >Increment Counter</Web3Button>
      </main>
    </div>
  );
};

export default Home;
