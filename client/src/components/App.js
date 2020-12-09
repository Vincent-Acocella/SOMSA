import React, {useEffect,useState} from 'react';
//This will be the entire layout 
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import {Home} from './SignInSignUp';
import Navbar from './Navbar/navbar';
import Dashboard from './DashboardPages/Dashboard';
import { ThemeProvider } from 'styled-components';
import {theme} from './theme';
import {ProtectedRoute, UnProtectedRoute} from './ProtectedRoute';
import ErrorPage from './DashboardPages/ErrorPage';
import Account from './Account/Account'
import About from './About/About'
//import Navbar from './navbar/navbar'
const LOGIN_KEY = 'currentUser';
// const FAVORITES = 'favorites';
const STATUS = 'signedin';

export const UserContext = React.createContext();

export default function App() {

  const [currentUser, setCurrentUser] = useState("x");
  const [isLoggedin, setLogIn] = useState(0);
  // const [FAVORITES, setFavorites] = useState({});
 
  //Set what we need on refresh
  useEffect(()=> {
    
    let status = parseInt(localStorage.getItem(STATUS));

    if(( status !==null)) setLogIn(status);
      
    if(isLoggedin){
      let curUser = localStorage.getItem(LOGIN_KEY);
      // let favorites = localStorage.getItem(FAVORITES);
      // if(favorites !== {}) setFavorites(favorites)
      if(curUser !== 0) setCurrentUser(curUser);
    }
  },[]);

  useEffect(()=>{
    localStorage.setItem(STATUS, isLoggedin);
  }, [isLoggedin])

  return (
    <BrowserRouter>
    <ThemeProvider theme={theme}>
    <Navbar status = {isLoggedin}/> 
    </ThemeProvider>
      <Switch>

      <Route
      exact
      user = {currentUser}
      status = {isLoggedin}
      path={"/account"}
      component={Account}/>

      <UnProtectedRoute
        exact
        status = {isLoggedin}
        setLogIn = {setLogIn}
        setCurrentUser = {setCurrentUser}
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

      <Route
        exact
        path={"/About"}
        render={props => (
          <About
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