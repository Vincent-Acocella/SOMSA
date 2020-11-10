import React, {useEffect, useState} from 'react'
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

const LOCAL_STORAGE_KEY = 'username';

export default function Header() {
    const [user , setUser] = useState()

    

  useEffect(()=> {
    //Store the username and change only when user changes
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(user))
  },[user])

  useEffect(()=>{
      //Set original on page load
  },[])

    return (
        <div>
            <SignIn/>
        </div>
    )





}