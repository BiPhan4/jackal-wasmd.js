import { DirectSecp256k1HdWallet, Registry } from "@cosmjs/proto-signing";
import { fromBase64, toHex, toUtf8 } from "@cosmjs/encoding";
import * as Constants from './helpers/constants';
import { generateInstantiateMessage } from './helpers/constants';


import {
    defaultRegistryTypes as defaultStargateTypes,
    SigningStargateClient,
    StargateClient,
  } from "@cosmjs/stargate";
  import {
    MsgExecuteContract,
    MsgInstantiateContract,
  } from "cosmjs-types/cosmwasm/wasm/v1/tx";

  const myRegistry = new Registry(defaultStargateTypes);
  myRegistry.register("/cosmwasm.wasm.v1.MsgInstantiateContract", MsgInstantiateContract); // Replace with your own type URL and Msg class

  const mnemonic = 
  "decorate bright ozone fork gallery riot bus exhaust worth way bone indoor calm squirrel merry zero scheme cotton until shop any excess stage laundry";


const runAll = async(): Promise<void> => {

    const signer = await DirectSecp256k1HdWallet.fromMnemonic(
        mnemonic,
        { prefix: "jkl" }, // Replace with your own Bech32 address prefix
      );
      const client = await SigningStargateClient.connectWithSigner(
        "http://localhost:26657/", // Replace with your own RPC endpoint
        signer,
        { registry: myRegistry },
      );

      const rootMessage = generateInstantiateMessage(
        "jkl1hj5fveer5cjtn4wd6wstzugjfdxzl0xpljur4u",
        1,
        "none",
        "{}",
      );

      const response = await client.signAndBroadcast(Constants.myAddress, [rootMessage], Constants.fee);
      console.log("instantiate result:", response)

}

runAll()




