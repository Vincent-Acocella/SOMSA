import React, { Component } from 'react'
import {axios} from '../../API/axios'

export default class SignIn extends Component {
    state = {
        email: '',
        password: '',
    };
    handleSubmit = event => {

        //Avoid page refresh
        event.preventDefault();

        const user = {
            email: this.state.email,
            password: this.state.password
        };

        console.log(user)

        //First is url
       axios.post('/user/signin', {user})
        .then(res => {
            console.log({res})
        }).catch(res => {
            console.log({res});
        })
    }

    handleChange = event => {
            this.setState({[event.target.name]: event.target.value});
    }
   render(){ return (
        <div className ="guest--format">

            <form onSubmit = {this.handleSubmit}>
                <label>
                    Email:
                    <input type ="text" name= "email" onChange = {this.handleChange}/>
                </label>
                <label>
                    Password:
                    <input type ="text" name= "password" onChange = {this.handleChange}/>
                </label>
                <button type="submit">Sign In</button>
            </form>
    </div>
    )}
}
