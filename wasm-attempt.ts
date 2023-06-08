import { DirectSecp256k1HdWallet, Registry } from "@cosmjs/proto-signing";
import { fromBase64, toHex, toUtf8 } from "@cosmjs/encoding";
import * as Constants from './helpers/constants';
import * as Interface from './helpers/interface';
import * as merkleHelpers from './utils/hash';

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

      const instantiateMessage = generateInstantiateMessage(
        Constants.myAddress,
        1,
        "none",
        "{}",
      );

      const resp1 = await client.signAndBroadcast(Constants.myAddress, [instantiateMessage], Constants.fee);
      console.log("instantiate result:", resp1)

      const makeRootMsg: Interface.MakeRootMsg = {
        make_root: {
          creator: Constants.myAddress,
          editors: "from j1",
          viewers: "placeholder",
          trackingnumber: "placeholder"
        }
      };

      const rootMessage = Constants.generateExecuteMessage(
        Constants.myAddress,
        "jkl14hj2tavq8fpesdwxxcu44rty3hh90vhujrvcmstl4zr3txmfvw9scsc9nr", // hard coded contract address of the very first bindings contract we deploy
        JSON.stringify(makeRootMsg),
      )
      const resp2 = await client.signAndBroadcast(Constants.myAddress, [rootMessage], Constants.fee);
      console.log("execute make root result:", resp2)

      const fullMerkle = await WalletHandler.getAbitraryMerkle("s", "")

      const account = await merkleHelpers.hashAndHex(Constants.myAddress)
      const hashchild = await merkleHelpers.hashAndHex(Constants.myAddress)

      const postFileMsg: Interface.PostFileMsg = {
        post_file: {
          account:  account,
          hashparent: fullMerkle,
          hashchild: hashchild,
          contents: "",
          viewers: "",
          editors: "",
          trackingnumber: "",
        }
      };

      const postFileMessage = Constants.generateExecuteMessage(
        Constants.myAddress,
        "jkl14hj2tavq8fpesdwxxcu44rty3hh90vhujrvcmstl4zr3txmfvw9scsc9nr", // hard coded contract address of the very first bindings contract we deploy
        JSON.stringify(postFileMsg),
      )

      const resp3 = await client.signAndBroadcast(Constants.myAddress, [postFileMessage], Constants.fee);
      console.log("execute make root result:", resp3)

}

runAll()




