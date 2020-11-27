
import axios from './axios'



export const UserSignIn = (user)=> await axios.post('/user/signin', {user})
        .then(res => {
            console.log({res})
        }).catch(res => {
            console.log({res});
        })


export const UserSignUp = (user) => await axios.post('./user/signup', {user} )


export const UserSignOut = () => axios.get('./user/signout')