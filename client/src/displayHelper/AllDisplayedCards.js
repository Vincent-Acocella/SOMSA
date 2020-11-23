import React from 'react'
import data from '../catagories/homePage.json'
import SingleCard from './SingleCard'
import '../css/display.css'


export default function allDisplayedCards() {

        const card = data.map(newData=>{
            return <SingleCard key = {newData.id} {...newData} ></SingleCard>
        })
    
    return ( 
        <div className ="cardStack">
            {card}
        </div>
    )
}
