import React, {useEffect, useState} from 'react';
import {axios} from '../../API/axios';
import {Link} from 'react-router-dom';
import {BubblesStyled} from './Bubbles.styled';
import styled from 'styled-components'

const StyledHeading = styled.h1`
position: fixed;
top: ${({error}) => error ? '20%' : '5%'};
left: 302%;
transform: translate(-50%, -50%);
text-align:center;
color: ${({error}) => error ? 'red' : ''};
width: ${({error}) => error ? '400px;' : ''};

`;

//This returns a list of the catagories 
export default function Bubbles({status, currentPage}) {
    console.log(currentPage)
    const [error, setError] = useState(false)
    const [errorMessage, setErrorMessage]= useState()
    const [bubbles, setBubbles] = useState(null)

    useEffect(()=>{
        if(status){
                axios.post('/api/getByCat', {
                cat: currentPage
            }).then(res => {
                setBubbles(res.data.info);
                setError(false);
            }       
            ).catch(res=> {
                setError(true);
                setErrorMessage(res.response.data.error);

            } )
        }
    },[currentPage])

    let bubsToRen;
    
    if(bubbles !== null){
       bubsToRen = bubbles.map(bubble => {
           return <li key={bubble.Sentiment_ID}><Link><button type ="button">{bubble.Topic_Name}</button></Link>
       </li>
       })
   }

   if(error){
       return <StyledHeading error ={error}>{errorMessage}</StyledHeading>
   }else{
        return (
            <>
            {status && <StyledHeading error = {error}> {currentPage} </StyledHeading>}
            {bubsToRen !==null && bubbles && <BubblesStyled length = {bubsToRen.length}>
                
                <ul>
                   {bubsToRen} 
                </ul>

            </BubblesStyled>}
            </>
        )
    }
}