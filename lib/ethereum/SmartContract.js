"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ethers_1 = require("ethers");
const eventcontainer_1 = __importDefault(require("eventcontainer"));
const Ethereum_1 = __importDefault(require("./Ethereum"));
class SmartContract extends eventcontainer_1.default {
    constructor(address, abi) {
        super();
        this.address = address;
        this.abi = abi;
    }
    async init(eventNames) {
        this.contract = new ethers_1.ethers.Contract(this.address, this.abi, Ethereum_1.default.provider).connect(Ethereum_1.default.signer);
        this.web3Contract = new ethers_1.ethers.Contract(this.address, this.abi, Ethereum_1.default.web3Provider).connect(Ethereum_1.default.web3Signer);
        for (const eventName of eventNames) {
            this.contract.on(eventName, (...args) => {
                this.fireEvent(eventName, ...args);
            });
        }
    }
}
exports.default = SmartContract;
//# sourceMappingURL=SmartContract.js.map