import React, { useEffect, useState } from 'react';
import Reviews from './Reviews.jsx';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { loginUser, logoutUser} from '../slice.js'
import { Container, Col, Row, FormControl, Form } from 'react-bootstrap';
//will be a fetch call to our server which then sends back database query result

const Bathroom = ()=>{
  const {placeId} = useParams();
  const [placeName, setPlaceName] = useState('');
  const [reviews,updateReviews]  = useState([]);
  const [averageRating, setAverageRating] = useState(0);
  const isLoggedIn = useSelector(state => state.bathroom.isLoggedIn);
  const dispatch = useDispatch();
  const addReview = (e) =>{
    e.preventDefault();
      if(document.getElementById('review').value.trim()!=='' && document.getElementById('rating').value!==''){
        fetch(`/api/${placeId}`,{
          method:'POST',
          body:JSON.stringify({
            'text':e.target.text.value,
            'rating':e.target.num.value
          }),
          headers:{'Content-Type':'application/json'},
        })
        .then(res=> {console.log('testing res',res); return res})
        .then(res=>{
          console.log('res',res);
          if(res.status===403){alert('Please log in to post review');
          console.log('did I make it here?')
          return res}})
        .then(res=>getReviews());
        document.getElementById('review').value  = '';
        document.getElementById('rating').value = '';
      }
  }

  const getReviews = () => {
    let r = [];
    let ratingTotal = 0;
    fetch(`/api/${placeId}`).then(data=>data.json()).then(response=>{
      console.log('response',response)
      if(response['data'].length!==0){
        for(const review of response['data']){
          // console.log('rating', review['rating'], 'ratingTotal', ratingTotal, 'length', r.length)
          ratingTotal += parseFloat(review['rating']);
          r.push(
          <Reviews 
          key = {review['review_text']} 
          rating = {review['rating']} 
          review={review['review_text']} 
          username={review['username']}
          />);
        }
        updateReviews(r);
        setAverageRating((ratingTotal/r.length).toFixed(1));
      }
    })
  }

  const [file, setFile] = useState();
    function handleChange(e) {
        console.log(e.target.files);
        console.log(e.target.files[0])
        setFile(URL.createObjectURL(e.target.files[0]));
    }

  useEffect(()=>{
    fetch(`https://places.googleapis.com/v1/places/${placeId}?fields=id,displayName&key=${process.env.GOOGLE_MAPS_API_KEY}`)
    .then(res => res.json())
    .then(res => setPlaceName(res.displayName.text))

    getReviews(updateReviews,placeId);
    }, [])

  return(
    <>
      <h1 style={{textAlign:'center', fontSize: "50"}}>{placeName}: <span style={{fontSize:'30'}}>Average Rating: {averageRating}</span></h1>
      <div style={{display:'flex', flexDirection:'row'}}>
        <Container style={{flex: '0 0 30%'}} id='bathroomSect'>
          <form id='form' onSubmit={(e)=>{addReview(e)}}>
            <FormControl name='text' id='review' placeholder='Add a review' as='textarea' rows={5}></FormControl>
            {/* <FormControl name='num' id='rating' type='number'></FormControl> */}
            <Form.Select name='num' id='rating'>
              <option>Select a Rating</option>
              <option value='1'>1</option>
              <option value='2'>2</option>
              <option value='3'>3</option>
              <option value='4'>4</option>
              <option value='5'>5</option>
              <option value='6'>6</option>
              <option value='7'>7</option>
              <option value='8'>8</option>
              <option value='9'>9</option>
              <option value='10'>10</option>
            </Form.Select>
            <h2>Add Image:</h2>
            <input type="file" onChange={handleChange} />
            <img src={file} />
            <input type='submit' value='Submit'></input>
          </form>
        
        </Container>
        <Container style={{flex: '0 0 70%', paddingRight:'40px'}} id='bathroomReviews'>
          {/* <Col> */}
            {/* <Row xs={2} md={3} lg={4} xl={5}> */}
            <Row>
              {reviews}
            </Row>
          {/* </Col> */}
        </Container>
      </div>
    </>
  )
}
export default Bathroom;