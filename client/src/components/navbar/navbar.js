import React, {useState, useRef} from 'react'
import styled from 'styled-components';
import { Burger, Menu, SearchBar, SearchIcon, Account } from '.';
import { useOnClickOutside } from '../hooks';
import FocusLock from 'react-focus-lock';
import {StyledNav} from './Navbar.styled'


const SomsaHeader = styled.a.attrs({
  href:"#",
   onClick: evt => {
  evt.preventDefault();
}})`
    display: flex;
    text-align: center;
    text-decoration: none;
    color: white;
    font-weight: bold;
  
`;

const Account_btn = styled.a.attrs({
  href:"/account",
 })`
    display: flex;
    text-align: center;
    text-decoration: none;
    color: white;
    font-weight: bold;
    left: 50rem;

`;

export default function Navbar() {

  const [open_burg, setOpen_burg] = useState(false);
  const [open_ser, setOpen_ser] = useState(false);
  const burger = useRef();
  const menuId = "main-menu";

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
            <SearchIcon open={open_ser} setOpen={setOpen_ser} aria-controls={menuId}/>
            <SearchBar open={open_ser} setOpen={setOpen_ser} />
          </FocusLock>
          

          <SomsaHeader>
            <h2> SOMSA</h2>
          </SomsaHeader>
          
      </>
    </StyledNav>

    )
}
