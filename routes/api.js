const express = require('express');
const router = express.Router();

router.get('/api', (req, res, next) => {
    res.send("Get request @ /api");
})

router.post('/api', (req, res, next) => {
    res.send("Post @ /api");
})

module.exports = router;
