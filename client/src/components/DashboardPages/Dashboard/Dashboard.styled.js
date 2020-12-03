import styled from 'styled-components'

export const HomeStyled = styled.div`
position: absolute;
top: 50%;
left: 12%;
transform: translate(-50%, -50%);
text-align:left;
z-index: -1;
color: white;
font-size:  70px;
font-weight:bold;

.list {
   padding: 0px;
    text-align: left;
}
.sidebar {
    margin-top: 20px;
    list-style-type: none;
    font-size: 40%;
    font-weight: normal;
    text-align:left;
}

button{
    text-decoration: none;
    color white;
    opacity: 0.3;
    background: transparent;
    border:none;
}

button:hover{
    opacity: 100%;
}

`;
