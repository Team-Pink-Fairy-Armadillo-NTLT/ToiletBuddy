const sessionController = {}

sessionController.isLoggedIn = (req,res,next) => {
    if (req.cookies.authorization) {
        return next()
    }
}







module.exports = sessionController;