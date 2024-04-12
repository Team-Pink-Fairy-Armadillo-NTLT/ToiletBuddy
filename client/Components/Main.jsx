import React from 'react';
import {Link} from 'react-router-dom'
//loggedIn will be set based off of if they have a cookie or not
const Main = ()=>{
  let loggedIn = false;
  let test = <a href='./google/auth'><button onClick={()=>{test = <button onClick={()=>{location.assign('/bathroom')}}id='profile'>Go to profile</button>}}id="signin">Sign in with Google</button></a>;
  //the button will change from sign in to a go to profile button based on whether or not they are signed in
  if(loggedIn===true){
    test = <button onClick={()=>{location.assign('/bathroom')}}id='profile'>Go to profile</button>
  } 
  return(
    <section id='mainSect'>
      {test}
      <div id='map'></div>
    </section>
  )
}
export default Main;