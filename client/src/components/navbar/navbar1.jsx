import React, {useState} from 'react'
import {Link} from 'react-router-dom';
import './navbar.css'
import CTA from '../CTA/cta'
import {
    
  Navbar,
  Button,
  FormControl,
  NavDropdown,
  Form,
  Nav
  
} from 'react-bootstrap'

export default function Navbar1() {
    
    return (

        <div>
          <Navbar bg="light" expand="lg">
            <Navbar.Brand href="/home">React-Bootstrap</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">

              <Nav className="mr-auto">
                <Nav.Link href="/">Home</Nav.Link>
                <Nav.Link href="/link">Link</Nav.Link>
                <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                  <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                </NavDropdown>
              </Nav>

              <Form inline>
              <FormControl type="text" placeholder="Search" className="mr-sm-2" />
              <Button variant="outline-success">Search</Button>
              </Form>

            </Navbar.Collapse>
          </Navbar>
        </div>

        // <div className ='main-header'>
        //     <div classname='logo-container'>
        //         <Link className='link logo' to='/'> Somsa</Link>
        //     </div>
        //     <nav className='main-nav'>
        //         <ul classname='nav-list'>
        //             <li className='nav-item'>
        //                 <Link to='/' classname='link nav-link'> Home</Link>
        //             </li>
        //             <li className='nav-item'>
        //                 <Link to='/about' classname='link nav-link'> About</Link>
        //             </li>
        //             <li>
        //                 <CTA target='/signin'>Account</CTA>
        //             </li>
        //         </ul>
        //     </nav>
        // </div>
    )
}
