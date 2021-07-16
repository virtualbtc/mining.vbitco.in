"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bignumber_1 = require("@ethersproject/bignumber");
const skynode_1 = require("@hanul/skynode");
const ethers_1 = require("ethers");
const VirtualBitcoinContract_1 = __importDefault(require("./contracts/VirtualBitcoinContract"));
const Wallet_1 = __importDefault(require("./ethereum/Wallet"));
const Pizza_1 = __importDefault(require("./Pizza"));
class PizzaList extends skynode_1.DomNode {
    constructor() {
        super(".pizza-list");
        this.onlyOwned = false;
        this.loadCount = 0;
        this.connectHandler = () => {
            this.loadPizzaList();
        };
        this.loadPizzaList();
        Wallet_1.default.on("connect", this.connectHandler);
    }
    async loadPizzaList() {
        this.loadCount += 1;
        const currentLoadCount = this.loadCount;
        this.empty().appendText("Loading...");
        const owner = await Wallet_1.default.loadAddress();
        if (owner !== undefined) {
            const pizzaCount = (await VirtualBitcoinContract_1.default.getPizzaCount()).toNumber();
            this.empty();
            for (let pizzaId = pizzaCount - 1; pizzaId >= 0; pizzaId -= 1) {
                (async () => {
                    const pizzaData = await VirtualBitcoinContract_1.default.getPizza(bignumber_1.BigNumber.from(pizzaId));
                    if (this.loadCount === currentLoadCount &&
                        (this.onlyOwned !== true || pizzaData.owner === owner) &&
                        pizzaData.owner !== ethers_1.ethers.constants.AddressZero) {
                        new Pizza_1.default(pizzaId, pizzaData).appendTo(this);
                    }
                })();
            }
        }
    }
    delete() {
        Wallet_1.default.off("connect", this.connectHandler);
        super.delete();
    }
}
exports.default = PizzaList;
//# sourceMappingURL=PizzaList.js.map