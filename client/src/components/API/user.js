
import {axios} from './axios'



export const UserSignIn = (user)=> axios.post('/user/signin', {user})
        .then(res => {
            console.log({res})
        }).catch(res => {
            console.log({res});
        })


export const UserSignUp = (user) =>  axios.post('/user/signup', {email: this.state.email, password: this.state.password })
        .then(res => {
            console.log("hello")
            console.log({res})
        }).catch(res => {
            console.log({res});
        })


export const UserSignOut = () => axios.get('./user/signout')