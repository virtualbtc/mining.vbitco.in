"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Config_1 = __importDefault(require("../Config"));
const SmartContract_1 = __importDefault(require("./SmartContract"));
class VirtualBitcoinContract extends SmartContract_1.default {
    constructor() {
        super(Config_1.default.VBTC_ADDRESS, require("./VirtualBitcoinContractABI.json"));
    }
    async init() {
        await super.init([
            "Transfer",
            "Approval",
            "BuyPizza",
            "ChangePizza",
            "SellPizza",
            "Mine",
        ]);
    }
    async getName() { return await this.contract.name(); }
    async getSymbol() { return await this.contract.symbol(); }
    async getDecimals() { return await this.contract.decimals(); }
    async getTotalSupply() { return await this.contract.totalSupply(); }
    async balanceOf(owner) {
        return await this.contract.balanceOf(owner);
    }
    async transfer(to, amount) {
        return await this.web3Contract.transfer(to, amount);
    }
    async transferFrom(from, to, amount) {
        return await this.web3Contract.transferFrom(from, to, amount);
    }
    async approve(spender, amount) {
        return await this.web3Contract.approve(spender, amount);
    }
    async allowance(owner, spender) {
        return await this.web3Contract.allowance(owner, spender);
    }
    async getPizzaPrice(power) { return await this.contract.pizzaPrice(power); }
    async buyPizza(power) {
        return await this.web3Contract.buyPizza(power);
    }
    async sellPizza(pizzaId) {
        return await this.web3Contract.sellPizza(pizzaId);
    }
    async changePizza(pizzaId, power) {
        return await this.web3Contract.changePizza(pizzaId, power);
    }
    async powerOf(pizzaId) { return await this.contract.powerOf(pizzaId); }
    async subsidyOf(pizzaId) { return await this.contract.subsidyOf(pizzaId); }
    async mine(pizzaId) {
        return await this.web3Contract.mine(pizzaId);
    }
}
exports.default = new VirtualBitcoinContract();
//# sourceMappingURL=VirtualBitcoinContract.js.map