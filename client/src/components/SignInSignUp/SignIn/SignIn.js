import React, { Component } from 'react';
import {axios} from '../../API/axios';
import {StyledSignIn} from './SignIn.styled';
import {Link, withRouter} from 'react-router-dom';
import auth from '../../Auth';


class SignIn extends Component {   


    
    state = {
        email: '',
        password: '',
        error: false,
        errorMessage: ''
    }  
    
    handleSubmit = event => {

        //Avoid page refresh
        event.preventDefault();
        //First is url
       axios.post('/user/signin', {
           email: this.state.email,
            password: this.state.password})
        .then(res => {
            console.log(res.data.email)
            localStorage.setItem('currentUser', res.data.email);
            localStorage.setItem('favorites', JSON.stringify(res.data.favorites));
            auth.login(()=> {
                this.props.history.push('/');
            })
        }).catch(res => {
            this.setState({
                error: true,
                errorMessage: res.response.data.error
            })
        })
    }

    handleChange = event => {
            this.setState({[event.target.name]: event.target.value});
    }

   render(){ 
       return (
        <StyledSignIn>
           
            <h1>Sign in to Account</h1>
            <hr color="#2C698D"/>
            <h2>Hi! Log in or Sign Up Below</h2>
            {this.state.error && <h2 style ={{color: "red"}}>{this.state.errorMessage}</h2>}
 
            <form onSubmit = {this.handleSubmit}>
                    <input type ="email" size = "40" name= "email"  placeholder="Email" required = {true} onChange = {this.handleChange}/>
               <br/>
                    <input type ="password" size = "40" name= "password" placeholder="Password" required = {true} onChange = {this.handleChange}/>
                <br/>    
                <button type="submit">Sign In</button>
            </form>
            <div>
                <Link to="home/signup">Sign Up</Link>
            </div>
            
        </StyledSignIn>
    )}
}

export default withRouter(SignIn)