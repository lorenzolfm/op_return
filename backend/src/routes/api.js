const express = require('express');
const router = express.Router();
const rpc = require('../bitcoin/rpc');

router.get('/api', (req, res, next) => {
    res.json({msg: "GET request @ /api"});
})

router.post('/api', async (req, res, next) => {
    if (req.body.address && req.body.data) {
        const txId = await rpc.makeTransaction(req.body.address, req.body.data)
        res.json({txId: txId,});
    } else {
        res.json({'error': 'Something went wrong'})
    }
})

router.get('/getblockcount', async (req, res) => {
    const response = await rpc.getBlockCount();
    res.json({blockcount: response})
})

module.exports = router;
