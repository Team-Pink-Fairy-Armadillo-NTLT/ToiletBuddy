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
    
    
    return (
            <Card className='m-2 '>
                <Card.Header ><span style={{fontSize: "30"}}>{overallRating}</span>/10</Card.Header>
                <ListGroup>
                    {toiletRating && <ListGroup.Item>Toilet: {toiletRating}/10</ListGroup.Item>}
                    {sinkRating && <ListGroup.Item>Sink: {sinkRating}/10</ListGroup.Item>}
                    {smellRating && <ListGroup.Item>Smell: {smellRating}/10</ListGroup.Item>}
                    {cleanlinessRating && <ListGroup.Item>Cleanliness: {cleanlinessRating}/10</ListGroup.Item>}
                    {TPRating && <ListGroup.Item>TP: {TPRating}/10</ListGroup.Item>}
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