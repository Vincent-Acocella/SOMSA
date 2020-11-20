import React, {useState, useEffect} from 'react'
import '../css/app.css';
import Display from './display/Display'
//This will be the entire layout 
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import Navbar from './navbar/navbar1';
import HeroSection from './HeroSection/heroSection'
import About from './HeroSection/about'
import SignIn from './HeroSection/signin'
import SignUp from './HeroSection/signup'

const LOGIN_KEY = 'currentUser';

const sentiments = [
  {
      "id": 1,
      "name": "Hot Topics",
      "catagory": "politics",
      "reaction": 40
  },
  {
      "id": 2,
      "name": "Sports",
      "catagory": "sports",
      "reaction": 60
  }
];

export default function App() {

  const [selectedPage, setSelectedPage] = useState(0)
  const [currentUser, setCurrentUser] = useState(0)

  const [topicList, setTopicsList] = useState(sentiments)

  useEffect(()=> {
    //Store the username and change only when user changes
    localStorage.setItem(LOGIN_KEY, JSON.stringify(currentUser))
  },[currentUser])

  //firsttime
  useEffect(()=>{
      //Set original on page load
      localStorage.setItem(LOGIN_KEY, JSON.stringify(topicList))
  },[])


  return (
    <div className='main-header'>
      <div className='logo-container'>
          <BrowserRouter>
            <Navbar/>

            <Switch>
              <Route path='/' exact component={SignIn}></Route>  
              <Route path='/signup' component={SignUp}></Route>
              <Route path='/home' exact component={HeroSection}></Route>
              <Route path='/about' component={About}></Route>

              {/* if link is this, render whatever */}
              <Route path='/home/:id' component/>
            </Switch>
          </BrowserRouter>
      </div>
    </div>
  )
}

