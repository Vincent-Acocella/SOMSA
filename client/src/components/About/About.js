import React, { Component } from 'react';
import {StyledAbout} from './About.styled';
import scrum from '../../img/undraw-scrum-board-re-wk7v@1x.png'
import post_img from '../../img/undraw-post-online-re-1b82@1x.png'


class About extends Component {   

   render(){ 
       return (
        <StyledAbout>

        <div className="about-our-project-C61RwL">About Our Project!</div>
        <div className="our-team-i-on-that-wo-C61RwL">
          Our team is comprised of five senior undergraduate students at Marist College. SOMSA was developed as a part
          of our senior capstone project advised by Dr. Juan Arias. <br /><br />The objective of SOMSA was to create a
          machine learning powered web application that would return the sentiment and confidence interval of popular
          events from around the world. Our data was acquired from popular social media sites using a in-house web
          crawler.<br /><br />We developed our system during the fall semester of 2020. Now time to meet our team!<br /><br />
        </div>
        <img className="undraw-scr-oardrewk7v-C61RwL" src={scrum} />
        <div className="the-team-C61RwL">The Team!</div>
        <div className="the-develo-ct-manager-C61RwL">
          The development team was comprised of three software developers. Anthony Griggs, Ceara Kalfas, and Vincent
          Acocella. Vincent and Ceara are majoring in Computer Science and Anthony is double majoring in Computer
          Science and Game Design.<br /><br />The project manager was Kyle Ryan. Kyle is majoring in Information
          Systems. Lastly, Tom Cannistraci was our team’s Information Technology Specialist and is majoring in
          Information Technology.
        </div>
        <img className="undraw-pos-linere1b82-C61RwL" src={post_img} />

        </StyledAbout>
    )}
}

export default (About)