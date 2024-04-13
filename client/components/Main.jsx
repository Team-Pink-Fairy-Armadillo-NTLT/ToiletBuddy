import React, { useState, useEffect } from 'react';
import {Link, useNavigate} from 'react-router-dom'
import Map from './map.jsx';
import { useSelector, useDispatch } from 'react-redux';
import { loginUser, logoutUser} from '../slice.js'
import { Button } from 'react-bootstrap';
//loggedIn will be set based off of if they have a cookie or not
const Main = ()=>{
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const isLoggedIn = useSelector(state => state.bathroom.isLoggedIn)

  //sign in function makes a get request to google callback then isloggedin updates to true
   const signin = () => {
     window.location.href = window.origin + "/google/auth"
    }

  const logout = () => {
    console.log("trying to logout")
    fetch('/logout')
    .then(dispatch(logoutUser()))
    // .then(console.log('isLoggedIn', isLoggedIn))
  }

  useEffect(() => {
    fetch('/verifyuser')
    .then((res) => res.json())
    .then(res => {
      if(res.result === "ok"){
        dispatch(loginUser())
      }
    })
  },[]);

 let button;
  //the button will change from sign in to a go to profile button based on whether or not they are signed in
  if(isLoggedIn===true){
<<<<<<< HEAD
    //button = <button onClick={()=>{location.assign('/bathroom')}}id='bathroomButton'>Log Out</button>
    button = <Button style={{height: '70%'}} variant='secondary' onClick={logout} id='bathroomButton'>Log Out</Button>
=======
    button = <button onClick={logout} id='bathroomButton'>Log Out</button>
>>>>>>> dev
  }
  else{
    button = <Button style={{height: '70%'}} variant='primary' id="signin" onClick={signin}>Sign in with Google</Button>
  }
  return(
    <>
      <header id='main-header'>
        <h1 id='brand'>Toilet Buddy</h1>
        {button}
      </header>
      <div id='map'>
          <Map />
      </div>
    </>

  )
}
export default Main;