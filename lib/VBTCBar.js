"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const skynode_1 = require("@hanul/skynode");
const ethers_1 = require("ethers");
const Ethereum_1 = __importDefault(require("./ethereum/Ethereum"));
const VirtualBitcoinContract_1 = __importDefault(require("./ethereum/VirtualBitcoinContract"));
class VBTCBar extends skynode_1.DomNode {
    constructor() {
        super(".vbtc-bar");
        this.append(skynode_1.el("", "Your VBTC: ", this.vbtcAmount = skynode_1.el("span", "Loading...")));
        this.loadVBTCAmount();
    }
    async loadVBTCAmount() {
        var _a;
        (_a = this.description) === null || _a === void 0 ? void 0 : _a.delete();
        if (Ethereum_1.default.existsWeb3Provider !== true) {
            this.vbtcAmount.empty().appendText("Load failed.");
            this.append(this.description = skynode_1.el("p", "Cannot find Ethereum network provider. Please install ", skynode_1.el("a", "MetaMask", { href: "https://metamask.io/", target: "_blank" }), " or something."));
        }
        else {
            const web3Network = await Ethereum_1.default.getWeb3Network();
            if (web3Network.chainId !== 1) {
                this.vbtcAmount.empty().appendText("Load failed.");
                this.append(this.description = skynode_1.el("p", "Please Change Network to Ethereum Mainnet"));
            }
            else if (await Ethereum_1.default.connected() !== true) {
                this.vbtcAmount.empty().appendText("Load failed.");
                this.append(this.description = skynode_1.el("p", "Please Connect. ", skynode_1.el("a", "Connect", {
                    click: async () => {
                        await Ethereum_1.default.connect();
                        this.loadVBTCAmount();
                    },
                })));
            }
            else {
                const amount = ethers_1.ethers.utils.formatUnits(await VirtualBitcoinContract_1.default.balanceOf(Ethereum_1.default.accountAddress), VirtualBitcoinContract_1.default.decimals);
                this.vbtcAmount.empty().appendText(amount);
            }
        }
    }
}
exports.default = VBTCBar;
//# sourceMappingURL=VBTCBar.js.map