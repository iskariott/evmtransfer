import { readFileSync } from 'fs';
import { Contract, JsonRpcProvider, Wallet, formatEther } from 'ethers';
import readline from 'readline';

// async function getDecimals(token, provider) {
//     const c = new Contract(token, ABI_ERC20, provider);
//     return await c.decimals();
// }

export function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function readWallets(path) {
    return readFileSync(path, 'utf-8')
        .split('\n')
        .map((line) => line.trim())
        .filter((line) => line !== '');
}

function convertEtherToNumber(value) {
    return Number(Number(formatEther(value)).toFixed(8));
}

function increaseBigintRandPerc(value) {
    const randPercent = getRandomInt(10, 25) / 100;
    const nValue = Number(value);
    const increasedValue = Math.floor(nValue + nValue * randPercent);
    return BigInt(increasedValue);
}

function checkLowBalance(balance, minTransfer, networkName) {
    const numBalance = convertEtherToNumber(balance);
    if (numBalance < minTransfer) {
        console.log(`Network: ${networkName}. Low balance: ${numBalance}`);
        return false;
    }
    return true;
}

export async function transfer(pkey, toAddress, networkData, r) {
    const { minTransfer, network, rpc } = networkData;
    const provider = new JsonRpcProvider(rpc[r]);
    const signer = new Wallet(pkey, provider);
    const balance = await provider.getBalance(signer.address);
    if (!checkLowBalance(balance, minTransfer, network)) return false;
    const { gasPrice } = await provider.getFeeData();
    if (!gasPrice) throw new Error('cannot estimate gasPrice');

    const tx = {
        gasPrice,
        data: '0x',
    };
    const estGas = await provider.estimateGas(tx);
    const gasLimit = increaseBigintRandPerc(estGas);
    tx.gasLimit = gasLimit;
    tx.to = toAddress;
    tx.value = balance - increaseBigintRandPerc(gasPrice * gasLimit);

    if (!checkLowBalance(balance, minTransfer, network)) return false;
    const { hash } = await signer.sendTransaction(tx);
    console.log(
        `Network: ${network}\nSent ${convertEtherToNumber(
            tx.value,
        )} native to ${toAddress}\nHash: ${hash}`,
    );
    return true;
}

export function cliCountDown(time_s, delayType) {
    return new Promise((resolve) => {
        function updateLine(content, finished = false) {
            readline.clearLine(process.stdout, 0);
            readline.cursorTo(process.stdout, 0);
            !finished && process.stdout.write(`${delayType}: ${content}s`);
        }

        updateLine(time_s);
        let timer = setInterval(() => {
            time_s -= 1;

            if (time_s <= 0) {
                clearInterval(timer);
                updateLine(0, true);
                resolve();
            } else {
                updateLine(time_s);
            }
        }, 1000);
    });
}
