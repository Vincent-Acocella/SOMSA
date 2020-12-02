import React, {useState, useEffect} from 'react';
import {HomeStyled} from './Dashboard.styled';
import Bubbles from './Bubbles'

const list = [
    "Trending",
    "Environment",
    "General",
    "Politics",
    "Sports",
    "Science",
    "Technology"
];

const PAGE_SELECTED = "pageselect";

export default function Home() {

    const [currentPage, setCurrentPage] = useState();
 
    useEffect(()=>{
        const curPage = localStorage.getItem(PAGE_SELECTED);
        if(curPage !==null) setCurrentPage(curPage);
    }, [])

    useEffect(()=>{
        localStorage.setItem(PAGE_SELECTED, currentPage)
    },[currentPage]);

    return (
        <HomeStyled currentPage={currentPage} >
            <>
            <h1>Trending </h1> 
            <h1>Sentiments</h1> 
            <ul>
               {list.map(item=> (
                    <li className={item} key={item}>
                      <button onClick={()=> setCurrentPage(item)}>{item}</button>
                    </li>
               ))}
            </ul>
            <div>
                <Bubbles currentPage ={currentPage}></Bubbles>
            </div>
            </>
        </HomeStyled>
    )
}