import React, {useEffect, useState} from 'react';
import {axios} from '../../API/axios';
import {Link} from 'react-router-dom';
import {BubblesStyled} from './Bubbles.styled';
import styled from 'styled-components'

const StyledBubbleLink = styled(Link)`
`;

    //This returns a list of the catagories 

export default function Bubbles({currentPage}) {
    console.log(currentPage)
    const [error, setError] = useState(false)

    const [errorMessage, setErrorMessage]= useState()
    const [bubbles, setBubbles] = useState()

    useEffect(()=>{
        if(currentPage){
            axios.post('/api/getByCat', {
                cat: currentPage
            }).then(res => setBubbles(res.data.info)).catch(res=> console.log(res))
        }
    },[])

    console.log(bubbles)
    let bubsToRen;
    if(bubbles){
       bubsToRen = bubbles.map(bubble => {
           return <li key={bubble.Sentiment_ID}><Link><button type ="button">{bubble.Topic_Name}</button></Link>
       </li>
       })
   }

   if(error){
       return <h1>{errorMessage}</h1>
   }else{
        return (
            <BubblesStyled>
                <h1>{currentPage}</h1>
                <ul>
                   {bubsToRen} 
                </ul>
            </BubblesStyled>
        )
    }
}