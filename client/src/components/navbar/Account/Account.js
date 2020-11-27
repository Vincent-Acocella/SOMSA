import React from 'react'
import Cookie from 'universal-cookie'
import { StyledAccount } from './Account.styled'

//This will be the account redirect... It will check for sign in. If Signed in grab email without @
//If not proft for sign in page 

const cookie = new Cookie();

  const Account = ({ open, setOpen, ...props }) => {

    //Check if cookie exists
    //This class dedermines what shows up in the top right
    console.log("Hello")
    console.log(cookie.getAll());

    return (
        <>
    <StyledAccount>
    </StyledAccount> 
    </>
    )
}
export default Account;