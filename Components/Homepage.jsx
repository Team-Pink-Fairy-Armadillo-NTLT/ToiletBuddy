import React from 'react';
let userReviews = ['map']
//will be a fetch call to our server which then sends back database query result
const Homepage = ()=>{
  return(
    <section id='profileSect'>
      Name
      <div id='userReviews'>
        Select a location to review<br></br>
        {userReviews}
      </div>
    </section>
  )
}
export default Homepage;