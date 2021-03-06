const INFURA_ID = "96ce12f4a29c44699587732ebf110b75";

export default {

    // Kovan
    //chainId: 42,
    // Mainnet
    chainId: 1,

    infuraId: INFURA_ID,

    // Kovan
    //endpoint: `wss://kovan.infura.io/ws/v3/${INFURA_ID}`,
    //rpc: `https://kovan.infura.io/v3/${INFURA_ID}`,

    // Mainnet
    endpoint: `wss://mainnet.infura.io/ws/v3/${INFURA_ID}`,
    rpc: `https://mainnet.infura.io/v3/${INFURA_ID}`,

    contracts: {
        // Kovan
        //VirtualBitcoin: "0xfe6D468bB4DD530E0f5eE98b58e37e11DaAAaF31",
        // Mainnet
        VirtualBitcoin: "0x84e7ae4897b3847b67f212aff78bfbc5f700aa40",
    },
};
