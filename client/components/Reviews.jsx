import React from 'react';
import { Card, ListGroup, ProgressBar } from 'react-bootstrap';


const Reviews = ({ username, 
    overallRating, 
    review, 
    toiletRating, 
    sinkRating, 
    smellRating, 
    cleanlinessRating, 
    TPRating })=>{
    
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

    return (
            <Card className='m-2 '>
                <Card.Header >Total Rating : <span style={{fontSize: "30"}}>{overallRating}</span>/10</Card.Header>
                <ListGroup>
                    {toiletRating && 
                        <ListGroup.Item style={{backgroundColor:backgroundColor(parseFloat(toiletRating))}} className='flex-row'>
                            <div>Toilet: {toiletRating}/10</div>
                            <ProgressBar style={{backgroundColor:'white'}} variant={progBarColor(parseFloat(toiletRating))} now={parseFloat(toiletRating)*10}/>
                        </ListGroup.Item>}
                    {sinkRating && 
                        <ListGroup.Item style={{backgroundColor:backgroundColor(parseFloat(sinkRating))}} className='flex-row'>
                            <div>Sink: {sinkRating}/10 </div>
                            <ProgressBar style={{backgroundColor:'white'}} variant={progBarColor(parseFloat(sinkRating))} now={parseFloat(sinkRating)*10}/>
                        </ListGroup.Item>}
                    {smellRating && 
                        <ListGroup.Item style={{backgroundColor:backgroundColor(parseFloat(smellRating))}}>
                            <div> Smell: {smellRating}/10</div>
                            <ProgressBar style={{backgroundColor:'white'}} variant={progBarColor(parseFloat(smellRating))} now={parseFloat(smellRating)*10}/>
                        </ListGroup.Item>}
                    {cleanlinessRating && 
                        <ListGroup.Item style={{backgroundColor:backgroundColor(parseFloat(cleanlinessRating))}}>
                            <div>Cleanliness: {cleanlinessRating}/10</div>
                            <ProgressBar style={{backgroundColor:'white'}} variant={progBarColor(parseFloat(cleanlinessRating))} now={parseFloat(cleanlinessRating)*10}/>
                        </ListGroup.Item>}
                    {TPRating && 
                        <ListGroup.Item style={{backgroundColor:backgroundColor(parseFloat(TPRating))}}>
                            <div>TP: {TPRating}/10</div>
                            <ProgressBar style={{backgroundColor:'white'}} variant={progBarColor(parseFloat(TPRating))} now={parseFloat(TPRating)*10}/>
                        </ListGroup.Item>}
                </ListGroup>
                <Card.Body>
                    <blockquote className='blockquote mb-0'>
                        <p>"{review}"</p>       
                        <footer className='blockquote-footer'>{username}</footer>       
                    </blockquote>
                </Card.Body>
            </Card>    
    )
}
export default Reviews;