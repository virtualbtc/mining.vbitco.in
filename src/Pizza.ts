import { DomNode, el, ResponsiveImage } from "@hanul/skynode";
import { BigNumber, ethers } from "ethers";
import VirtualBitcoinContract, { PizzaStruct } from "./contracts/VirtualBitcoinContract";
import Wallet from "./ethereum/Wallet";

export default class Pizza extends DomNode {

    private powerDisplay: DomNode | undefined;
    private subsidyDisplay: DomNode | undefined;

    constructor(
        private pizzaId: number,
        private data: PizzaStruct,
    ) {
        super(`.pizza${pizzaId === 0 ? ".genesis" : ""}`);
        this.load();
    }

    private async load() {

        const owner = await Wallet.loadAddress();

        this.append(
            this.pizzaId === 0 ? el(".genesis", "Genesis Pizza") : undefined,
            new ResponsiveImage("img.icon", "/images/mining-pizza.png"),
            el(".owner", "Owner: ", this.data.owner, this.data.owner === owner ? " (You!)" : ""),
            this.powerDisplay = el(".power", "Power: ", this.data.power.toString()),
            this.subsidyDisplay = el(".subsidy"),
            this.data.owner === owner ? el(".menu",
                el("a", "Mine", {
                    click: async () => {
                        await VirtualBitcoinContract.mine(BigNumber.from(this.pizzaId));
                    },
                }),
                el("a", "Change", {
                    click: async () => {
                        const power = prompt("Please enter power of Pizza to change.", String(this.data.power));
                        await VirtualBitcoinContract.changePizza(BigNumber.from(this.pizzaId), BigNumber.from(power));
                    },
                }),
                el("a", "Sell", {
                    click: async () => {
                        await VirtualBitcoinContract.sellPizza(BigNumber.from(this.pizzaId));
                    },
                }),
            ) : undefined,
        );

        const subsidy = await VirtualBitcoinContract.subsidyOf(BigNumber.from(this.pizzaId));
        this.subsidyDisplay.appendText(`Subsidy: ${ethers.utils.formatUnits(subsidy, VirtualBitcoinContract.decimals)}`);
    }
}
