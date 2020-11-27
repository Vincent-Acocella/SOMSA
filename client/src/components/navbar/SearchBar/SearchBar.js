import React from 'react'
import {StyledSearchBar} from './SearchBar.styled'


const SearchBar = ({keyword,setKeyword}) => {
    // const BarStyling = {width:"20rem",background:"#F2F1F9", border:"none", padding:"0.5rem"};
  
    return (
        <StyledSearchBar  defaultValue="Search..." type= "text"/>
      
    //   <input 
       
    //    key="random1"
    //    value={keyword}
    //    placeholder={"search country"}
    //    onChange={(e) => setKeyword(e.target.value)}
    //   />
    );
  }
  export default SearchBar;