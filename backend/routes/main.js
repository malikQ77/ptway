const express = require('express');
const router = express.Router();
const sary = require('./sary/sary');

router.use('/sary', sary);
router.get('/hi', (req, res) => {
    res.send('hi')
})
module.exports = router;