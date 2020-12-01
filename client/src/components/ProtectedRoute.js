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

export const UnProtectedRoute = ({component: Component, id, ...rest}) => {
    return (
        <Route
         {...rest} 
         render = {(props) => {
             if('/home/signout'.localeCompare(props.location.pathname)===0){
                 localStorage.removeItem('currentUser')
                 return <Redirect to={
                    {
                        pathname: '/',
                        state:{
                            from:props.location
                        }
                    }
                     } />
             }else{
                 
             
             if(!id){
                return <Component {...props}/>;
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



function HomeWeGo(){
    
}


