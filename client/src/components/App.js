import React, {useState, useEffect} from 'react'
import '../css/app.css';
import Display from './display/Display'
import Header from './header/Header'
//This will be the entire layout 


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

function App() {

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
    <div>

      <div>
          <Header
          user = {currentUser}
          setUser = {setCurrentUser}/>
      </div>

      <div>
        <div className = "main">
          <h1>
            Trending <br/> Sentiments
          </h1>

          <ul className="trending-sentiment-list">
            <li>
            <button onClick = {()=>  setSelectedPage(1)} className="btn catagory-btn">Hot Topics</button> 
            </li>
            <li>
            <button onClick = {()=> setSelectedPage(2)} className="btn catagory-btn">Sports</button>
            </li>
            <li>
            <button onClick = {()=> setSelectedPage(3)} className="btn catagory-btn">Politics</button>
            </li>
          </ul>
        </div>

        <div className= "display-all-cards">
          <Display currentPage = {selectedPage}/>
        </div>
      </div>

    </div>
  )
}
export default App;
