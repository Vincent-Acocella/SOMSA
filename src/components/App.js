import React, {useState} from 'react'
import '../css/app.css';
import Display from './Display'
//This will be the entire layout 

//export const ReactContext = ReactContext.createContext()
const LOCAL_STORAGE_KEY = 'username'


function App() {
  const [selectedPage, setSelectedPage] = useState(0)

  // useEffect(()=> {
  //   const recipeJSON = localStorage.getItem(LOCAL_STORAGE_KEY)
  //   if (recipeJSON != null) setRecipes(JSON.parse(recipeJSON))
  // })

  // useEffect(()=>{
  //   <Display selectedPage={selectedPage}/>
  // }, [], [selectedPage])

  function changeCatagory(id){
    setSelectedPage(id)
    console.log(selectedPage)
  }

  return (
    <div>
      <div className = "main">
        <h1>
          Trending <br/> Sentiments
        </h1>

        <ul className="trending-sentiment-list">
          <li>
          <button onClick = {() => changeCatagory(1)} className="btn catagory-btn">Hot Topics</button> 
          </li>
          <li>
          <button onClick = {()=>changeCatagory(2)} className="btn catagory-btn">Sports</button>
          </li>
          <li>
          <button onClick = {()=>changeCatagory(3)} className="btn catagory-btn">Politics</button>
          </li>
        </ul>
      </div>
      <div>
        <Display currentPage = {selectedPage}/>
      </div>
    </div>
  )
}


export default App;
