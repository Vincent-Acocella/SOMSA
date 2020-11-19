import React, {useState}  from 'react'
import Modal from './modal/Modal'

/*
Sign in uses use state to keep track of a popup component
*/

export default function SignIn() {
    
    const [isOpen, setIsOpen] = useState(false)

    //  switch(userType){
    //     case 0:
    //         break;
    //     case 1:
    //         break;
    //     case 2:
    //         break; 
    // }

    return (
        <div>
            <button className = "btn" onClick = {() => setIsOpen(true)}> Sign In</button>
            <Modal open = {isOpen} onClose={()=> setIsOpen(false)}>

            </Modal>
        </div>
    )
}