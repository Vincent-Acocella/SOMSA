import React from 'react';
import styled from 'styled-components';

const StyledError = styled.nav`

    position: fixed;
    top: 40%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align:center;
    font-size: 40px;
    font-weight: bold;
    color:white;
`;

export default function ErrorPage() {
    return (
        <StyledError>

            Slow Down There Partner <br/>
            This Page doesn't Exist
            
        </StyledError>
    )
}
