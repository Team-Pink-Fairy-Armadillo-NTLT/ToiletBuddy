import React from 'react'
const Reviews = ()=>{
    const reviews = {
        'BillyBobJoe: ':'This Bathroom sucked'
    }
    return (
        <section id = 'reviewSect'>
            <div>
                {Object.keys(reviews)[0]}{Object.values(reviews)[0]}
            </div>
        </section>
    )
}
export default Reviews;