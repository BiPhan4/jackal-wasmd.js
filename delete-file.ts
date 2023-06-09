import { DirectSecp256k1HdWallet, Registry } from "@cosmjs/proto-signing";
import { fromBase64, toHex, toUtf8 } from "@cosmjs/encoding";
import * as Constants from './helpers/constants';
import * as Interface from './helpers/interface';
import * as merkleHelpers from './utils/hash';

// Only supported for browser :(
import {
	FileIo,
	FolderHandler,
	GovHandler,
	RnsHandler,
	StorageHandler,
	AbciHandler,
	WalletHandler,
	OracleHandler
} from "jackal.js"

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
  myRegistry.register("/cosmwasm.wasm.v1.MsgExecuteContract", MsgExecuteContract);

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

      const fullMerkle = await merkleHelpers.MerklePath("s/pepe.jpg/")

      const account = await merkleHelpers.hashAndHex(Constants.myAddress)

      console.log("full merkle:", fullMerkle)
      console.log("account:", account)

      const deleteFileMsg: Interface.DeleteFileMsg = {
        delete_file: {
          hashpath: "c1be38d8ff41feafc9641d66418d71a2ab486e8c365de4cc7108f7e6c98f4758",
          account: account,

        }
      };

      const deleteFileMessage = Constants.generateExecuteMessage(
        Constants.myAddress,
        "jkl14hj2tavq8fpesdwxxcu44rty3hh90vhujrvcmstl4zr3txmfvw9scsc9nr", // hard coded contract address of the very first bindings contract we deploy
        JSON.stringify(deleteFileMsg),
      )

      const resp = await client.signAndBroadcast(Constants.myAddress, [deleteFileMessage], Constants.fee);
      console.log("execute post file result:", resp)

}

runAll()




