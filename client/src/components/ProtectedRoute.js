import React from 'react'
import {Route, Redirect} from 'react-router-dom'

export const ProtectedRoute = ({component: Component, user, status, ...rest}) => {
    return (
        <Route
         {...rest} 
         render = {(props) => {
             console.log(status)
             if(status === 1){
                return <Component {...props} status = {status} user = {user}/>;
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
             if('/home/signout'.localeCompare(props.location.pathname) === 0){
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
                if(!status){
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
