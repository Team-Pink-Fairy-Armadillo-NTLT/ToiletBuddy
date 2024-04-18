const jwt = require('jsonwebtoken');
const db = require('../models/appModels');
const queryRepository = require('../queryRepository');
const e = require('express');

const userController = {}

userController.loginUser = (userData, loginResponse,id) => {
  const username = userData.email.substring(0, userData.email.indexOf("@"))
  const values = [username]
  console.log('this is id'+id);
  db.query(queryRepository.getUserId, values)
    .then (data => {
      if (data.rows.length === 0){
        db.query(queryRepository.insertUser, values).then(insertData => {
          const userId = insertData.rows[0]._id
          const token = jwt.sign({'userId': userId}, process.env.SECRET_KEY)
          loginResponse.cookie('authorization', token)
          if(id===undefined){
            loginResponse.redirect('/')
          }else{
            loginResponse.redirect(`/#/bathroom/${id}`);
          }
        });
      }
    else {
      const userId = data.rows[0]._id
      const token = jwt.sign({"userId": userId}, process.env.SECRET_KEY)
      loginResponse.cookie('authorization', token)
      if(id===undefined){
        loginResponse.redirect('/')
      }else{
        loginResponse.redirect(`/#/bathroom/${id}`);
      }
      //console.log('token', token)
    }
  });
}

userController.logoutUser = (userData, loginResponse, next) => {
  loginResponse.clearCookie('authorization');
  return next();    
}

userController.verifyUser = (req, res, next) => {
  try {
    jwt.verify(req.cookies.authorization, process.env.SECRET_KEY);
    return next();
  } 
  catch {
    return next({
      log: 'userController.verifyUser: User not logged in but is authorized to access page',
      status: 200,
      message: { result: 'You are not logged in but can view the page'},
    });
  }
}

userController.checkPermissions = (req, res, next) => {
  console.log('i am checking permissions')
  try {
    const response = jwt.verify(req.cookies.authorization, process.env.SECRET_KEY)
    res.locals.userId = response.userId;
    return next();
  } 
  catch {
    return next({
      log: 'userController.checkPermissions: JWT validation failed',
      status: 403,
      message: { result: 'You are not authorized to perform this action'},
    });
  }
}



module.exports = userController;
