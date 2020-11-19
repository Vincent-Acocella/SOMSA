import React from 'react'
import axios from './axios'

export default function sentimentAPI({pageToLoad}) {
    
    axios.post('/sentiment/get',{pageToLoad})
    .then(res =>{
        {res.body.sentiment}

    })

    return (
        <div>
            
        </div>
    )
}
