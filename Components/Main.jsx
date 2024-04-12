import React from 'react';
import {Link} from 'react-router-dom'
let loggedIn;
//loggedIn will be set based off of if they have a cookie or not
const Main = ()=>{
  let loginButton = <a href='./google/auth'><button id="signin">Sign in with Google</button></a>;
  //the button will change from sign in to a go to profile button based on whether or not they are signed in
  // if(loggedIn===false){
  //   test = <button onClick={location.assign('/homepage')}id='homepage'>Go to profile</button>
  // }
  return(
    <section id='mainSect'>
      {loginButton}
      
      <div id='map'></div>
    </section>
  )
}
export default Main;