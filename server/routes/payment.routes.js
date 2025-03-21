const { createPayment, callBack } = require('../controller/payment.controller');
const { bkashAuth } = require('../middleware/authMiddleware');

const router = require('express').Router();

router.post('/bkash/payment/create', bkashAuth, createPayment);
router.get('/bkash/payment/callback', bkashAuth, callBack);

module.exports = router