var jwt = require('jsonwebtoken')

const userController = {}

userController.loginUser = (userData, loginResponse) => {
    const username = userData.email.substring(0, userData.email.indexOf("@"))
    const token = jwt.sign({"username": username}, process.env.SECRET_KEY)
    loginResponse.cookie('authorization', token)
    //can use information from req to make a query to check if they exist and if not to add them
}

userController.logoutUser = (userData, loginResponse, next) => {
    loginResponse.clearCookie('authorization');
    return next();    
}

userController.verifyUser = (req, res, next) => {
    try{
        const response = jwt.verify(req.cookies.authorization, process.env.SECRET_KEY)
        return next();
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
