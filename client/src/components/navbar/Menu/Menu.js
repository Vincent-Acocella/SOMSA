import React from 'react';
import { StyledMenu } from './Menu.styled';
import { bool } from 'prop-types';

const Menu = ({ open, ...props }) => {
  
  const isHidden = open ? true : false;
  const tabIndex = isHidden ? 0 : -1;

  return (
    <StyledMenu open={open} aria-hidden={!isHidden} {...props}>
      <a href="/about" tabIndex={tabIndex}>
        <span aria-hidden="true">💁🏻‍♂️</span>
        About us
      </a>
      <a href="/account" tabIndex={tabIndex}>
        <span aria-hidden="true">📩</span>
        Account
        </a>
    </StyledMenu>
  )
}

Menu.propTypes = {
  open: bool.isRequired,
}


export default Menu;
