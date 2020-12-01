import React, {useEffect,useState} from 'react'
//This will be the entire layout 
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import {Home} from './SignInSignUp'
import Navbar from './Navbar/Navbar'
import Dashboard from './DashboardPages/Dashboard'
import { ThemeProvider } from 'styled-components';
import {theme} from './theme'
import {ProtectedRoute, UnProtectedRoute} from './ProtectedRoute'
import ErrorPage from './DashboardPages/ErrorPage'
import auth from './Auth'
const LOGIN_KEY = 'currentUser';
const FAVORITES = 'favorites';

export const UserContext = React.createContext();

export default function App() {

  // const [selectedPage, setSelectedPage] = useState(0)
  const [currentUser, setCurrentUser] = useState(0);
  const [FAVORITES, setFavorites] = useState({});

  // const [topicList, setTopicsList] = useState(sentiments)
  useEffect(()=> {
    //Store the username and change only when user changes
    let curUser = localStorage.getItem(LOGIN_KEY);
    let favorites = localStorage.getItem(FAVORITES);
  
    if(favorites !== {}) setFavorites(favorites)
    if(curUser !== 0) setCurrentUser(curUser);

  },[]);

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
        id = {currentUser}
        path={"/home/:name"}
        component={Home}
      />

      <Route
        exact
        path={"/"}
        render={props => (
          <Dashboard
            {...props}
          />
        )}
      />

      <Route path="*" component={ErrorPage}/>
      </Switch>

       
       
    {/* if link is this, render whatever */}
    {/* <Route path='/home/:id' component/> */}
      
  </BrowserRouter>
  )
}