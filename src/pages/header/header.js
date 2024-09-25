import React from 'react'
import { Container, Image, Nav, Navbar } from 'react-bootstrap'
import { Link } from 'react-router-dom';
import './header.css'
import img from '../../images/aroopa.png'


const Header = () => {
  return (
    <>
      <Navbar>
         <Container>
            <Image src={img} className='p-2 w-25'/>
            <Navbar.Brand as={Link} to="/"><strong>Employee Management System</strong></Navbar.Brand>
            <Nav className='ml-auto'>
             <Nav.Link as={Link} to="/dashboard" ><strong>View Table Data</strong></Nav.Link>
            </Nav>
         </Container>
      </Navbar>
    </>
  )
}

export default Header