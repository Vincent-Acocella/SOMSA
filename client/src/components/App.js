import React, {useEffect,useState} from 'react'
//This will be the entire layout 
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import {Home} from './SignInSignUp'
import Navbar from './navbar/Navbar'
import Dashboard from './DashboardPages/Dashboard'
import { ThemeProvider } from 'styled-components';
import {theme} from './theme'
import {ProtectedRoute, UnProtectedRoute} from './ProtectedRoute'


const LOGIN_KEY = 'currentUser';

export const UserContext = React.createContext();

export default function App() {

  // const [selectedPage, setSelectedPage] = useState(0)
  const [logInState, setLogInState] = useState("none")
  const [currentUser, setCurrentUser] = useState("potato")

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

      <UnProtectedRoute
        exact
        path={"/home:where"}
        component={Home}
      />
  

      <Route
        exact
        path={"/"}
        render={props => (
          <Dashboard
            {...props}
            loggedInStatus={this.state.loggedInStatus}
          />
        )}
      />
      <Route path="*" component={()=> "Insert Default dance Emote"}/>      
      </Switch>
       
       
    {/* if link is this, render whatever */}
    {/* <Route path='/home/:id' component/> */}
      
  </BrowserRouter>
  )
}
