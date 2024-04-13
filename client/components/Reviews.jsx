import React from 'react'
const Reviews = (props)=>{
    return (
        <section id = 'reviewSect'>
            <div>
                {props.name + props.review}
            </div>
        </section>
    )
}
export default Reviews;