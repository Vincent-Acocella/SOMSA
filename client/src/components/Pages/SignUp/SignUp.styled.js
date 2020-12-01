import styled from 'styled-components'

export const StyledSignUp = styled.div`
    position: fixed;
    top: 40%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align:center;
    input {
        background: transparent;
        border: 1px solid white;
        border-radius: 4px;
        padding: 2px;
        margin-top: 5px;
        margin-bottom: 5px;
        text-align: center;
        text-color: white;
    }
    
    h1 {
        text-align: center;
        font-size: 40px;
        color: white;
        font-weight: bold
        
    }
    
    button {
        margin-left: 200px;
        text-decoration: none;
        cursor: pointer;
        border-radius: 20px;
        border:none;
        font-size: 15px;
        padding: 8px 30px;
    }

    button:hover {
        background-color: #3e8e41
    }

    input:hover {
        border: 3px solid black
    }
`;