import React from 'react';
import { bool } from 'prop-types';
import { StyledMenu } from './Menu.styled';

const Menu = ({ open, ...props }) => {
  
  const isHidden = open ? true : false;
  const tabIndex = isHidden ? 0 : -1;

  return (
    <StyledMenu open={open} aria-hidden={!isHidden} {...props}>
      <a href="/account" tabIndex={tabIndex}>
        <span aria-hidden="true">‍</span>
        Account 
      </a>
      <a href="/about" tabIndex={tabIndex}>
        <span aria-hidden="true"></span>
        About 
        </a>
    </StyledMenu>
  )
}

Menu.propTypes = {
  open: bool.isRequired,
}

export default Menu;
