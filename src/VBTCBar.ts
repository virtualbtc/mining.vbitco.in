import { DomNode, el } from "@hanul/skynode";
import { ethers } from "ethers";
import Ethereum from "./ethereum/Ethereum";
import VirtualBitcoinContract from "./ethereum/VirtualBitcoinContract";

export default class VBTCBar extends DomNode {

    private vbtcAmount: DomNode;
    private description: DomNode | undefined;

    constructor() {
        super(".vbtc-bar");
        this.append(el("", "Your VBTC: ", this.vbtcAmount = el("span", "Loading...")));
        this.loadVBTCAmount();
    }

    private async loadVBTCAmount() {
        this.description?.delete();
        if (Ethereum.existsWeb3Provider !== true) {
            this.vbtcAmount.empty().appendText("Load failed.");
            this.append(this.description = el("p", "Cannot find Ethereum network provider. Please install ", el("a", "MetaMask", { href: "https://metamask.io/", target: "_blank" }), " or something."));
        } else {
            const web3Network = await Ethereum.getWeb3Network();
            if (web3Network.chainId === 1 /*|| web3Network.chainId === 42*/) {
                this.vbtcAmount.empty().appendText("Load failed.");
                this.append(this.description = el("p", "Please Change Network to Ethereum Mainnet"));
            } else if (await Ethereum.connected() !== true) {
                this.vbtcAmount.empty().appendText("Load failed.");
                this.append(this.description = el("p", "Please Connect. ", el("a", "Connect", {
                    click: async () => {
                        await Ethereum.connect();
                        this.loadVBTCAmount();
                    },
                })));
            } else {
                const amount = ethers.utils.formatUnits(await VirtualBitcoinContract.balanceOf(Ethereum.accountAddress), VirtualBitcoinContract.decimals);
                this.vbtcAmount.empty().appendText(amount);
            }
        }
    }
}
