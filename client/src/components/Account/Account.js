import React, { Component } from 'react';
import {axios} from '../API/axios';
import {StyledAccount} from './Account.styled'

class Account extends Component {   
    constructor(props) {
        super(props);

        this.state = {
            currentpassword: '',
            newPassword: '',
            passwordAgain: '',
            error: false,
            errorMessage: '',
            success: false,
            sucessMessage: ''
        };  
    }
    
    handleSubmit = event => {
        //Avoid page refresh
        event.preventDefault();
        //First is url
       axios.post('/user/change', {
            current: this.state.currentpassword,
            new: this.state.newPassword,
            again: this.state.passwordAgain})
        .then(res => {
            this.setState({
                success:true,
                sucessMessage: "You did it kid"
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
        <StyledAccount>
           
            <h1>Hello {this.props.user}</h1>
            <h2>Change Password</h2>
            <hr color="#2C698D"/>
           
            {this.state.error && <h2 style ={{color: "red"}}>{this.state.errorMessage}</h2>}
            {this.state.success && <h2 style ={{color: "green"}}>{this.state.sucessMessage}</h2>}
            <form onSubmit = {this.handleSubmit}>
                    <input type ="password" size = "40" name= "currentpassword"  placeholder="Current Password" required = {true} onChange = {this.handleChange}/>
               <br/>
                    <input type ="password" size = "40" name= "newpassword" placeholder=" New Password" required = {true} onChange = {this.handleChange}/>
                    <input type ="password" size = "40" name= "passwordagain" placeholder="Password Again" required = {true} onChange = {this.handleChange}/>
                <br/>    
                <button type="submit">Change Password</button>
            </form>
            <h2>Wanna Set your Favorites.... </h2>
            <h2>Wait until SOMSA 2.0 releases in 2024</h2>
            <h2>For Now, Enjoy this! Or don't up to you</h2>
            
        </StyledAccount>
    )}
}

export default Account;
