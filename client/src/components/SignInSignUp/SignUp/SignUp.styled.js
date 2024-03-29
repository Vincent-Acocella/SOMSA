import styled from 'styled-components'

export const StyledSignUp = styled.div`

position: fixed;
top: 40%;
left: 50%;
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
    font-size: 10px;
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
    border:none;
    font-size: 15px;
    padding: 8px 35px;
    background-color: #b2ffff;
}
div {
    margin-left: 189px;
    margin-top: -38px;
}
button:hover {
    border: #b2ffff;
}
.undraw-social-interaction-cy9i@1x {
    background-color: transparent;
    height: 444px;
    left: 20%;
    position: absolute;
    top: 50%;
    width: 887px;
  }
input:hover {
    border: 3px solid #b2ffff;
}
`;
