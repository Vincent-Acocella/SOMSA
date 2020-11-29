import React, {useEffect} from 'react';
import {axios} from '../../API/axios';
import {Link} from 'react-router-dom';
import {BubblesStyled} from './Bubbles.styled';

import styled from 'styled-components'


const StyledBubbleLink = styled(Link)`


`;

function bubblesToShow(currentPage){
    //This returns a list of the catagories 
    axios.get(`/sentiment/${currentPage}`)
    .then(res=>{
        return res.data;
    })
}

export default function Bubbles({currentPage}) {

   let bubblesInJson = bubblesToShow(currentPage);


    return (
        <BubblesStyled>
            <ul>
                {bubblesInJson.map(bubble =>(
                    <li key={bubble}>
                        <StyledBubbleLink>{bubble}</StyledBubbleLink>
                    </li>
                ))}
                <li></li>
            </ul>
        </BubblesStyled>
       
    )
}
