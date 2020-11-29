import React, {useState, useEffect} from 'react';
import {HomeStyled} from './Home.styled';
import {Link} from 'react-router-dom';
import styled from 'styled-components';
import SpecificPage from './Bubbles'



const StyledButton = styled.button`
    text-decoration: none;
    color white;
    background: transparent;
    border:none;
    
     button:active {
        opacity: 1;
        border: green;
        text-decoration: none;
    }
`;

const list = [
    "Favorites",
    "Environment",
    "General",
    "Politics",
    "Sports",
    "Science",
    "Technology"
]

const PAGE_SELECTED = "pageselect"

export default function Home() {

    const [currentPage, setCurrentPage] = useState([]);
 
    useEffect(()=>{
        console.log(currentPage);

    }, [currentPage])

    return (
        <HomeStyled>
            <>
           <h1>Trending </h1> 
            <h1>Sentiments</h1> 
            <ul>
               {list.map(item=> (
                   <li key={item}>
                      <StyledButton onClick={()=> setCurrentPage(item)}>{item} </StyledButton>
                    </li>
               ))}
            </ul>

            <div>













            </div>
            </>
        </HomeStyled>
    )
}