import React from 'react'
import MainContainer from '../maincontainer/mainContainer'
import Heading from '../header/heading'
import CTA from '../CTA/cta'

export default function signin() {

    // handleSubmit = event => {

    //     //Avoid page refresh
    //     event.preventDefault();

    //     const user = {
    //         email: this.state.email,
    //         password: this.state.password
    //     }

    //     //First is url
    //    axios.post('/user/signIn', {user})
    //     .then(res => {
    //         console.log({res})
    //     }).catch(res => {
    //         console.log({res});
    //     })
    // }

    // handleChange = event => {
    //         this.setState({[event.target.name]: event.target.value});
    // }
    
    return (
       <MainContainer>
            <Heading>Sign in to Account</Heading>

            <form 
            // onSubmit = {this.handleSubmit}
            >
                    <label>
                        Email:
                        <input type ="text" name= "email" 
                        // onChange = {this.handleChange}
                        />
                    </label>
                    <label>
                        Password:
                        <input type ="text" name= "password"
                        //  onChange = {this.handleChange}
                         />
                    </label>
                    <button type="submit">Sign In</button>
                </form>
            <CTA target = '/signup'>Sign Up </CTA>
        </MainContainer>
    )
}