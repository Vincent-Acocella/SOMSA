import React, {useContext} from 'react'
import ReactDom from 'react-dom'
import Guest from './options/Guest'
import '../../css/modal.css'

/*
This the the actual pop up mewnu 
it will be used for sign in such as sign in, create account, admin view and user view
*/

const POPUP_STYLE = {
    position: 'fixed',
    top: '40%',
    left: '40%',
    trasform: 'translate(-50%, -50%)',
    backgroundColor: '#FFF',
    padding: '50px',
    zindex: 1000
}

const OVERLAY_STYLE = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0, .7)',
    zindex: 1000
}


function Modal({open, onClose, pageLoad}) {
    

    const guestPop = ReactDom.createPortal(
        <>
        <div style = {OVERLAY_STYLE}>
            <div className="overhead--format" style = {POPUP_STYLE}>    
            <button className="close overhead--closebtn"  aria-label="Close" onClick = {onClose}><span aria-hidden="true">&times;</span></button> 
                {/* This is where the other modules will go */}
               <Guest/>
                 
            </div>  
        </div>
        </>,
        document.getElementById('popout')
    ) 

    if(!open){
        return null
    }else{
         return guestPop;
    }
}
export default Modal