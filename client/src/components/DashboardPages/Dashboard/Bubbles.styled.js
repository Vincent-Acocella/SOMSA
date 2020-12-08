import styled from 'styled-components'


export const BubblesStyled = styled.div`
position: fixed;
top: 60%;
left: 302%;
transform: translate(-50%, -50%);
text-align:center;
height: 400px;
width: 700px;
overflow:auto;
-ms-overflow-style: none

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
${({ open }) => open ? 'rotate(45deg)' : 'rotate(0)'};
li{
    text-align:center;
    display: ${({length}) => length>2 ? 'inline-block' : 'block'};
    padding-bottom: 20px;
    width 100%
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
    border:1px;
    font-size: 15px;
    padding: 8px 35px;
   
}
div {
    margin-left: 189px;
    margin-top: -38px;
}
button:hover {
    border: #b2ffff;
}
input:hover {
    border: 3px solid #b2ffff;
}
`;
