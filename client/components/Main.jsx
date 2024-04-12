import React from 'react';
import {Link} from 'react-router-dom'
import Map from './map.jsx';
//loggedIn will be set based off of if they have a cookie or not
const Main = ()=>{
  let loggedIn = true;
  let test = <a href='./google/auth'><button id="signin">Sign in with Google</button></a>;
  //the button will change from sign in to a go to profile button based on whether or not they are signed in
  if(loggedIn===false){
    test = <button onClick={()=>{location.assign('/bathroom')}}id='bathroomButton'>Go to profile</button>
  }
  return(
    <section id='mainSect'>
      {test}
      <Link to='/bathroom'><button> test button</button></Link>
      <div id='map'>
        <Map/>
      </div>
    </section>
  )
}
export default Main;