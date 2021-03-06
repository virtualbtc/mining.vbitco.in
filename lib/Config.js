"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const INFURA_ID = "96ce12f4a29c44699587732ebf110b75";
exports.default = {
    chainId: 1,
    infuraId: INFURA_ID,
    endpoint: `wss://mainnet.infura.io/ws/v3/${INFURA_ID}`,
    rpc: `https://mainnet.infura.io/v3/${INFURA_ID}`,
    contracts: {
        VirtualBitcoin: "0x84e7ae4897b3847b67f212aff78bfbc5f700aa40",
    },
};
//# sourceMappingURL=Config.js.map