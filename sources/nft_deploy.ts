import { Address, beginCell, toNano } from "ton-core";
import { NftCollection, storeRequestNftDeploy } from "./output/nft_NftCollection";
import { createOffchainContent } from "./helpers";
import { readFileSync } from "fs";
import { TonClient4, WalletContractV4, WalletContractV3R2 } from "ton";
import { mnemonicToWalletKey } from "ton-crypto"

(async () => {

    console.log("1");
    

    let mnemonics = readFileSync("./secret.txt").toString().split(",");
    console.log(mnemonics);
    
    let pair = await mnemonicToWalletKey(mnemonics);
    console.log("2");
    
    let client4 = new TonClient4({endpoint: "https://sandbox-v4.tonhubapi.com"});
    console.log("3");
    let wallet = client4.open(WalletContractV4.create({workchain:0, publicKey: pair.publicKey}));
    console.log("4");
    let collection = client4.open(NftCollection.fromAddress(Address.parse("EQDhsRw87Hwp2lDVw2rFbsOojLEUEAPNh2OBzB0oGNTzFRI5")));
    console.log("5");
    await collection.send(wallet.sender(pair.secretKey), {value: toNano("0.08")}, {$$type: 'RequestNftDeploy', index: 1n, amount: toNano("0.03"), content: createOffchainContent("https://raw.githubusercontent.com/iamrakki/Tact-NFT-Lesson7/main/nft_datas.json"), owner: wallet.address})
    console.log("6");

})();
console.log("7");
export function createNftDeployLink(collection: Address, owner: Address, amount:bigint, content: string, index: bigint){
    console.log("8");
    let message = createNftDeployMessage(owner, content, index)
    console.log("9");
    let link = `ton://transfer/${collection.toString()}?amount=${amount}&bin=${message.toBoc().toString('base64url')}`;
    console.log("10");
    console.log(link);
    console.log("11");
    
} 
console.log("12");

export function createNftDeployMessage(owner: Address, content: string, index: bigint, amount:bigint = toNano("0.03")){
    return beginCell().store(storeRequestNftDeploy({$$type: 'RequestNftDeploy', index, amount, content: createOffchainContent(content), owner})).endCell();
}
console.log("13");