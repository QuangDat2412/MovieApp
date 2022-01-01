const router = require('express').Router();
const stripe = require('stripe')('sk_test_51Jlwr4F6PLZamBS7w5HeyOH37CWttAgYLUxlFIKTYB5OYql6mTAI6Y1rigg9BmoAJzjJTqKAQ0ihVfqJBoWGeIvk00qOeTo0AG');

router.post('/payment', (req, res) => {
    stripe.charges.create(
        {
            source: req.body.tokenId,
            amount: req.body.amount,
            currency: 'usd',
        },
        (stripeErr, stripeRes) => {
            if (stripeErr) {
                res.status(500).json(stripeErr);
            } else {
                res.status(200).json(stripeRes);
            }
        }
    );
});

module.exports = router;
