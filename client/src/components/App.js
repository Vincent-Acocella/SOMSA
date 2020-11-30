import React, {useEffect,useState} from 'react'
//This will be the entire layout 
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import SignIn from './Pages/SignIn/SignIn'
import SignUp from './Pages/SignUp/SignUp'
import Home from './Pages/Home/Home'
import Navbar from './navbar/Navbar'
import 'bootstrap/dist/css/bootstrap.min.css'
import { ThemeProvider } from 'styled-components';
import {theme} from './theme'
import SpecificPage from './Pages/SpecificPage/SpecificPage'


const LOGIN_KEY = 'currentUser';

export const UserContext = React.createContext();

export default function App() {

  // const [selectedPage, setSelectedPage] = useState(0)
  const [currentUser, setCurrentUser] = useState(null)

  // const [topicList, setTopicsList] = useState(sentiments)
  useEffect(()=> {
    //Store the username and change only when user changes
    let curUser = localStorage.getItem(LOGIN_KEY);
    console.log(curUser)
    if(curUser !== null) setCurrentUser(JSON.parse(curUser));
  },[]);
  
  useEffect(()=> {
    //Store the username and change only when user changes
    localStorage.setItem(LOGIN_KEY, JSON.stringify(currentUser));
  },[currentUser]);

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
       <Route path='/signin' exact render={(props) => ( <SignIn user = {currentUser}/> )}/>  
       <Route path='/signup' exact render={(props) => ( <SignUp setCurrentUser = {setCurrentUser}/> )}/>
      </Switch>
       <Route path='/home/'  component={Home}></Route>
       {/* <Route path='/home/:name'  component ={SpecificPage}/> */}
       
    {/* if link is this, render whatever */}
    {/* <Route path='/home/:id' component/> */}
      
  </BrowserRouter>
  )
}
