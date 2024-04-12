import React from 'react';
let bathroomReviews = ['test']
//will be a fetch call to our server which then sends back database query result
const addReview = () =>{
    if(document.getElementById('review').value.trim()!==''){
      // fetch('/bathroom',{
      //   method:'POST',
      //   body:document.getElementById('review').value,
      //   headers:{'Content-Type':'application/json'},
      // })
      console.log(document.getElementById('review').value);
      document.getElementById('review').value  = '';
    }
}
const Bathroom = ()=>{
  return(
    <section id='bathroomSect'>
      Name of bathroom
      <br></br>
      <input id='review' placeholder='Add a review'></input> <button onClick={addReview}> Submit review</button>
      <div id='bathroomReviews'>
        this bathroom's reviews:<br></br> {/* place holder until we can get place name */}
        {bathroomReviews}
      </div>
    </section>
  )
}
export default Bathroom;