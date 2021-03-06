"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bignumber_1 = require("@ethersproject/bignumber");
const skynode_1 = require("@hanul/skynode");
const VirtualBitcoinContract_1 = __importDefault(require("./contracts/VirtualBitcoinContract"));
const PizzaList_1 = __importDefault(require("./PizzaList"));
const VBTCBar_1 = __importDefault(require("./VBTCBar"));
const main = new skynode_1.DomNode(document.querySelector("main"));
main.append(new VBTCBar_1.default(), skynode_1.el(".pizza-price", "1 Pizza = 10,000 VBTC"), skynode_1.el(".menu", skynode_1.el("a", "Buy Pizza", {
    click: async () => {
        const power = prompt("Please enter power of Pizza.", String(1));
        if (power !== null) {
            await VirtualBitcoinContract_1.default.buyPizza(bignumber_1.BigNumber.from(power));
        }
    },
})), new PizzaList_1.default());
//# sourceMappingURL=main.js.map