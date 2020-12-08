import styled from 'styled-components';

export const StyledNav = styled.nav`
  align-items: center;
  display: flex;
  flex-flow: row nowrap;
  -webkit-font-smoothing: antialiased;
  height: 56px;
  padding: 0 30px;

  h2 {
    position: absolute;
    top: 7%;
    color: white;
    z-index: 10;
    padding: 0;
    font-weight:bold;
    left:35rem;left: 50%;
    transform: translate(-50%, -50%);
    font-size: 3.5rem;
  }

  h3 {
    position: absolute;
    top: 4.25%;
    color: white;
    z-index: 10;
    padding: 0;
    font-size: 1.5rem;
    font-weight:bold;
    left: 5rem;
  }
  h1{
    position: absolute;
    top: 5.25%;
    color: white;
    z-index: 10;
    padding: 0;
    font-size: 1.5rem;
    font-weight:bold;
    left: 70rem;
  }

  
`;