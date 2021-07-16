const INFURA_ID = "96ce12f4a29c44699587732ebf110b75";

export default {

    chainId: 42,
    infuraId: INFURA_ID,

    // Kovan
    //rpc: `https://kovan.infura.io/v3/${INFURA_ID}`,
    // Mainnet
    rpc: `https://mainnet.infura.io/v3/${INFURA_ID}`,

    contracts: {
        // Kovan
        //VirtualBitcoin: "0xfe6D468bB4DD530E0f5eE98b58e37e11DaAAaF31",
        // Mainnet
        VirtualBitcoin: "0x84e7ae4897b3847b67f212aff78bfbc5f700aa40",
    },
};
