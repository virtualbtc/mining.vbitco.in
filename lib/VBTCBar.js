"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const skynode_1 = require("@hanul/skynode");
const ethers_1 = require("ethers");
const VirtualBitcoinContract_1 = __importDefault(require("./contracts/VirtualBitcoinContract"));
const Wallet_1 = __importDefault(require("./ethereum/Wallet"));
class VBTCBar extends skynode_1.DomNode {
    constructor() {
        super(".vbtc-bar");
        this.connectHandler = () => {
            this.loadVBTCAmount();
        };
        this.wrongNetworkHandler = () => {
            alert("Wrong Network");
        };
        this.append(skynode_1.el("", "Your VBTC: ", this.vbtcAmount = skynode_1.el("span", "Loading...")));
        this.loadVBTCAmount();
        Wallet_1.default.on("connect", this.connectHandler);
        VirtualBitcoinContract_1.default.on("wrongNetwork", this.wrongNetworkHandler);
    }
    async loadVBTCAmount() {
        var _a;
        (_a = this.description) === null || _a === void 0 ? void 0 : _a.delete();
        const owner = await Wallet_1.default.loadAddress();
        if (owner === undefined) {
            this.vbtcAmount.empty().appendText("Load failed.");
            this.append(this.description = skynode_1.el("p", "Please Connect. ", skynode_1.el("a", "Connect", {
                click: () => Wallet_1.default.connect(),
            })));
        }
        else {
            const amount = ethers_1.ethers.utils.formatUnits(await VirtualBitcoinContract_1.default.balanceOf(owner), VirtualBitcoinContract_1.default.decimals);
            this.vbtcAmount.empty().appendText(amount);
        }
    }
    delete() {
        Wallet_1.default.off("connect", this.connectHandler);
        VirtualBitcoinContract_1.default.off("wrongNetwork", this.wrongNetworkHandler);
        super.delete();
    }
}
exports.default = VBTCBar;
//# sourceMappingURL=VBTCBar.js.map