import { BigNumber } from "@ethersproject/bignumber";
import SmartContract from "./SmartContract";
declare class VirtualBitcoinContract extends SmartContract {
    constructor();
    init(): Promise<void>;
    getName(): Promise<string>;
    getSymbol(): Promise<string>;
    getDecimals(): Promise<number>;
    getTotalSupply(): Promise<BigNumber>;
    balanceOf(owner: string): Promise<BigNumber>;
    transfer(to: string, amount: BigNumber): Promise<boolean>;
    transferFrom(from: string, to: string, amount: BigNumber): Promise<boolean>;
    approve(spender: string, amount: BigNumber): Promise<boolean>;
    allowance(owner: string, spender: string): Promise<BigNumber>;
    getPizzaPrice(power: BigNumber): Promise<BigNumber>;
    buyPizza(power: BigNumber): Promise<BigNumber>;
    sellPizza(pizzaId: BigNumber): Promise<void>;
    changePizza(pizzaId: BigNumber, power: BigNumber): Promise<void>;
    powerOf(pizzaId: BigNumber): Promise<BigNumber>;
    subsidyOf(pizzaId: BigNumber): Promise<BigNumber>;
    mine(pizzaId: BigNumber): Promise<void>;
}
declare const _default: VirtualBitcoinContract;
export default _default;
//# sourceMappingURL=VirtualBitcoinContract.d.ts.map