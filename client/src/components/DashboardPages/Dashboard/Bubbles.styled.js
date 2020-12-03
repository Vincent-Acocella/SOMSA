import styled from 'styled-components'


export const BubblesStyled = styled.div`
position: fixed;
top: 40%;
left: 302%;
transform: translate(-50%, -50%);
text-align:center;

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
