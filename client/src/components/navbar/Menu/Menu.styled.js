import styled from 'styled-components';

export const StyledMenu = styled.nav`
  display: flex;
  flex-direction: column;
  justify-content: center;
  background: #3f3d56;
  transform: ${({ open }) => open ? 'translateX(0)' : 'translateX(-100%)'};
  height: 100vh;
  text-align: left;
  padding: 2rem;
  position: absolute;
  z-index:10;
  top: 0;
  left: 0;
  transition: transform 0.3s ease-in-out;

  a {
    font-size: 1rem;
    text-transform: uppercase;
    padding: 2rem 0;
    font-weight: bold;
    letter-spacing: 0.5rem;
    color: white;
    text-decoration: none;
    transition: color 0.3s linear;

    &:hover {
      color: ${({ theme }) => theme.primaryHover};
    }
  }
`;
