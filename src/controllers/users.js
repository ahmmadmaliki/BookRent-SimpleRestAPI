const modelUsers = require('../models/users')

module.exports= {
    Regist:(req, res) => {
        const user = {
            username: req.body.username,
            email: req.body.email,
            password: req.body.password
        }
        modelUsers.userRegist(user)
            .then(result => res.send({
                success: true,
                status: 'Registration successful',
                data: user
            }))
            .catch(err => res.send({
                success: false,
                status: 'Email or username already exist',
                data: {}
            }))
    },
    Login: (req, res) =>{
        const user= {
            username: req.body.username,
            password: req.body.password
        }
        modelUsers.userLogin(user)
            .then(result => res.json({
                success: true,
                status: `Data found`,
                data: result
            }))
            .catch(err => res.json({
                success: false,
                status: `User doesn't exist`,
                data: {}
            }))
    },
    Verify: (req, res) =>{
        const data=req.headers.authorization
        modelUsers.userVerify(data)
            .then(result => res.json(result))
            .catch(err => res.json({
                success: false,
                status: `User doesn't exist`,
                data: {}
            }))

    }
}