// delay between tx's in minutes
export const TX_DELAY = {
    min: 1,
    max: 5,
};

// delay between wallets in minutes
export const WALLET_DELAY = {
    min: 20,
    max: 60,
};

// comment needless network
// minTransfer amount in native token
export const NETWORK_DATA = [
    // {
    //     network: 'Optimism',
    //     rpc: ['https://1rpc.io/op', 'https://optimism.drpc.org', 'https://rpc.ankr.com/optimism'],
    //     minTransfer: 0.0000263,
    // },
    // {
    //     network: 'Arbitrum',
    //     rpc: ['https://arbitrum.meowrpc.com', 'https://1rpc.io/arb', 'https://arbitrum.drpc.org'],
    //     minTransfer: 0.0000263,
    // },
    // {
    //     network: 'Fantom',
    //     rpc: ['https://1rpc.io/ftm', 'https://fantom.drpc.org', 'https://rpc.ankr.com/fantom'],
    //     minTransfer: 0.122,
    // },
    {
        network: 'Celo',
        rpc: ['https://rpc.ankr.com/celo', 'https://1rpc.io/celo', 'https://celo.drpc.org'],
        minTransfer: 0.118,
    },
    // {
    //     network: 'Polygon',
    //     rpc: ['https://polygon.meowrpc.com', 'https://polygon.drpc.org', 'https://1rpc.io/matic'],
    //     minTransfer: 0.136,
    // },
    // {
    //     network: 'Moonbeam',
    //     rpc: [
    //         'https://moonbeam.public.blastapi.io',
    //         'https://1rpc.io/glmr',
    //         'https://moonbeam.drpc.org',
    //     ],
    //     minTransfer: 0.343,
    // },
    // {
    //     network: 'Moonriver',
    //     rpc: [
    //         'https://moonriver.drpc.org',
    //         'https://kava-evm-rpc.publicnode.com',
    //         'https://moonriver.public.blastapi.io',
    //     ],
    //     minTransfer: 0.0065,
    // },
    {
        network: 'Bnb',
        rpc: ['https://bsc.meowrpc.com', 'https://rpc.ankr.com/bsc', 'https://1rpc.io/bnb'],
        minTransfer: 0.000167,
    },
    {
        network: 'OpBNB',
        rpc: [
            'https://opbnb.drpc.org',
            'https://1rpc.io/opbnb',
            'https://opbnb-rpc.publicnode.com',
        ],
        minTransfer: 0.000167,
    },
    // {
    //     network: 'Klaytn',
    //     rpc: ['https://1rpc.io/klay', 'https://klaytn.drpc.org'],
    //     minTransfer: 0.542,
    // },
    {
        network: 'Kava',
        rpc: [
            'https://kava.drpc.org',
            'https://rpc.ankr.com/http/kava_api',
            'https://kava-evm-rpc.publicnode.com',
        ],
        minTransfer: 0.149,
    },
    // {
    //     network: 'Ethereum',
    //     rpc: 'https://1rpc.io/eth',
    //     minTransfer: 0.000053,
    // },
];
