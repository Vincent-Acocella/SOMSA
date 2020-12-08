import React, {useEffect, useState} from 'react';
import {axios} from '../../API/axios';
import {Link} from 'react-router-dom';
import {BubblesStyled} from './Bubbles.styled';
import styled from 'styled-components'

const StyledHeading = styled.h1`
position: fixed;
top: 5%;
left: 302%;
transform: translate(-50%, -50%);
text-align:center;

`;

//This returns a list of the catagories 
export default function Bubbles({status, currentPage}) {
    console.log(currentPage)
    const [error, setError] = useState(false)
    const [errorMessage, setErrorMessage]= useState()
    const [bubbles, setBubbles] = useState()

    useEffect(()=>{
        if(status){
                axios.post('/api/getByCat', {
                cat: currentPage
            }).then(res => setBubbles(res.data.info)).catch(res=> console.log(res))
        }
    },[currentPage])

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
            <>
            {status && <StyledHeading> {currentPage} </StyledHeading>}
            <BubblesStyled length = {bubsToRen.length}>
                
                <ul>
                   {bubsToRen} 
                </ul>
                
            </BubblesStyled>
            </>
        )
    }
}