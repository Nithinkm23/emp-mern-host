const express = require('express')
const userData = require('../model/userData')
const router = express.Router();
const jwt = require('jsonwebtoken');

router.use(express.json());
router.use(express.urlencoded({ extended: true }))

// PLEASE USE THE FOLLOWING FOR THE LOGIN
// ADMIN CREDENTIALS: { USERNAME: admin, PASSWORD: password}
// USER CREDENTIALS: { USERNAME: user, PASSWORD: password}


//LOGIN API
router.post('/api/login', async (req, res) => {
    let username = req.body.username;
    let password = req.body.password;
    const user = await userData.findOne({ username: username })

    if (!user) {
        res.json({ message: "User not found !!" })
    }
    try {
        if (user.password == password) {
            jwt.sign({ email: username, id: user._id }, "empdata", { expiresIn: "1d" },
                (error, token) => {
                    if (error) {
                        res.json({ message: "Token not generated!" })
                    } else {
                        res.json({ message: "Login Successfully!!",token:token,data:user });
                    }
                })
        }
        else {
            res.json({ message: "Login Failed!!" })
        }
    }
    catch (error) {
        console.log(error)
    }
})

//Signup or register in database API FOR ADMIN AND USER

//ADMIN - username:>admin,password:>password
//USER  - username:>user,password:>password
router.post('/signup', async (req, res) => {
    try {
        console.log(req.body);
        const item = req.body;
        const newUser = userData(item);
        await newUser.save();
        res.json({ message: 'Registered Successfully!!' })
    } catch (error) {
        res.json('Unable to Register')
    }
})



module.exports = router;