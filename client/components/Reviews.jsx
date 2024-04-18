import React from 'react';
import { Card, ListGroup, ProgressBar } from 'react-bootstrap';

const Reviews = ({ username, 
    overallRating, 
    review, 
    toiletRating, 
    sinkRating, 
    smellRating, 
    cleanlinessRating, 
    TPRating,
    reviewImage
 })=>{
    
    const progBarColor = (rating) => {
        if(rating < 4){
            return 'danger';
        } else if(rating < 7){
            return 'warning';
        } else {
            return 'success';
        }
    };

    const backgroundColor = (rating) => {
        if(rating < 4){
            return 'rgb(255, 219, 219)';
        } else if(rating < 7){
            return 'rgb(255, 253, 219)';
        } else {
            return 'rgb(219, 255, 219)';
        }
    }
    const makeItem = (name,string) =>{
        return (name && 
            <ListGroup.Item style={{backgroundColor:backgroundColor(parseFloat(name))}} className='flex-row'>
                <div>{string}: {name}/10</div>
                <ProgressBar style={{backgroundColor:'white'}} variant={progBarColor(parseFloat(name))} now={parseFloat(name)*10}/>
            </ListGroup.Item>
        )
    }
    return (
            <Card className='m-2 '>
                <Card.Header >Total Rating : <span style={{fontSize: "30"}}>{overallRating}</span>/10</Card.Header>
                <ListGroup>
                    {makeItem(toiletRating,'Toilet')}
                    {makeItem(sinkRating,'Sink')}
                    {makeItem(smellRating,'Smell')}
                    {makeItem(cleanlinessRating,'Cleanliness')}
                    {makeItem(TPRating,'TP')}
                </ListGroup>
                <Card.Body>
                    <blockquote className='blockquote mb-0'>
                        <p>"{review}"</p>
                        <img src={reviewImage}/>             
                        <footer className='blockquote-footer'>{username}</footer>       
                    </blockquote>
                </Card.Body>
            </Card>    
    )
}
export default Reviews;