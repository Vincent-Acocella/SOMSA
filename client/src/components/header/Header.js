import React from 'react'
import SignIn from './accounts/SignIn'

/*
0 is sign in page
1 is User
2 is admin
Relearn Cashing
*/


//This is where the account context should be stored {useContext} 
/*
Header contains the entire top bar 
It will have the return home, search, drop down and sign in
*/
export default function Header() {

    return (
        <div>
            <SignIn/>
        </div>
    )
}