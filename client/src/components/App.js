import React, {useState, useEffect} from 'react'
//This will be the entire layout 
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import HeroSection from './HeroSection/heroSection'
import About from './HeroSection/about'
import SignIn from './HeroSection/signin'
import SignUp from './HeroSection/signup'
import Navbar from './navbar/navbar'
import 'bootstrap/dist/css/bootstrap.min.css'

const LOGIN_KEY = 'currentUser';


export default function App() {

  // const [selectedPage, setSelectedPage] = useState(0)
  // const [currentUser, setCurrentUser] = useState(0)

  // const [topicList, setTopicsList] = useState(sentiments)

  // useEffect(()=> {
  //   //Store the username and change only when user changes
  //   localStorage.setItem(LOGIN_KEY, JSON.stringify(currentUser))
  // },[currentUser])

  // //firsttime
  // useEffect(()=>{
  //     //Set original on page load
  //     localStorage.setItem(LOGIN_KEY, JSON.stringify(topicList))
  // },[])


  return (
    <div>
     <Navbar/>
    </div>
  )
}


// <BrowserRouter>
// <Navbar/>

// <Switch>
//   <Route path='/' exact component={SignIn}></Route>  
//   <Route path='/signup' component={SignUp}></Route>
//   <Route path='/home' exact component={HeroSection}></Route>
//   <Route path='/about' component={About}></Route>

//   {/* if link is this, render whatever */}
//   <Route path='/home/:id' component/>
// </Switch>
// </BrowserRouter>