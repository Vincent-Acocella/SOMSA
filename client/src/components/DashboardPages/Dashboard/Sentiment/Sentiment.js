import React ,{useState, useEffect} from 'react'
import {axios} from '../../../API/axios'

export default function Sentiment({match}) {
    useEffect(()=>{
        fetchSentiment();
    },[])

    const [sentiment, setSentiment] = useState();

    const fetchSentiment = async () =>{
        const getSentiment = await axios.get(`/api/sentiment/${match.params.id}`);
        console.log(getSentiment)
        setSentiment(getSentiment)
    }
    console.log(sentiment);
    return (
        <div>
            
        </div>
    )
}
