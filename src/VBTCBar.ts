import { DomNode, el } from "@hanul/skynode";
import { ethers } from "ethers";
import VirtualBitcoinContract from "./contracts/VirtualBitcoinContract";
import Wallet from "./ethereum/Wallet";

export default class VBTCBar extends DomNode {

    private vbtcAmount: DomNode;
    private description: DomNode | undefined;

    constructor() {
        super(".vbtc-bar");
        this.append(el("", "Your VBTC: ", this.vbtcAmount = el("span", "Loading...")));
        this.loadVBTCAmount();

        Wallet.on("connect", this.connectHandler);
        VirtualBitcoinContract.on("wrongNetwork", this.wrongNetworkHandler);
    }

    private connectHandler = () => {
        this.loadVBTCAmount();
    };

    private wrongNetworkHandler = () => {
        alert("Wrong Network");
    };

    private async loadVBTCAmount() {
        this.description?.delete();

        const owner = await Wallet.loadAddress();
        if (owner === undefined) {
            this.vbtcAmount.empty().appendText("Load failed.");
            this.append(this.description = el("p", "Please Connect. ", el("a", "Connect", {
                click: () => Wallet.connect(),
            })));
        } else {
            const amount = ethers.utils.formatUnits(await VirtualBitcoinContract.balanceOf(owner), VirtualBitcoinContract.decimals);
            this.vbtcAmount.empty().appendText(amount);
        }
    }

    public delete(): void {
        Wallet.off("connect", this.connectHandler);
        VirtualBitcoinContract.off("wrongNetwork", this.wrongNetworkHandler);
        super.delete();
    }
}
