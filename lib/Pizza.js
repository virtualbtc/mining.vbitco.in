"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const skynode_1 = require("@hanul/skynode");
const ethers_1 = require("ethers");
const VirtualBitcoinContract_1 = __importDefault(require("./contracts/VirtualBitcoinContract"));
const Wallet_1 = __importDefault(require("./ethereum/Wallet"));
class Pizza extends skynode_1.DomNode {
    constructor(pizzaId, data) {
        super(`.pizza${pizzaId === 0 ? ".genesis" : ""}`);
        this.pizzaId = pizzaId;
        this.data = data;
        this.load();
    }
    async load() {
        const owner = await Wallet_1.default.loadAddress();
        this.append(this.pizzaId === 0 ? skynode_1.el(".genesis", "Genesis Pizza") : undefined, new skynode_1.ResponsiveImage("img.icon", "/images/mining-pizza.png"), skynode_1.el(".owner", "Owner: ", this.data.owner, this.data.owner === owner ? " (You!)" : ""), this.powerDisplay = skynode_1.el(".power", "Power: ", this.data.power.toString()), this.subsidyDisplay = skynode_1.el(".subsidy"), this.data.owner === owner ? skynode_1.el(".menu", skynode_1.el("a", "Mine", {
            click: async () => {
                await VirtualBitcoinContract_1.default.mine(ethers_1.BigNumber.from(this.pizzaId));
            },
        }), skynode_1.el("a", "Change", {
            click: async () => {
                const power = prompt("Please enter power of Pizza to change.", String(this.data.power));
                await VirtualBitcoinContract_1.default.changePizza(ethers_1.BigNumber.from(this.pizzaId), ethers_1.BigNumber.from(power));
            },
        }), skynode_1.el("a", "Sell", {
            click: async () => {
                await VirtualBitcoinContract_1.default.sellPizza(ethers_1.BigNumber.from(this.pizzaId));
            },
        })) : undefined);
        const subsidy = await VirtualBitcoinContract_1.default.subsidyOf(ethers_1.BigNumber.from(this.pizzaId));
        this.subsidyDisplay.appendText(`Subsidy: ${ethers_1.ethers.utils.formatUnits(subsidy, VirtualBitcoinContract_1.default.decimals)}`);
    }
}
exports.default = Pizza;
//# sourceMappingURL=Pizza.js.map