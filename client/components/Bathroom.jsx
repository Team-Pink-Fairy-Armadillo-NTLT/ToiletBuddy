import React, { useEffect, useState } from 'react';
import Reviews from './Reviews.jsx';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { loginUser, logoutUser} from '../slice.js'
import { Container, Col, Row, FormControl, Form, Modal, Button } from 'react-bootstrap';
import RatingSelect from './RatingSelect.jsx';
//will be a fetch call to our server which then sends back database query result

const Bathroom = ()=>{
  const {placeId} = useParams();
  const [placeName, setPlaceName] = useState('');
  const [reviews,updateReviews]  = useState([]);
  const [averageRating, setAverageRating] = useState(0);
  const [address, setAddress] = useState('');
  const [showModal, setShowModal] = useState(false);
  const isLoggedIn = useSelector(state => state.bathroom.isLoggedIn);
  const [imageFile, setImageFile] = useState();
  let button;

  const dispatch = useDispatch();
  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  const getFileContents =  file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
  })

  const signin = () => {
    console.log('signinID',placeId)
    location.assign(`/google/auth/${placeId}`);
   }

   const logout = () => {
    console.log("trying to logout");
    fetch('/logout')
    .then(dispatch(logoutUser()));
  }

  const addReview = async (e) =>{
    e.preventDefault();
    let review = e.target.text.value;
    let bathroom = e.target['bathroom(required)'].value;
    let toilet = e.target.toilet.value;
    let sink = e.target.sink.value;
    let smell = e.target.smell.value;
    let cleanliness = e.target.cleanliness.value;
    let TP = e.target.TP.value;
    let image;

    image = imageFile ? await getFileContents(imageFile) : null;
    if(toilet === '') toilet = null;
    if(sink === '') sink = null;
    if(smell === '') smell = null;
    if(cleanliness === '') cleanliness = null;
    if(TP === '') TP = null;

    if(review.trim()===''){
      alert('Enter a review');
    }else if(bathroom===''){
      alert('Select a bathroom rating');
    }else if(bathroom>10 || bathroom<0){
      alert('Please keep your rating between 1 and 10');
    }else{
        fetch(`/api/${placeId}`,{
          method:'POST',
          body:JSON.stringify({
            'text':review,
            'rating':bathroom,
            'toilet':toilet,
            'sink':sink,
            'smell':smell,
            'cleanliness':cleanliness,
            'tp':TP,
            'address':address,
            'name': placeName,
            'image': image
          }),
          headers:{'Content-Type':'application/json'},
        })
        .then(res=> {console.log('testing res',res); return res})
        .then(res=>{
          console.log('res',res);
          if(res.status===403){setShowModal(true)};
          return res})
        .then(res=>getReviews());
        ['text', 'bathroom(required)', 'toilet', 'sink', 'smell', 'cleanliness', 'TP'].forEach(field => e.target[field].value = '');
    }
  }

  const getReviews = () => {
    let r = [];
    let ratingTotal = 0;
    fetch(`/api/${placeId}`).then(data=>data.json()).then(response=>{
      if(response['data'].length!==0){
        document.getElementById('rev').innerHTML = '';
        let i = 0;
        for(const review of response['data']){
          ratingTotal += parseFloat(review['rating']);
          r.unshift(
          <Reviews 
          key = {i} 
          overallRating = {review['rating']} 
          review={review['text']} 
          username={review['username']}
          reviewImage={review['image_b64']}
          toiletRating={review['toilet']}
          sinkRating={review['sink']}
          smellRating={review['smell']}
          cleanlinessRating={review['cleanliness']}
          TPRating={review['tp']}
          />);
          i++
        }
        updateReviews(r);
        setAverageRating((ratingTotal/r.length).toFixed(1));
      }else{
        document.getElementById('rev').innerHTML = 'No reviews yet'
      }
    })
  }

  async function handleChange(e) {
    console.log(e.target.files);
    console.log(e.target.files[0]);
    setImageFile(e.target.files[0]);
  }

  useEffect(()=>{
    fetch(`https://places.googleapis.com/v1/places/${placeId}?fields=id,displayName,formattedAddress&key=${process.env.GOOGLE_MAPS_API_KEY}`)
    .then(res => res.json())
    .then(res => {setPlaceName(res.displayName.text); setAddress(res.formattedAddress)})
    console.log(placeId);
    getReviews(updateReviews,placeId);
    }, []);

  useEffect(() => {
    fetch('/verifyuser')
    .then((res) => res.json())
    .then(res => {if(res.result === "ok") dispatch(loginUser())});
  },[]);

  if(isLoggedIn===true){
    button = <Button variant='secondary' onClick={logout} id='signinL'>Log Out</Button>
  }
  else{
    button = <Button variant='primary' id="signin" onClick={signin}>Sign in with Google</Button>
  }
  return(
    <>
    <button style={{height: '50px', fontSize:'20px', marginLeft:'40px'}} id = 'homeB'onClick={()=>{location.assign('/')}}> Back to Home</button>
    <div id ='d'>{button}</div>
    {/* <button id = 'homeB'onClick={()=>{location.assign('/')}}> Back to Home</button> */}
      <h1 style={{textAlign:'center', fontSize: "50"}}>{placeName}: <span style={{fontSize:'30'}}>Average Rating: {averageRating}</span></h1>
      <h2 style={{textAlign:'center', fontSize: "20"}}>{address}</h2>
      <div style={{display:'flex', flexDirection:'row'}}>
        <Container style={{flex: '0 0 30%', marginTop: '200px'}} id='bathroomSect'>
          <form id='form' onSubmit={(e)=>{addReview(e)}}>
            <FormControl name='text' id='review' placeholder='Add a review' as='textarea' rows={5} style={{backgroundColor:'f8f9fa', fontSize:'20px'}}></FormControl>
            {/* <FormControl name='num' id='rating' type='number'></FormControl> */}
            <RatingSelect name='bathroom(required)'/>
            <RatingSelect name='toilet'/>
            <RatingSelect name='sink'/>
            <RatingSelect name='smell'/>
            <RatingSelect name='cleanliness'/>
            <RatingSelect name='TP'/>
            <br/>
            <h2>Add Image:</h2>
            <input type="file" name="imageFile" onChange={handleChange} />
            <br/><br/><br/>
            <input type='submit' value='Submit review'></input>
          </form>
        </Container>
        <Container style={{flex: '0 0 70%', paddingRight:'40px'}} id='bathroomReviews'>
          {/* <Col> */}
            {/* <Row xs={2} md={3} lg={4} xl={5}> */}
            <h1 id = 'rev' style={{position:'relative', left:'10em'}}></h1>
            <Row id = 'r'>
              {reviews}
            </Row>
          {/* </Col> */}
        </Container>
      </div>
      <Modal size='lg' centered show={showModal} onHide={handleClose}>
        <Container >
          <Modal.Header closeButton style={{}}>
            <Modal.Title >You need to be logged in to write a Review!</Modal.Title>
          </Modal.Header>
            <Modal.Body style={{textAlign:'center'}}>Login with your Google account</Modal.Body>
            <Modal.Footer style={{display:'flex', flexDirection:'row', alignItems:'center', justifyContent:'center' }}>
              <Button style={{height: '70%'}} variant='primary' id="signins" onClick={signin}>Sign in with Google</Button>
            </Modal.Footer>
          
        </Container>
      </Modal>
     
    </>
  )
}
export default Bathroom;