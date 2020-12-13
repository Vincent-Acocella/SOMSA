import React, { Component } from 'react';
import {axios} from '../API/axios';
import {StyledAccount} from './Account.styled'
import blob_1 from '../../img/account_img/blob@1x.png'
import blob_2 from '../../img/account_img/blob-copy@1x.png'
import path_85 from '../../img/account_img/path-85@1x.png'
import path_86 from '../../img/account_img/path-86@1x.png'
import path_87 from '../../img/account_img/path-87@1x.png'
import path_88 from '../../img/account_img/path-88@1x.png'
import path_89 from '../../img/account_img/path-89@1x.png'
import path_90 from '../../img/account_img/path-90@1x.png'
import path_91 from '../../img/account_img/path-91@1x.png'
import path_92 from '../../img/account_img/path-92@1x.png'
import path_93 from '../../img/account_img/path-93@1x.png'
import path_94 from '../../img/account_img/path-94@1x.png'
import path_95 from '../../img/account_img/path-95@1x.png'
import path_96 from '../../img/account_img/path-96@1x.png'
import path_97 from '../../img/account_img/path-97@1x.png'
import path_98 from '../../img/account_img/path-98@1x.png'
import path_99 from '../../img/account_img/path-99@1x.png'
import ellipse_12 from '../../img/account_img/ellipse-12@1x.png'
import path_100 from '../../img/account_img/path-100@1x.png'
import path_101 from '../../img/account_img/path-101@1x.png'
import path_102 from '../../img/account_img/path-102@1x.png'
import path_105 from '../../img/account_img/path-105@1x.png'
import path_106 from '../../img/account_img/path-106@1x.png'
import path_107 from '../../img/account_img/path-107@1x.png'
import path_108 from '../../img/account_img/path-108@1x.png'
import path_109 from '../../img/account_img/path-109@1x.png'
import path_110 from '../../img/account_img/path-110@1x.png'
import path_111 from '../../img/account_img/path-111@1x.png'
import path_112 from '../../img/account_img/path-112@1x.png'
import path_113 from '../../img/account_img/path-113@1x.png'
import path_114 from '../../img/account_img/path-114@1x.png'
import path_115 from '../../img/account_img/path-115@1x.png'
import ellipse_13 from '../../img/account_img/ellipse-13@1x.png'

class Account extends Component {   
  constructor(props){
    super(props);
    this.state = {
        email: '',
        password: '',
        passwordAgain: '',
        error: false,
        errorMessage: ''
    };
}

handleSubmit = event => {
    
    if(this.state.password.localeCompare(this.state.passwordAgain) === 0){
        //Avoid page refresh
        event.preventDefault();
        //First is url
        axios.post('/user/changepassword', {
            email: this.state.email,
            password: this.state.password})
        .then(res => {
            console.log(res)
            this.props.user(res.data.email);
            localStorage.setItem('currentUser', res.data.email);
            // localStorage.setItem('favorites', JSON.stringify(res.data.favorites));
            this.props.logIn(1);
            this.props.history.push('/');
        }).catch(res => {
          
            this.setState({
                error:true,
                errorMessage: res.response.data.error
            })
        })
    }else{
        this.setState({
            error:true,
            errorMessage: 'Passwords do not Match'
        })
    }
}

handleChange = event => {
        this.setState({[event.target.name]: event.target.value});
}
   render(){ 
       return (
        <StyledAccount>


            <form onSubmit = {this.handleSubmit}>
                <input type ="email" size = "40" name= "email" placeholder="Email" required ={true} onChange = {this.handleChange}/>
                <br/>
                <input type ="password" size = "40" name= "password" placeholder="Password" required = {true} onChange = {this.handleChange}/>
                <br/>
                <input type ="password" size = "40" name= "passwordAgain" placeholder="Confirm Password" required = {true} onChange = {this.handleChange}/>
                <br/>
                <button type="submit">Complete</button>
            </form>




          
        {/* <div className="account-C61RwL">Account</div>
        <div className="rectangle-8-C61RwL"></div>
        <div className="rectangle-9-C61RwL"></div>
        <div className="email-C61RwL">Email</div>
        <div className="rectangle-10-C61RwL"></div>
        <div className="password-C61RwL helveticaneue-regular-normal-white-20px">Password</div>
        <div className="enter-new--word-below-C61RwL helveticaneue-regular-normal-white-20px">
          Enter New Password Below!
        </div>
        <div className="rectangle-24-C61RwL"></div>
        <div className="confirm-password-C61RwL helveticaneue-regular-normal-white-20px">Confirm Password<br /></div>
        <div className="rectangle-12-C61RwL"></div>
        <div className="confirm-C61RwL">Confirm</div> */}
        <img className="blob-C61RwL" src={blob_1} />
        <img className="blob-copy-C61RwL" src={blob_2} />
        <div className="undrawsweethomedkhr-C61RwL">
          <img className="path-85-3tBtWJ" src={path_85} />
          <img className="path-86-3tBtWJ" src={path_86} />
          <img className="path-87-3tBtWJ" src={path_87} />
          <img className="path-88-3tBtWJ" src={path_88} />
          <img className="path-89-3tBtWJ" src={path_89} />
          <img className="ellipse-12-3tBtWJ" src={ellipse_12} />
          <img className="path-90-3tBtWJ" src={path_90} />
          <img className="path-91-3tBtWJ" src={path_91} />
          <img className="path-92-3tBtWJ" src={path_92} />
          <img className="path-93-3tBtWJ" src={path_93} />
          <img className="path-94-3tBtWJ" src={path_94} />
          <img className="path-95-3tBtWJ" src={path_95} />
          <img className="path-96-3tBtWJ" src={path_96} />
          <img className="path-97-3tBtWJ" src={path_97} />
          <img className="path-98-3tBtWJ" src={path_98} />
          <img className="path-99-3tBtWJ" src={path_99} />
          <img className="path-100-3tBtWJ" src={path_100} />
          <img className="path-101-3tBtWJ" src={path_101} />
          <img className="path-102-3tBtWJ" src={path_102} />
          <div className="rectangle-25-3tBtWJ"></div>
          <img className="path-105-3tBtWJ" src={path_105} />
          <img className="path-106-3tBtWJ" src={path_106} />
          <img className="ellipse-13-3tBtWJ" src={ellipse_13} />
          <img className="path-107-3tBtWJ" src={path_107} />
          <img className="path-108-3tBtWJ" src={path_108} />
          <img className="path-109-3tBtWJ" src={path_109} />
          <img className="path-110-3tBtWJ" src={path_110} />
          <img className="path-111-3tBtWJ" src={path_111} />
          <img className="path-112-3tBtWJ" src={path_112} />
          <img className="path-113-3tBtWJ" src={path_113} />
          <img className="path-114-3tBtWJ" src={path_114} />
          <img className="path-115-3tBtWJ" src={path_115} />
        </div>
            
        </StyledAccount>
    )}
}

export default Account;
