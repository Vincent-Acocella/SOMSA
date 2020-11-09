import React, { Component } from 'react'
import SingleCard from './SingleCard'
// import DisplayAPI from '.../API/DisplayAPI/ArticleAPI'
import '../../../css/display.css'

class AllDisplayedCards extends Component {
  constructor() {
    super();
    this.state = {
      sentiments: []
    };
  }

  render() {
    return ( 
      <div className="cardStack">
        {
        this.state.sentiments.map(sentiment=>{
            return <SingleCard key = {sentiment.id} {...sentiment} ></SingleCard>}
        )}
      </div>
    );
  }
}

export default AllDisplayedCards;