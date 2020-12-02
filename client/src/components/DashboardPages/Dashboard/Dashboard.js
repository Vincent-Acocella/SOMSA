import React, {useState, useEffect} from 'react';
import {HomeStyled} from './Dashboard.styled';
import Bubbles from './Bubbles'

const list = [
    "Favorites",
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

    function handlePush(item){
        console.log(item)
        if(currentPage && currentPage.localeCompare(item) !== 0){
            localStorage.getItem(PAGE_SELECTED)
            setCurrentPage(item)
        }
    }

    return (
        <HomeStyled currentPage={currentPage} >
            <>
            <h1>Trending </h1> 
            <h1>Sentiments</h1> 
            <ul>
               {list.map(item=> (
                    <li className={item} key={item}>
                      <button onClick={()=> handlePush(item)}>{item}</button>
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