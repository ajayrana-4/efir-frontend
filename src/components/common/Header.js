import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { FaUserCircle, FaSignOutAlt } from 'react-icons/fa';

const Header = ({ user, logout }) => {
  const navigate = useNavigate();
  
  const handleLogout = () => {
    if (logout) {
      logout();
    }
    navigate('/');
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="mb-4">
      <Container>
        <Navbar.Brand as={Link} to="/">
          <img
            src="/assets/images/logo.png"
            width="40"
            height="40"
            className="d-inline-block align-top me-2"
            alt="eFIR Logo"
          />
          eFIR
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">Home</Nav.Link>
            <Nav.Link as={Link} to="/about">About</Nav.Link>
            <Nav.Link as={Link} to="/enquiry">Enquiry</Nav.Link>
            
            {/* Add these links that only appear when user is logged in */}
            {user && (
              <>
                <Nav.Link as={Link} to="/register-fir">Register FIR</Nav.Link>
                <Nav.Link as={Link} to="/fir-enquiry">Check FIR Status</Nav.Link>
                <Nav.Link as={Link} to="/my-firs">My FIRs</Nav.Link>
              </>
            )}
          </Nav>
          
          <Nav>
            {user ? (
              <>
                <Nav.Link as={Link} to="/profile" className="d-flex align-items-center">
                  <FaUserCircle className="me-1" /> {user.name || 'Profile'}
                </Nav.Link>
                <Button 
                  variant="outline-light" 
                  size="sm" 
                  onClick={handleLogout} 
                  className="ms-2 d-flex align-items-center"
                >
                  <FaSignOutAlt className="me-1" /> Logout
                </Button>
              </>
            ) : (
              <>
                <Nav.Link as={Link} to="/register">Register</Nav.Link>
                <Nav.Link as={Link} to="/login">Login</Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;