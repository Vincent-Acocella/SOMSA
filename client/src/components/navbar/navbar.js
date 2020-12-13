import React, {useState, useRef} from 'react'
import { Burger, Menu, SearchBar, SearchIcon} from '.';
import { useOnClickOutside } from '../hooks';
import FocusLock from 'react-focus-lock';
import {StyledNav} from './Navbar.styled';
import {Link} from 'react-router-dom';


export default function Navbar({ status}) {

  const [open_burg, setOpen_burg] = useState(false);
  const [open_ser, setOpen_ser] = useState(false);
  const burger = useRef();
  const menuId = "main-menu";
  let disLink = "";
  let userToShow = "";

  if(status){
    disLink = "signout";
    userToShow = "Sign Out";
  }else{
    disLink = "signin";
    userToShow = "REGISTER/SIGN IN";
  }

  useOnClickOutside(burger, () => setOpen_burg(false));

    return (
      <StyledNav>
        <>
          <div ref={burger}>
            <FocusLock disabled={!open_burg}>
              <Burger open={open_burg} setOpen={setOpen_burg} aria-controls={menuId} />
              <Menu open={open_burg} setOpen={setOpen_burg} id={menuId} />
            </FocusLock>
          </div>
          <h3>MENU</h3>

          <FocusLock disabled={!open_ser}>
            <SearchIcon/>
            
          </FocusLock>
          
          <Link to= "/">
            <h2>SOMSA</h2>
          </Link>
          
          <Link to= {`/home/${disLink}`}>
            <h1 style = {{marginRight: "20px"}}>{userToShow}</h1> 
          </Link>  
      </>
    </StyledNav>
    )
}

