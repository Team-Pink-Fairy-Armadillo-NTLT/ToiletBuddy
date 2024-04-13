const userController = {}

userController.loginUser = (userData, loginResponse) => {
    console.log('userData', userData)
    loginResponse.cookie('userAuth',userData.email)
    console.log('I am in user controller')
    


    //can use information from req to make a query to check if they exist and if not to add them
}








module.exports = userController;
