const axios = require('axios');

const USER = 'user';
const PASS = 'pass';
let data = {
    jsonrpc: "1.0",
    id: "curltext",
    method: "getblockcount",
    params: []
}

const url = `http://${USER}:${PASS}@127.0.0.1:18332/`;

const getBlockCount = async () => {
    try {
        const response = await axios.post(url, data);
        return response.data.result
    } catch (error) {
        console.log(error);
    }
}

const createTransaction = async (address, hexData) => {
    try {
        data.method = "createrawtransaction";
        data.params = [[], {[address]: 0.00001, "data": hexData}];
        const response = await axios.post(url, data);
        return response.data.result;
    } catch (error) {
        console.log(error.response.data);
    }
}

const fundTransaction = async (unsignedTx) => {
    try {
        data.method = "fundrawtransaction";
        data.params = [unsignedTx]
        const response = await axios.post(url, data);
        return response.data.result;
    } catch (error) {
        console.log(error.response.data);
    }
}

const signTransaction = async (hexcode) => {
    try {
        data.method = "signrawtransactionwithwallet";
        data.params = [hexcode]
        const response = await axios.post(url, data);
        return response.data.result;
    } catch (error) {
        console.log(error.response.data);
    }
}

const broadcastTransaction = async (signedTx) => {
    try {
        data.method = "sendrawtransaction"
        data.params = [signedTx]
        const response = await axios.post(url, data);
        return response.data.result;
    } catch (error) {
        console.log(error.response.data);
    }
}

const convertDataToHex = (data) => {
    const size = Buffer.byteLength(data, 'utf8');
    const encodedData = new Buffer.alloc(size, data).toString('hex');
    return encodedData
}

const prepareTransaction = async (address, data) => {
    const encodedData = convertDataToHex(data);
    const unsignedTx = await createTransaction(address, encodedData);
    const fundedUnsignedTx = await fundTransaction(unsignedTx);
    const signedTx = await signTransaction(fundedUnsignedTx.hex);
    const txId = await broadcastTransaction(signedTx.hex);

    return txId;
}

module.exports = {prepareTransaction}
