import styled from 'styled-components'


export const BubblesStyled = styled.div`
position: fixed;
top: 40%;
left: 302%;
transform: translate(-50%, -50%);
text-align:center;
height: 500px;
width: 800px;
overflow:auto;
-ms-overflow-style: none

input {
    background: transparent;
    border: 1px solid grey;
    border-radius: 4px;
    padding: 2px;
    margin-top: 7px;
    margin-bottom: 7px;
    text-align: center;
    color: white;
    z-index:0;
    
}
h2 {
    text-align: center;
    font-size: 12px;
    color: white;
    font-weight: bold;
    opacity: 0.35;
}
h1 {
    text-align: center;
    font-size: 40px;
    color: white;
    font-weight: bold;
    
}
hr {
    color: #b2ffff;
    size: 10px;
    filter: brightness(3.00);
li{
    text-align:center;
    display: ${({length}) => length>2 ? 'inline-block' : 'block'};
    padding-bottom: 20px;
 
    width 100%;
}
ul {
    list-style-type: none;
    columns: 2;
    -webkit-columns: 2;
    -moz-columns: 2;
    column-rule: dotted 1px #333;
    list-style-position: inside;
}

button {
    text-decoration: none;
    cursor: pointer;
    border-radius: 20px;
    border:none;
    text-align:center;
    display:incline-block;
    font-weight: bold;
    opacity: 60%;
    
    padding: 8px 35px;
    background-color: #3f3d56;
    height: 150px;
    width: 250px;
}
div {
    margin-left: 189px;
    margin-top: -38px;
}

button:hover {
    border: #b2ffff;
}
`;
