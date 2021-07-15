import { BigNumber } from "@ethersproject/bignumber";
import SmartContract from "./SmartContract";
export interface PizzaStruct {
    owner: string;
    power: BigNumber;
    minedBlock: BigNumber;
    accSubsidy: BigNumber;
}
declare class VirtualBitcoinContract extends SmartContract {
    name: string;
    symbol: string;
    decimals: number;
    constructor();
    init(): Promise<void>;
    getTotalSupply(): Promise<BigNumber>;
    balanceOf(owner: string): Promise<BigNumber>;
    transfer(to: string, amount: BigNumber): Promise<boolean>;
    transferFrom(from: string, to: string, amount: BigNumber): Promise<boolean>;
    approve(spender: string, amount: BigNumber): Promise<boolean>;
    allowance(owner: string, spender: string): Promise<BigNumber>;
    getPizzaPrice(power: BigNumber): Promise<BigNumber>;
    getPizzaCount(): Promise<BigNumber>;
    getPizza(pizzaId: BigNumber): Promise<PizzaStruct>;
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