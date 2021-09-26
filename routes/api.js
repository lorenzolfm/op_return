const express = require('express');
const router = express.Router();
const rpc = require('../bitcoin/rpc');

router.get('/api', (req, res, next) => {
    res.json({msg: "GET request @ /api"});
})

router.post('/api', async (req, res, next) => {
    if (req.body.address && req.body.data) {
        const txId = await rpc.prepareTransaction(req.body.address, req.body.data)
        res.json({txId: txId,});
    } else {
        res.json({'error': 'Something went wrong'})
    }
})


router.get('/getblockcount', async (req, res) => {
    const response = await rpc.getBlockCount();
    await rpc.makeTransaction("1", "Ola Mundo")
    res.json({blockcount: response})
})

router.get('/createtransaction', async (req, res) => {
    const data = "48656c6c6f20576f726c64";
    const address = "tb1ql7w62elx9ucw4pj5lgw4l028hmuw80sndtntxt";

    const unsignedTx = await rpc.createTransaction(address, data);
    const fundedUnsignedTx = await rpc.fundTransaction(unsignedTx);
    const signedTx = await rpc.signTransaction(fundedUnsignedTx.hex);
    //const txId = await rpc.broadcastTransaction(signedTx.hex)
 
    res.json({response: signedTx});
})


module.exports = router;
