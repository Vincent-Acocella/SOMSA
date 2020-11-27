import styled from 'styled-components';

export const StyledAccount = styled.button`
  position: absolute;
  top: 4%;
  left: 20rem;
  display: flex;
  justify-content: space-around;
  width: 2rem;
  height: 2rem;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  z-index: 10;


    a.attrs({
        href:"/signin",
         onClick: evt => {
        evt.preventDefault();
    })
    a {

        display: flex;
        text-align: center;
        text-decoration: none;
        color: white;
        font-weight: bold;

    }

`;