import React, { Component } from 'react'
import {axios} from '../../Axios/axios'
import {StyledSignUp} from './SignUp.styled'


export default class Signup extends Component {
    state = {
        email: '',
        password: '',
        passwordAgain: '',
        error: false
    };
    
    componentDidMount = event => {
        
       console.log(this.state.error)

    }

    handleSubmit = event => {
        
        if(this.state.password.localeCompare(this.state.passwordAgain) === 0){
            //Avoid page refresh
            event.preventDefault();

            //First is url
            axios.post('/user/signup', {email: this.state.email, password: this.state.password })
            .then(res => {
                console.log(res.data.email)
            }).catch(res => {
                console.log({res});
            })
        }else{
            this.state.error = true
        }
    }

    handleChange = event => {
            this.setState({[event.target.name]: event.target.value});
            console.log(this.state.passwordAgain)
    }

   render(){ 
       return (
        <StyledSignUp>
            <>
            <h1>Hello, Friend!</h1>
            <h1>Let's Set Up Your Account!</h1>
            <hr/>

            

            <form onSubmit = {this.handleSubmit}>
                { 
                this.state.error && <h1> error </h1> 
                }
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