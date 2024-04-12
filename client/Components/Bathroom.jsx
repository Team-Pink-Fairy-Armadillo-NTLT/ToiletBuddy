import React from 'react';
let bathroomReviews = ['test']
//will be a fetch call to our server which then sends back database query result
const Bathroom = ()=>{
  return(
    <section id='bathroomSect'>
      Name of bathroom
      <input id='review'>
        Add a review
      </input>
      <div id='bathroomReviews'>
        :locationthisis's: reviews:<br></br> {/* place holder until we can get place name */}
        {bathroomReviews}
      </div>
    </section>
  )
}
export default Bathroom;