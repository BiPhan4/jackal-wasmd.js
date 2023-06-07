import { DirectSecp256k1HdWallet, Registry } from "@cosmjs/proto-signing";
import { fromBase64, toHex, toUtf8 } from "@cosmjs/encoding";

import {
    defaultRegistryTypes as defaultStargateTypes,
    SigningStargateClient,
    StargateClient,
  } from "@cosmjs/stargate";
  import {
    MsgExecuteContract,
    MsgInstantiateContract,
  } from "cosmjs-types/cosmwasm/wasm/v1/tx";
  
export const fee = {
    amount: [
      {
        denom: "ujkl", // Use the appropriate fee denom for your chain
        amount: "12000000",
      },
    ],
    gas: "1000000",
  };

export const myAddress = "jkl1hj5fveer5cjtn4wd6wstzugjfdxzl0xpljur4u";

function generateInstantiateMessage(sender: string, codeId: number, label: string, msg: string) {
  return {
    typeUrl: "/cosmwasm.wasm.v1.MsgInstantiateContract",
    value: MsgInstantiateContract.fromPartial({
      sender: sender,
      codeId: codeId,
      label: label,
      msg: toUtf8(msg),
    }),
  };
}

function generateMakeRootMessage(sender: string, contractAddress: string, msg: string) {
  return {
    typeUrl: "/cosmwasm.wasm.v1.MsgExecuteContract",
    value: MsgExecuteContract.fromPartial({
      sender: sender,
      contract: contractAddress,
      msg: toUtf8(msg),
    }),
  };
}

export { generateInstantiateMessage, generateMakeRootMessage };
