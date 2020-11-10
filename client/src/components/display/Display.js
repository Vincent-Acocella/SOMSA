import React from 'react'
import AllDisplayedCards from './displayHelper/AllDisplayedCards'
import Sentiment from './displayHelper/Sentiment'
import '../../css/display.css'

export default function Display({currentPage}) {
    console.log("Current page is: " + currentPage)

    const pageToLoad = "home"

    switch(currentPage){
        case 1:
            break;
    }

    return (
        <div className="display-all-cards--body">
            <AllDisplayedCards/>
            <Sentiment/>
        </div>
    )
}
