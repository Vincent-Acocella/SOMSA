import React, {useEffect,useState} from 'react'
//This will be the entire layout 
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import SignIn from './Pages/SignIn/SignIn'
import SignUp from './Pages/SignUp/SignUp'
import Navbar from './navbar/Navbar'
import 'bootstrap/dist/css/bootstrap.min.css'
import { ThemeProvider } from 'styled-components';
import {theme} from './theme'

const LOGIN_KEY = 'currentUser';

export default function App() {

  // const [selectedPage, setSelectedPage] = useState(0)
  const [currentUser, setCurrentUser] = useState(null)

  // const [topicList, setTopicsList] = useState(sentiments)
  useEffect(()=> {
    //Store the username and change only when user changes
    let curUser = localStorage.getItem(LOGIN_KEY);
    console.log(curUser)
    if(curUser !== null) setCurrentUser(JSON.parse(curUser));
  },[])
  
  useEffect(()=> {
    //Store the username and change only when user changes
    localStorage.setItem(LOGIN_KEY, JSON.stringify(currentUser));

  },[currentUser])

  

  // //firsttime
  // useEffect(()=>{
  //     //Set original on page load
  //     localStorage.setItem(LOGIN_KEY, JSON.stringify(topicList))
  // },[])

  return (
    <BrowserRouter>
    <ThemeProvider theme={theme}>
      <Navbar currentUser = {currentUser} setCurrentUser = {setCurrentUser}/> 
    </ThemeProvider>
      <Switch>
      
        <Route path='/signin' exact component={SignIn}/>   
        <Route path='/signup' exact component={SignUp}/>

    {/* if link is this, render whatever */}
    {/* <Route path='/home/:id' component/> */}
      </Switch>
  </BrowserRouter>

  )
}
