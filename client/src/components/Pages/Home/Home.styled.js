import styled from 'styled-components'

export const HomeStyled = styled.div`
position: absolute;
top: 50%;
left: 14%;
transform: translate(-50%, -50%);
text-align:left;
z-index: -1;
color: white;
font-size: 50px;
font-weight:bold;

ul {
   padding: 0px;
    text-align: left;
}


li {
    opacity: 0.3;
    margin-top: 20px;
    list-style-type: none;
    font-size: 40%;
    font-weight: normal;
    text-align:left;
}
`;