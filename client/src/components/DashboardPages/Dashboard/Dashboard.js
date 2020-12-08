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
 
    useEffect(()=>{
        const act = localStorage.getItem('active')
        if(act){
        const curPage = localStorage.getItem(PAGE_SELECTED);
        if(curPage !==null) setCurrentPage(curPage);
        }
        
    },[])

    useEffect(()=>{
        localStorage.setItem(PAGE_SELECTED, currentPage)
        localStorage.setItem('active', true)
        setIsActive(true)
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
                <Bubbles status= {isActive} currentPage ={currentPage}></Bubbles>
            </div>
            </>
        </HomeStyled>
    )
}