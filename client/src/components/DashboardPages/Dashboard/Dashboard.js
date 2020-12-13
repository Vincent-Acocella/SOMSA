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

export default function Dashboard() {

    const [currentPage, setCurrentPage] = useState();
    const [isActive, setIsActive] = useState(false);

    function buttonClick(item){
        setCurrentPage(item);
        setIsActive(true);
    }

    let addActive = "sidebar " + currentPage;
 
    return (
        <HomeStyled currentPage={currentPage}>
            <>
            <h1>Trending </h1> 
            <h1>Sentiments</h1> 
            <ul className = "list">
               {list.map(item => (
                    <li className = {addActive} key = {item}>
                        <button onClick={()=>buttonClick(item)}>{item}</button>
                    </li>
               ))}
            </ul>
            <div>
               {isActive && <Bubbles status = {isActive} currentPage = {currentPage}></Bubbles>}
            </div>
            </>
        </HomeStyled>
    )
}