import { BigNumber } from "@ethersproject/bignumber";
import { DomNode } from "@hanul/skynode";
import { ethers } from "ethers";
import Ethereum from "./ethereum/Ethereum";
import VirtualBitcoinContract from "./ethereum/VirtualBitcoinContract";
import Pizza from "./Pizza";

export default class PizzaList extends DomNode {

    private onlyOwned = false;

    constructor() {
        super(".pizza-list");
        this.loadPizzaList();
    }

    private async loadPizzaList() {
        this.empty().appendText("Loading...");

        if (Ethereum.existsWeb3Provider === true) {
            const web3Network = await Ethereum.getWeb3Network();
            if (web3Network.chainId === 1 /*|| web3Network.chainId === 42*/) {
                if (await Ethereum.connected() === true) {

                    const pizzaCount = (await VirtualBitcoinContract.getPizzaCount()).toNumber();

                    this.empty();
                    for (let pizzaId = pizzaCount - 1; pizzaId >= 0; pizzaId -= 1) {
                        const pizzaData = await VirtualBitcoinContract.getPizza(BigNumber.from(pizzaId));
                        if (
                            (this.onlyOwned !== true || pizzaData.owner === Ethereum.accountAddress) &&
                            pizzaData.owner !== ethers.constants.AddressZero
                        ) {
                            new Pizza(pizzaId, pizzaData).appendTo(this);
                        }
                    }
                }
            }
        }
    }
}
