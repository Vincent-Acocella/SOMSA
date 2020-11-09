import React from 'react'
import AllDisplayedCards from './displayHelper/AllDisplayedCards'
import Sentiment from './displayHelper/Sentiment'
import '../../css/display.css'

export default function Display({currentPage}) {
    console.log("Current page is: " + currentPage)

    return (
        <div className="display-all-cards--body">
            <AllDisplayedCards/>
            <Sentiment/>
        </div>
    )
}
