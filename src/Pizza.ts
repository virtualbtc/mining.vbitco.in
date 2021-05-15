import { DomNode, el, ResponsiveImage } from "@hanul/skynode";
import { BigNumber, ethers } from "ethers";
import Ethereum from "./ethereum/Ethereum";
import VirtualBitcoinContract, { PizzaStruct } from "./ethereum/VirtualBitcoinContract";

export default class Pizza extends DomNode {

    private powerDisplay: DomNode;
    private subsidyDisplay: DomNode;

    constructor(
        private pizzaId: number,
        data: PizzaStruct,
    ) {
        super(".pizza");
        this.append(
            pizzaId === 0 ? el(".genesis", "Genesis Pizza") : undefined,
            new ResponsiveImage("img.icon", "/images/mining-pizza.png"),
            el(".owner", "Owner: ", data.owner),
            this.powerDisplay = el(".power", "Power: ", data.power.toString()),
            this.subsidyDisplay = el(".subsidy"),
            data.owner === Ethereum.accountAddress ? el(".menu",
                el("a", "Mine", {
                    click: async () => {
                        await VirtualBitcoinContract.mine(BigNumber.from(this.pizzaId));
                    },
                }),
                el("a", "Change", {
                    click: async () => {
                        const power = prompt("Please enter power of Pizza to change.", String(data.power));
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
        this.loadSubsidy();
    }

    private async loadSubsidy() {
        const subsidy = await VirtualBitcoinContract.subsidyOf(BigNumber.from(this.pizzaId));
        this.subsidyDisplay.appendText(`Subsidy: ${ethers.utils.formatUnits(subsidy, VirtualBitcoinContract.decimals)}`);
    }
}
