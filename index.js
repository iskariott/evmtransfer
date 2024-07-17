import { NETWORK_DATA, TX_DELAY, WALLET_DELAY } from './config.js';
import { cliCountDown, getRandomInt, readWallets, transfer } from './utils.js';

async function main() {
    const cexAddresses = readWallets('./cexAdresses.txt');
    const privateKeys = readWallets('./privateKeys.txt');
    if (!privateKeys.length || !cexAddresses.length) {
        console.log('Fill privateKeys.txt and cexAddresses.txt');
        return;
    }
    if (privateKeys.length !== cexAddresses.length) {
        console.log('The number of private keys and cex addresses does not match');
        return;
    }

    for (let p = 0; p < privateKeys.length; p++) {
        console.log(`Wallet #${p}`);
        let successTx = false;
        for (let n = 0; n < NETWORK_DATA.length; n++) {
            const rpcCount = NETWORK_DATA[n].rpc.length - 1;
            let res = false;
            for (let r = rpcCount; r >= 0; r--) {
                try {
                    res = await transfer(privateKeys[p], cexAddresses[p], NETWORK_DATA[n], r);
                    if (!res) break;
                    successTx = true;
                    console.log('successTx = ', successTx);
                    const txDelay = getRandomInt(TX_DELAY.min * 60, TX_DELAY.max * 60);
                    await cliCountDown(txDelay, 'Tx delay');
                    break;
                } catch (error) {
                    const isInsFunds = error.code === 'INSUFFICIENT_FUNDS';
                    console.log(
                        `Network: ${NETWORK_DATA[n].network}\nRpc: ${
                            NETWORK_DATA[n].rpc[r]
                        }\nError: ${isInsFunds ? error.code : error.message}`,
                    );
                    if (isInsFunds) break;
                }
                console.log('⚊'.repeat(75));
            }
            console.log('⚌'.repeat(75));
        }
        console.log('☰'.repeat(75));
        if (!successTx) continue;
        const walletDelay = getRandomInt(WALLET_DELAY.min * 60, WALLET_DELAY.max * 60);
        await cliCountDown(walletDelay, 'Wallet delay');
    }
}

await main();
