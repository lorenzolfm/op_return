const express = require('express');
const axios = require('axios');
const router = express.Router();

router.get('/api', (req, res, next) => {
    res.json({msg: "GET request @ /api"});
})

router.post('/api', (req, res, next) => {
    if (req.body.address) {
        res.json(req.body.address);
    } else {
        res.json({
            'error': 'Something went wrong'
        })
    }
})

const headers = {
    "content-type": "text/plain"
};

const USER = 'user';
const PASS = 'pass';
let dataString = `{"jsonrpc":"1.0","id":"curltext","method":"getblockcount","params":[]}`;
let options = {
    url: `http://${USER}:${PASS}@127.0.0.1:18332/`,
    method: "POST",
    headers: headers,
    body: dataString
};

const getBlockCount = async () => {
    try {
        const response = await axios.post(options.url, options.body);
        return response.data.result
    } catch (error) {
        console.log(error);
    }
}

router.get('/getblockcount', async (req, res) => {
    const response = await getBlockCount();
    res.json({blockcount: response})
})


module.exports = router;
