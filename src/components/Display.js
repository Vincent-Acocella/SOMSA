import React from 'react'
import AllDisplayedCards from '../displayHelper/AllDisplayedCards'
import '../css/display.css'


    // let activePage =0;
    // switch(activePage){
    //     case 1:
    //         break;
    //     case 2:
    //         break;
    //     default:
    // }


export default function Display({currentPage}) {

    switch(currentPage){
        case 1:
            break;
        case 2:
            break;
        default:
    }

    return (
        <div className="display-all-cards--body">
            <AllDisplayedCards></AllDisplayedCards>
        </div>
    )
}
