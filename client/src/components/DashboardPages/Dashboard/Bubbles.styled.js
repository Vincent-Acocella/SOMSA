import styled from 'styled-components'


export const BubblesStyled = styled.div`
position: fixed;
top: 60%;
left: 407%;
transform: translate(-50%, -50%);
text-align:center;
height: 500px;
overflow:scroll;
-ms-overflow-style: none
flex-flow: row nowrap;
-webkit-font-smoothing: antialiased;
::-webkit-scrollbar {
    width: 0px;
    background: transparent; /* make scrollbar transparent */
}
li{
    text-align:center;
    display: ${({length}) => length>2 ? 'inline-block' : 'block'};
    padding-bottom: 20px;
    font-size: 30px;
    word-wrap: break-word;
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
    overflow:hidden;
    text-decoration: none;
    cursor: pointer;
    border-radius: 20px;
    border:none;
    text-align:center;
    display:inline;
    font-weight: bold;
    opacity: 65%;
    padding: 8px 35px;
    background-color: #3f3d56;
    height: 200px;
    width: 400px;
}
button:hover {
    border: #b2ffff;
}
`;