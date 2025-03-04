import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { FaUserCircle, FaSignOutAlt } from 'react-icons/fa';

const Header = ({ user, logout }) => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const handleLogout = () => {
    if (logout) {
      logout();
    }
    navigate('/');
  };

  const handleAboutClick = (e) => {
    e.preventDefault();
    
    // If we're already on the home page, just scroll to the section
    if (location.pathname === '/') {
      document.getElementById('about-section')?.scrollIntoView({ behavior: 'smooth' });
    } else {
      // Otherwise navigate to home page with query parameter
      navigate('/?scrollTo=about');
    }
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
            <Nav.Link href="#" onClick={handleAboutClick}>About</Nav.Link>
            
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