import React from 'react'
import { bool, func } from 'prop-types';
import {StyledSearchIcon} from './SearchIcon.styled';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'

const SearchIcon = ({ open, setOpen, ...props }) => {
    const isExpanded = open ? true : false;
    return (
        <StyledSearchIcon aria-label="Toggle menu" aria-expanded={isExpanded} open={open} onClick={() => setOpen(!open)} {...props}>
          <span><FontAwesomeIcon icon={faSearch} size="2x" color="white"/></span>
       </StyledSearchIcon>
    )
}

    SearchIcon.propTypes = {
        open: bool.isRequired,
        setOpen: func.isRequired,
      };

      export default SearchIcon;
