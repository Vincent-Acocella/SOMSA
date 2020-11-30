import React from 'react'
import SignUp from '../SignUp/SignUp'
import SignIn from '../SignIn/SignIn'

export default function Home({match}) {
    
    if(match.localeCompare('signin')){
        return (<SignIn/>)

    }else{
        return (<SignUp/>)
    }
}
