import { BigNumber } from "@ethersproject/bignumber";
import { DomNode } from "@hanul/skynode";
import { ethers } from "ethers";
import VirtualBitcoinContract from "./contracts/VirtualBitcoinContract";
import Wallet from "./ethereum/Wallet";
import Pizza from "./Pizza";

export default class PizzaList extends DomNode {

    private onlyOwned = false;

    constructor() {
        super(".pizza-list");
        this.loadPizzaList();
    }

    private async loadPizzaList() {
        this.empty().appendText("Loading...");

        const owner = await Wallet.loadAddress();
        if (owner !== undefined) {

            const pizzaCount = (await VirtualBitcoinContract.getPizzaCount()).toNumber();

            this.empty();
            for (let pizzaId = pizzaCount - 1; pizzaId >= 0; pizzaId -= 1) {
                (async () => {
                    const pizzaData = await VirtualBitcoinContract.getPizza(BigNumber.from(pizzaId));
                    if (
                        (this.onlyOwned !== true || pizzaData.owner === owner) &&
                        pizzaData.owner !== ethers.constants.AddressZero
                    ) {
                        new Pizza(pizzaId, pizzaData).appendTo(this);
                    }
                })();
            }
        }
    }
}
