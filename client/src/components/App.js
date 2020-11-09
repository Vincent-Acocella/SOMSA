import React, {useState} from 'react'
import '../css/app.css';
import Display from './display/Display'
//This will be the entire layout 

//export const ReactContext = ReactContext.createContext()
//const LOCAL_STORAGE_KEY = 'username'

function App() {
  const [selectedPage, setSelectedPage] = useState(0)

  return (
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
  )
}
export default App;
