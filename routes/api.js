const express = require('express');
const router = express.Router();
const rpc = require('../bitcoin/rpc');

router.get('/api', (req, res, next) => {
    res.json({msg: "GET request @ /api"});
})

router.post('/api', (req, res, next) => {
    if (req.body.address) {
        res.json(req.body.address);
        // Make transaction
    } else {
        res.json({
            'error': 'Something went wrong'
        })
    }
})


router.get('/getblockcount', async (req, res) => {
    const response = await rpc.getBlockCount();
    await rpc.makeTransaction("1", "Ola Mundo")
    res.json({blockcount: response})
})

router.get('/createtransaction', async (req, res) => {
    const hexcode = await rpc.createTransaction();
    const signedTx = await rpc.signTransaction(hexcode);
    const response = await rpc.broadcastTransaction(signedTx.hex)
 
    res.json({response: response})
})


module.exports = router;
