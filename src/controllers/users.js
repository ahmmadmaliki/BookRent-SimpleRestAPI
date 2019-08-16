const modelUsers = require('../models/users')

module.exports= {
    Regist:(req, res) => {
        const user = {
            username: req.body.username,
            email: req.body.email,
            password: req.body.password
        }
        modelUsers.userRegist(user)
            .then(result => res.send(result))
            .catch(err => console.log(err))
    },
    Login: (req, res) =>{
        const user= {
            username: req.body.username,
            password: req.body.password
        }
        modelUsers.userLogin(user)
            .then(result => res.send(result))
            .catch(err => console.log(err))
    },
    Verify: (req, res) =>{
        const data=req.headers.authorization

        modelUsers.userVerify(data)
            .then(result => res.json(result))
            .catch(err => console.log(err))

    }
}