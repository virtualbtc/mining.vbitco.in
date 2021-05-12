import { ethers } from "ethers";
import EventContainer from "eventcontainer";
declare class Ethereum extends EventContainer {
    provider: ethers.providers.WebSocketProvider;
    private ethereum;
    get existsWeb3Provider(): boolean;
    web3Provider: ethers.providers.Web3Provider;
    accountAddress: string;
    signer: ethers.providers.JsonRpcSigner;
    web3Signer: ethers.providers.JsonRpcSigner;
    constructor();
    getNetwork(): Promise<ethers.providers.Network>;
    getWeb3Network(): Promise<ethers.providers.Network>;
    connected(): Promise<boolean>;
    connect(): Promise<void>;
}
declare const _default: Ethereum;
export default _default;
//# sourceMappingURL=Ethereum.d.ts.map