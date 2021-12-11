const express = require("express");
const router = express.Router();
const bcrypt = require('bcrypt');
const Users = require('../../models/user');

router.get('/get', (req, res) => {
    res.send([
        {
            name: "ghous",
            email: "ghous@gmail.com"
        }
    ])
})

router.post('/register', (req, res) => {
    try {
        let user = {
            email: req.body.email,
            password: passwordHash(req.body.password)
        }
        let checkUser = Users.find({ email: user.email });
        checkUser
            .then((data) => {
                if (data.length) {
                    res.send("user already registered")
                } else {
                    let registerUser = new Users(user)
                    registerUser.save()
                        .then(() => {
                            res.send("user register hogaya...")
                        })
                }
            })
    }
    catch (err) {
        res.send(500, { msg: "error" })
    }
})

router.post('/login', (req, res) => {
    let checkUser = Users.find({ email: req.body.email });
    checkUser
        .then((data) => {
            if (data.length) {
                let comparePassword = bcrypt.compareSync(req.body.password, data[0].password)
                if (comparePassword) {
                    res.send("user login hogaya")
                } else {
                    res.send("password invalid")
                }
            } else {
                res.send(500, "user not exists")
            }

        })
})




const passwordHash = (pass) => {
    let salt = bcrypt.genSaltSync(10);
    let hash = bcrypt.hashSync(pass, salt)
    return hash;
}


module.exports = router;