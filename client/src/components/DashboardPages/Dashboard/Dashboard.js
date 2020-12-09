import React, {useState, useEffect} from 'react';
import {HomeStyled} from './Dashboard.styled';
import Bubbles from './Bubbles'

const list = [
    "Trending",
    "Environment",
    "Politics",
    "Sports",
    "Science",
    "Technology"
];

const PAGE_SELECTED = "pageselect";

export default function Home() {

    const [currentPage, setCurrentPage] = useState();
    const [isActive, setIsActive] = useState(false);

    function buttonClick(item){
        setCurrentPage(item);
        setIsActive(true);
    }
 

    return (
        <HomeStyled currentPage={currentPage} >
            <>
            <h1>Trending </h1> 
            <h1>Sentiments</h1> 
            <ul>
               {list.map(item=> (
                    <li className={item} key={item}>
                      <button onClick={()=>buttonClick(item)}>{item}</button>
                    </li>
               ))}
            </ul>
            <div>
               {isActive &&<Bubbles status = {isActive} currentPage = {currentPage}></Bubbles>}
            </div>
            </>
        </HomeStyled>
    )
}