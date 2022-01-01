const router = require('express').Router();
const User = require('../models/User');
const CryptoJS = require('crypto-js');
const jwt = require('jsonwebtoken');
var speakeasy = require('speakeasy');
const nodemailer = require('nodemailer');

//REGISTER
router.post('/register', async (req, res) => {
    const isValid = speakeasy.totp.verify({ secret: req.body.email + process.env.PASS_SEC, token: req.body.otp, window: 19 });
    const newUser = new User({
        ...req.body,
        password: CryptoJS.AES.encrypt(req.body.password, process.env.PASS_SEC).toString(),
    });
    try {
        if (isValid) {
            await newUser.save();
            res.status(201).json(true);
        } else {
            res.status(201).json(false);
        }
    } catch (err) {
        res.status(500).json(err);
    }
});
const sendEmail = async (email, subject, text) => {
    try {
        const transporter = nodemailer.createTransport({
            service: 'hotmail',
            auth: {
                user: 'dat.lq172465@sis.hust.edu.vn',
                pass: 'Datumltk123',
            },
        });
        await transporter.sendMail({
            from: 'dat.lq172465@sis.hust.edu.vn',
            to: email,
            subject: subject,
            text: text,
        });
        console.log('email sent sucessfully');
    } catch (error) {
        console.log('email not sent');
        console.log(error);
    }
};
router.post('/sendmail/:slug', async (req, res) => {
    const otp = speakeasy.totp({ secret: req.body.email + process.env.PASS_SEC, window: 19 });
    const message = `Dear ${req.body.email},
    
    Bạn đang thực hiện xác nhận bảo mật tài khoản App, dưới đây là mã xác thực của bạn:
                
    ${otp}
                
    Nếu đây không phải là email của bạn, xin hãy bỏ qua email này, hãy đừng trả lời.`;
    try {
        const user = await User.findOne({ email: req.body.email });
        if (req.params.slug === 'register') {
            if (user !== null) {
                res.send(false);
            } else {
                await sendEmail(req.body.email, 'Mã OTP:', message);
                res.send(true);
            }
        } else if (req.params.slug === 'update') {
            await sendEmail(req.body.email, 'Mã OTP:', message);
            res.send(true);
        }
    } catch (error) {
        res.status(400).send('An error occured');
    }
});

//LOGIN

router.post('/login', async (req, res) => {
    try {
        const user = await User.findOne({
            email: req.body.email,
        });
        !user && res.status(401).json('Wrong credentials!');

        const hashedPassword = CryptoJS.AES.decrypt(user.password, process.env.PASS_SEC);
        const OriginalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);

        OriginalPassword !== req.body.password && res.status(401).json('Wrong credentials!');

        const accessToken = jwt.sign(
            {
                id: user._id,
                isAdmin: user.isAdmin,
            },
            process.env.JWT_SEC,
            { expiresIn: '3d' }
        );

        const { password, ...others } = user._doc;

        res.status(200).json({ ...others, accessToken });
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;
// const sendEmail = async (email, subject, text) => {
//     try {
//         const transporter = nodemailer.createTransport({
//             service: 'hotmail',
//             auth: {
//                 user: 'dat.lq172465@sis.hust.edu.vn',
//                 pass: 'Datumltk123',
//             },
//         });
//         await transporter.sendMail({
//             from: 'dat.lq172465@sis.hust.edu.vn',
//             to: email,
//             subject: subject,
//             text: text,
//         });
//         console.log('email sent sucessfully');
//     } catch (error) {
//         console.log('email not sent');
//         console.log(error);
//     }
// };
// router.post('/verify', async (req, res) => {
//     try {
//         let user = await User.findOne({ email: req.body.email });
//         const accessToken = jwt.sign(
//             {
//                 id: user._id,
//             },
//             process.env.JWT_SEC,
//             { expiresIn: '5m' }
//         );
//         const message = `http://localhost:2412/api/users/verify/${user._id}/${accessToken}`;
//         await sendEmail(user.email, 'Verify Email', message);
//         res.send('An Email sent to your account please verify');
//     } catch (error) {
//         res.status(400).send('An error occured');
//     }
// });
// const verified = (req, res, next) => {
//     const token = req.params.token;
//     if (token) {
//         jwt.verify(token, process.env.JWT_SEC, (err, user) => {
//             if (err) res.status(403).json('Token is not valid!');
//             req.user = user;
//             if (req.user.id === req.params.id) {
//                 next();
//             } else {
//                 res.status(403).json('You are not alowed to do that!');
//             }
//         });
//     } else {
//         return res.status(401).json('You are not authenticated!');
//     }
// };

// router.get('/verify/:id/:token', verified, async (req, res) => {
//     try {
//         const user = await User.findOne({ _id: req.params.id });
//         if (!user) return res.status(400).send('Invalid link');

//         await User.updateOne({ verified: true });

//         res.send('email verified sucessfully');
//     } catch (error) {
//         res.status(400).send('An error occured');
//     }
// });
