import React, { Component } from 'react'
import {axios} from '../../API/axios'
import {StyledSignUp} from './SignUp.styled'
import styled from 'styled-components'
import cookies from 'universal-cookie' 

const LogIn = styled.a.attrs({
    href:"/signin"
  })`
      text-decoration: none;
      color: white;
      font-weight: bold;
  `;

export default class Signup extends Component {
    state = {
        email: '',
        password: '',
        passwordAgain: ''
    };
    
    componentDidMount = event => {
        
        axios.get('/', (req, res) => {
            const cookiesRes = cookies.getAll()
            //const cookiesRes = cookies.getAll({ fromRes: true }) // get from res instead of req
            console.log(cookiesRes)
          
          })

    }

    handleSubmit = event => {

        //Avoid page refresh
        event.preventDefault();

        //First is url
       axios.post('/user/signup', {email: this.state.email, password: this.state.password })
        .then(res => {
           console.log(res.data.email)
        }).catch(res => {
            console.log({res});
        })
    }

    handleChange = event => {
            this.setState({[event.target.name]: event.target.value});
    }


   render(){ 
       return (
        <StyledSignUp>
            <>
            <h1>Hello, Friend!</h1>
            <h1>Let's Set Up Your Account!</h1>
            <hr/>

            <form onSubmit = {this.handleSubmit}>
                    <input type ="email" size = "40" name= "email" placeholder="Email" required ={true} onChange = {this.handleChange}/>
                 <br/>
                    <input type ="password" size = "40" name= "password" placeholder="Password" required = {true} onChange = {this.handleChange}/>
                <br/>
                <input type ="password" size = "40" name= "passwordAgain" placeholder="Confirm Password" required = {true} onChange = {this.handleChange}/>
                <br/>

                <button type="submit">Complete</button>
                
            </form>
            </>
        </StyledSignUp>
    )}
}