import styled from 'styled-components'

export const StyledSearchBar = styled.input`
  display: flex;
  opacity: 0.5;
  display: flex;
  flex-direction: column;
  justify-content: center;
  transform: ${({ open }) => open ? 'opacity: 0.5' : 'opacity: 1'};
  
  height: 2.5rem;
  background: transparent;
  border: none;
  position: absolute;
  z-index: 10;
  top: 4%;
  left: 25rem;
  hidden:true;
  transition: opacity .25s ease-in-out

  size:10rem;
  color: white;
  background-color: black;
  border: none;

font-family: Helvetica;
`;