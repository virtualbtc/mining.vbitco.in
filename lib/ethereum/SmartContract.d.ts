import { ethers } from "ethers";
import EventContainer from "eventcontainer";
export default abstract class SmartContract extends EventContainer {
    private address;
    private abi;
    protected contract: ethers.Contract;
    protected web3Contract: ethers.Contract;
    constructor(address: string, abi: any);
    init(eventNames: string[]): Promise<void>;
}
//# sourceMappingURL=SmartContract.d.ts.map