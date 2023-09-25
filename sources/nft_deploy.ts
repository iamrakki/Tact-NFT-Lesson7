import { Address, beginCell, toNano } from "ton-core";
import { storeRequestNftDeploy } from "./output/nft_NftCollection";
import { createOffchainContent } from "./helpers";

(async () => {
    createNftDeployLink(Address.parse("EQDhsRw87Hwp2lDVw2rFbsOojLEUEAPNh2OBzB0oGNTzFRI5"),Address.parse('EQDCWAnbip-FJlr71gJKgAVTznR-J_iDW-djThXp43q5qdXw'), toNano("0.06"),"https://raw.githubusercontent.com/iamrakki/Tact-NFT-Lesson7/main/nft_datas.json",0n)

})();

export function createNftDeployLink(collection: Address, owner: Address, amount:bigint, content: string, index: bigint){

    let message = createNftDeployMessage(owner, content, index)

    let link = `ton://transfer/${collection.toString()}?amount=${amount}&bin=${message.toBoc().toString('base64url')}`;
    console.log(link);
    
} 

export function createNftDeployMessage(owner: Address, content: string, index: bigint, amount:bigint = toNano("0.03")){
    return beginCell().store(storeRequestNftDeploy({$$type: 'RequestNftDeploy', index, amount, content: createOffchainContent(content), owner})).endCell();
}