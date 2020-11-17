import React from 'react'
import AllDisplayedCards from './displayHelper/AllDisplayedCards'
import './css/display.css'
import axios from '../APIS/axios'

export default function Display({currentPage}) {
    console.log("Current page is: " + currentPage)

    const pageToLoad = "home"

    switch(currentPage){
        case 1:
            
        case 2:
             
            break;
        case 3:
            break;
        case 4:
            break;
    }

    return (
        <div className="display-all-cards--body">
            <AllDisplayedCards/>
        </div>
    )
}
