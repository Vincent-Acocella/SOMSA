//Header Component 
//Import Component section of react
import React, {Component} from 'react'
import SignIn from './signIn'

//All code inside will be a react component that we can render
export default class Header extends Component{
    constructor(props){
        super(props)

        this.state ={
            count: props.initialCount
        }
    }

    render(){
        return(
            <>
            <SignIn/>
            </>
        )
    }

    changeCount(amount){
        //Asyncronus Function setState
        //calling prevState allows multiple calls
        //Anytime that previous state to update current state you have to use fuction
        this.setState(prevState => {
           return { count: prevState.count + amount}
        })
    }
}