"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bignumber_1 = require("@ethersproject/bignumber");
const skynode_1 = require("@hanul/skynode");
const ethers_1 = require("ethers");
const Ethereum_1 = __importDefault(require("./ethereum/Ethereum"));
const VirtualBitcoinContract_1 = __importDefault(require("./ethereum/VirtualBitcoinContract"));
const Pizza_1 = __importDefault(require("./Pizza"));
class PizzaList extends skynode_1.DomNode {
    constructor() {
        super(".pizza-list");
        this.onlyOwned = false;
        this.loadPizzaList();
    }
    async loadPizzaList() {
        this.empty().appendText("Loading...");
        if (Ethereum_1.default.existsWeb3Provider === true) {
            const web3Network = await Ethereum_1.default.getWeb3Network();
            if (web3Network.chainId === 1) {
                if (await Ethereum_1.default.connected() === true) {
                    const pizzaCount = (await VirtualBitcoinContract_1.default.getPizzaCount()).toNumber();
                    this.empty();
                    for (let pizzaId = pizzaCount - 1; pizzaId >= 0; pizzaId -= 1) {
                        const pizzaData = await VirtualBitcoinContract_1.default.getPizza(bignumber_1.BigNumber.from(pizzaId));
                        if ((this.onlyOwned !== true || pizzaData.owner === Ethereum_1.default.accountAddress) &&
                            pizzaData.owner !== ethers_1.ethers.constants.AddressZero) {
                            new Pizza_1.default(pizzaId, pizzaData).appendTo(this);
                        }
                    }
                }
            }
        }
    }
}
exports.default = PizzaList;
//# sourceMappingURL=PizzaList.js.map