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
import { constants } from "buffer";

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

      const buyStorageMsg: Interface.BuyStorageMsg = {
        buy_storage: {
          foraddress: Constants.myAddress,
          duration: "720h",
          bytes: "1000000000000",
          paymentdenom: "ujkl", 

        }
      };

      const buyStorageMessage = Constants.generateExecuteMessage(
        Constants.myAddress,
        "jkl14hj2tavq8fpesdwxxcu44rty3hh90vhujrvcmstl4zr3txmfvw9scsc9nr", // hard coded contract address of the very first bindings contract we deploy
        JSON.stringify(buyStorageMsg),
      )

      const resp = await client.signAndBroadcast(Constants.myAddress, [buyStorageMessage], Constants.fee);
      console.log("execute post file result:", resp)

}

runAll()




