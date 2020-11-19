import React, {useEffect, useState} from 'react';
import Sentiment from './Sentiment';

/*
Topic needs to retrieve from the db or from web scrapper
*/

export default function Topic({topic}) {

useEffect(()=>{
    //Every time topic changes, load new sentiment and sentiment graph accordingly
},[topic])

    return (
        <div>
            <Sentiment/>
            <SentimentGraph/>
        </div>
    )
}
