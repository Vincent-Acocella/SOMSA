import React from 'react'
import { bool, func } from 'prop-types';
import {StyledSearchIcon} from './SearchIcon.styled';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import {Link} from 'react-router-dom';

const SearchIcon = ({ open, setOpen, ...props }) => {
    const isExpanded = open ? true : false;
    return (
        <StyledSearchIcon>
          <Link to="/search"><FontAwesomeIcon icon={faSearch} size="2x" color="white"/></Link>
       </StyledSearchIcon>
    )
}
    SearchIcon.propTypes = {
        open: bool.isRequired,
        setOpen: func.isRequired,
      };

      export default SearchIcon;
