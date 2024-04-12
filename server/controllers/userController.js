const userController = {}

userController.loginUser = (userData, loginResponse) => {
    loginResponse.cookie('userAuth',userData.email)


    //can use information from req to make a query to check if they exist and if not to add them
}








module.exports = userController;
