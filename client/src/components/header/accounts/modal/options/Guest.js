import React, { Component } from 'react'
import '../../../css/modal.css'
import {Card} from 'reactstrap'
import {axios} from '../../../../APIS/axios'
//mport axios from 'axios'

export default class Guest extends Component {
    state = {
        email: '',
        password: '',
    };

    // async componentDidMount(){
    //     await axios.get('/input',)
    //     .then(res =>
    //         {
    //             console.log(res)
    //         }).catch(err=>{
    //             console.log(err)
    //         })
    // }

 //Anythimg you want to pass to be handled on server side
     handleSubmit = event => {

        //Avoid page refresh
        event.preventDefault();

        const user = {
            email: this.state.email,
            password: this.state.password
        }

        //First is url
       axios.post('/user/add', {user})
        .then(res => {
            console.log({res})
        }).catch(res => {
            console.log({res});
        })
    }

    handleChange = event => {
            this.setState({[event.target.name]: event.target.value});
    }

render(){
    return (
        <div className ="guest--format">
            <Card>
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
            </Card>
        </div>
    )
    }
}