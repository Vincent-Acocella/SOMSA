import React from 'react'
import {Route, Redirect} from 'react-router-dom'
import auth from './Auth'

export const ProtectedRoute = ({component: Component, ...rest}) => {
    return (
        <Route
         {...rest} 
         render = {(props) => {
             if(auth.isAuthenticated()){

                return <Component {...props}/>;

             }else{

                 return <Redirect to={
                 {
                     pathname: '/',
                     state: {
                         from: props.location
                     }
                 }
                  } />
            }
        }}/>
    )
}

export const UnProtectedRoute = ({component: Component, status, setCurrentUser, setLogIn, ...rest}) => {
    return (
        <Route
         {...rest} 
         render = {(props) => {
             if('/home/signout'.localeCompare(props.location.pathname)===0){
                 setLogIn(0)
                 return <Redirect to={
                    {
                        pathname: '/',
                        state:{
                            from:props.location
                        }
                    }
                     } />
             }else{
                 console.log(status)
             if(!status){
                 console.log("Hello")
                return <Component { ...props} user ={setCurrentUser} logIn = {setLogIn}/>;
             }else{
                return <Redirect to={
                    {
                        pathname: '/',
                        state:{
                            from:props.location
                        }
                    }
                     } />
            }
        }
        }}/>
    )
}
