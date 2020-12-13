import React from 'react';
import SignUp from '../SignUp/SignUp';
import SignIn from '../SignIn/SignIn';

export default function Home({user, logIn, match,favorites}) {
    //Redirect to the needed sign in option

    if(match.params.name !==null && match.params.name.localeCompare('signin') === 0){
        return (<SignIn user = {user} favorites ={favorites} logIn ={logIn} />);
    }else{
        return (<SignUp user = {user} favorites ={favorites} logIn ={logIn}/>);
    }
}