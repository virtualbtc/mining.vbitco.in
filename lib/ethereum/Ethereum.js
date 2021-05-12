"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ethers_1 = require("ethers");
const eventcontainer_1 = __importDefault(require("eventcontainer"));
const Config_1 = __importDefault(require("../Config"));
const VirtualBitcoinContract_1 = __importDefault(require("./VirtualBitcoinContract"));
class Ethereum extends eventcontainer_1.default {
    constructor() {
        super();
        this.provider = new ethers_1.ethers.providers.WebSocketProvider(Config_1.default.PROVIDER_URL);
        this.ethereum = window.ethereum;
        if (this.existsWeb3Provider === true) {
            this.web3Provider = new ethers_1.ethers.providers.Web3Provider(this.ethereum);
            this.ethereum.on("chainChanged", () => {
                location.reload();
            });
        }
    }
    get existsWeb3Provider() { return this.ethereum !== undefined; }
    async getNetwork() { return await this.provider.getNetwork(); }
    async getWeb3Network() { return await this.web3Provider.getNetwork(); }
    async connected() {
        this.accountAddress = (await this.web3Provider.listAccounts())[0];
        if (this.accountAddress !== undefined) {
            this.signer = this.provider.getSigner(this.accountAddress);
            this.web3Signer = this.web3Provider.getSigner();
            VirtualBitcoinContract_1.default.init();
            return true;
        }
        return false;
    }
    async connect() {
        await this.ethereum.request({ method: "eth_requestAccounts" });
    }
}
exports.default = new Ethereum();
//# sourceMappingURL=Ethereum.js.map