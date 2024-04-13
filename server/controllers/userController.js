var jwt = require('jsonwebtoken')
const db = require('../models/appModels');


const userController = {}

userController.loginUser = (userData, loginResponse) => {
    const username = userData.email.substring(0, userData.email.indexOf("@"))
    const values = [username]
    const queryString1 = 'SELECT _id FROM users WHERE username = $1'
    const queryString2 = 'INSERT INTO users (username) VALUES ($1) RETURNING (_id)'
    let response
    db.query(queryString1, values)
    .then (data => {
        // console.log('data length', data.rows.length)
        // console.log(data.rows)
        // console.log("---")
        if(data.rows.length === 0){
            db.query(queryString2, values).then(insertData => {
                const userId = insertData.rows[0]._id
                const token = jwt.sign({"userId": userId}, process.env.SECRET_KEY)
                loginResponse.cookie('authorization', token)
                loginResponse.redirect("/")
                //console.log('token', token)
            })
        }
        else{
            const userId = data.rows[0]._id
            const token = jwt.sign({"userId": userId}, process.env.SECRET_KEY)
            loginResponse.cookie('authorization', token)
            loginResponse.redirect("/")
            //console.log('token', token)
        }
    })
}

userController.logoutUser = (userData, loginResponse, next) => {
    loginResponse.clearCookie('authorization');
    return next()    
}

userController.verifyUser = (req, res, next) => {
    try{
        const response = jwt.verify(req.cookies.authorization, process.env.SECRET_KEY)
        return next()
    } 
    catch {
        return next({
            log: 'Could not verify user',
            status: 200,
            message: { "result": 'User not logged in'},
        })
    }
}



module.exports = userController;
