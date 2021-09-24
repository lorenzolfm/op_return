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


const createTransaction = async () => {
    try {
        data.method = "createrawtransaction"
        data.params = [
            [{
                "txid": "2a406a96a393fb5d808d30aa1f954b7b8ecff4fb0053a038e6c03d36c2043de3","vout": 1
            }],
            {
                "tb1ql7w62elx9ucw4pj5lgw4l028hmuw80sndtntxt": 0.000001,
                "data": "48656c6c6f20576f726c64",
                "tb1qkyg8p5g0k893284xuweulhvnmttu6qqgkwaajt": 0.000817
            }
        ]
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

const makeTransaction = async (address, data) => {
    const size = Buffer.byteLength(data, 'utf8');
    const encodedData = new Buffer.alloc(size, data).toString('hex');
    console.log(encodedData)
}

module.exports = { broadcastTransaction, signTransaction, createTransaction, getBlockCount, makeTransaction }