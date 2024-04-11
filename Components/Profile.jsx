import React from 'react';
let userReviews = ['test']
//will be a fetch call to our server which then sends back database query result
const Profile = ()=>{
  return(
    <section id='profileSect'>
      Name
      <div id='userReviews'>
        These are your reviews:<br></br>
        {userReviews}
      </div>
    </section>
  )
}
export default Profile;