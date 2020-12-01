import React, { Component } from 'react'
import {axios} from '../../API/axios'
import {StyledSignUp} from './SignUp.styled'
import {withRouter} from 'react-router-dom'
import auth from '../../Auth';

//30px
 class Signup extends Component {
    state = {
        email: '',
        password: '',
        passwordAgain: '',
        error: false,
        errorMessage: ''
    };

    handleSubmit = event => {
        
        if(this.state.password.localeCompare(this.state.passwordAgain) === 0){
            //Avoid page refresh
            event.preventDefault();

            //First is url
            axios.post('/user/signup', {email: this.state.email, password: this.state.password })
            .then(res => {
                localStorage.setItem('currentUser', JSON.stringify(res.data.email));
                localStorage.setItem('favorites', JSON.stringify(res.data.favorites));
                auth.login(()=> {
                    this.props.history.push('/');
                })
            }).catch(res => {
                this.setState({
                    error:true,
                    error: (res.response.data.error)
                })
            })
        }else{

            this.setState({
                error:true,
                errorMessage: 'Passwords do not Match'
            })
        }
    }

    handleChange = event => {
            this.setState({[event.target.name]: event.target.value});
            console.log(this.state.passwordAgain);
    }

   render(){ 
       return (
        <StyledSignUp>
            <>
            <h1>Hello, Friend!</h1>
            <h1>Let's Set Up Your Account!</h1>
            {this.state.error && <h2 style ={{color: "red"}}>{this.state.errorMessage}</h2>}
            <hr/>

            <form onSubmit = {this.handleSubmit}>
                { 
                this.state.error && <h1 style = {{color: "red"}}> {this.state.errorMessage} </h1> 
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

export default withRouter(Signup);