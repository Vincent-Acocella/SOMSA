import React, { Component } from 'react'
import {axios} from '../../API/axios'
import {StyledSignUp} from './SignUp.styled'
import {withRouter} from 'react-router-dom'
import auth from '../../Auth';
import social_interaction from '../../../img/undraw-social-interaction-cy9i@1x.png'

 class SignUp extends Component {
     constructor(props){
        super(props);
        this.state = {
            email: '',
            password: '',
            passwordAgain: '',
            error: false,
            errorMessage: ''
        };
}

    handleSubmit = event => {
        
        if(this.state.password.localeCompare(this.state.passwordAgain) === 0){
            //Avoid page refresh
            event.preventDefault();
            //First is url
            console.log("HELP ME HELP you")
            axios.post('/user/signup', {
                email: this.state.email,
                password: this.state.password})
            .then(res => {
                console.log(res)
                this.props.user(res.data.email);
                localStorage.setItem('currentUser', res.data.email);
                // localStorage.setItem('favorites', JSON.stringify(res.data.favorites));
                auth.login(()=> {
                this.props.logIn(1);
                this.props.history.push('/');
            })
            }).catch(res => {
              
                this.setState({
                    error:true,
                    errorMessage: res.response.data.error
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
    }

   render(){ 
       return (
        <StyledSignUp>
            
            <h1>Hello, Friend!</h1>
            <h1>Let's Set Up Your Account!</h1>
            {this.state.error && <h2 style ={{color: "red"}}>{this.state.errorMessage}</h2>}
            <hr color="#2C698D"/>
            <h2>Fill out the form below to get started</h2>

            <img className="undraw-social-interaction-cy9i@1x" src={social_interaction} />

            <form onSubmit = {this.handleSubmit}>
                <input type ="email" size = "40" name= "email" placeholder="Email" required ={true} onChange = {this.handleChange}/>
                <br/>
                <input type ="password" size = "40" name= "password" placeholder="Password" required = {true} onChange = {this.handleChange}/>
                <br/>
                <input type ="password" size = "40" name= "passwordAgain" placeholder="Confirm Password" required = {true} onChange = {this.handleChange}/>
                <br/>
                <button type="submit">Complete</button>
            </form>

        </StyledSignUp>
    )}
}

export default withRouter(SignUp);