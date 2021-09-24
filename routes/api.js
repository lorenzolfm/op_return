const express = require('express');
const router = express.Router();

router.get('/api', (req, res, next) => {
    res.json("GET request @ /api");
})

router.post('/api', (req, res, next) => {
    if (req.body.address) {
        res.json(req.body.address);
    } else {
        res.json({
            "error": "Empty address"
        })
    }
})

module.exports = router;
