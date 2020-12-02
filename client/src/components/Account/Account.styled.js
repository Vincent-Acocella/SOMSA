import styled from 'styled-components';

export const StyledAccount = styled.div`
position: fixed;
top: 40%;
left: 50%;
transform: translate(-50%, -50%);
text-align:center;
input {
    background: transparent;
    border: 1px solid black;
    border-radius: 4px;
    padding: 2px;
    margin-top: 5px;
    margin-bottom: 5px;
    text-align: center;
    white opacity 30%;
    color: white;
    
}
h2 {
    text-align: center;
    font-size: 10px;
    color: white;
    font-weight: bold
    opacity: 0.3
}
h1 {
    text-align: center;
    font-size: 40px;
    color: white;
    font-weight: bold
    
}
hr {
    color: #b2ffff;
    size: 10px;
    filter: brightness(3.00);
}
button {
    margin-right: 200px;
    text-decoration: none;
    cursor: pointer;
    border-radius: 20px;
    border:none;
    font-size: 15px;
    padding: 8px 30px;
    background-color: #b2ffff;
}
div {
    margin-left: 200px;
    margin-top: -35px;
    text-decoration: none;
    cursor: pointer;
    border-radius: 20px;
    border:none;
    font-size: 15px;
    padding: 8px 30px;
    background-color: #b2ffff;
}
button:hover {
    border: #b2ffff;
}
input:hover {
    border: 3px solid #2C698D;
}
`;