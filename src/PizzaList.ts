import { BigNumber } from "@ethersproject/bignumber";
import { DomNode } from "@hanul/skynode";
import { ethers } from "ethers";
import VirtualBitcoinContract from "./contracts/VirtualBitcoinContract";
import Wallet from "./ethereum/Wallet";
import Pizza from "./Pizza";

export default class PizzaList extends DomNode {

    private onlyOwned = false;
    private loadCount = 0;

    constructor() {
        super(".pizza-list");
        this.loadPizzaList();

        Wallet.on("connect", this.connectHandler);
    }

    private connectHandler = () => {
        this.loadPizzaList();
    };

    private async loadPizzaList() {
        this.loadCount += 1;
        const currentLoadCount = this.loadCount;

        this.empty().appendText("Loading...");

        const owner = await Wallet.loadAddress();
        if (owner !== undefined) {

            const pizzaCount = (await VirtualBitcoinContract.getPizzaCount()).toNumber();

            this.empty();
            for (let pizzaId = pizzaCount - 1; pizzaId >= 0; pizzaId -= 1) {
                const pizzaData = await VirtualBitcoinContract.getPizza(BigNumber.from(pizzaId));

                if (this.loadCount !== currentLoadCount) {
                    break;
                }

                if (
                    (this.onlyOwned !== true || pizzaData.owner === owner) &&
                    pizzaData.owner !== ethers.constants.AddressZero
                ) {
                    new Pizza(pizzaId, pizzaData).appendTo(this);
                }
            }
        }
    }

    public delete(): void {
        Wallet.off("connect", this.connectHandler);
        super.delete();
    }
}
