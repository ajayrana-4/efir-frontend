import React, { useEffect } from 'react';
import { Container, Row, Col, Card, Button, Form } from 'react-bootstrap';
import { toast } from 'react-toastify';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';

const ProfilePage = ({ user, logout }) => {
  const [isEditing, setIsEditing] = React.useState(false);
  const [formData, setFormData] = React.useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
  });

  // Update form data when user prop changes
  useEffect(() => {
    setFormData({
      name: user?.name || '',
      email: user?.email || '',
      phone: user?.phone || '',
    });
  }, [user]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Create updated user object
    const updatedUser = {
      ...user,
      name: formData.name,
      phone: formData.phone
    };
    
    // Save to localStorage
    localStorage.setItem('user', JSON.stringify(updatedUser));
    
    // Force a page reload to refresh the user state from localStorage
    window.location.reload();
    
    // Show success message
    toast.success('Profile updated successfully');
    
    // Exit edit mode
    setIsEditing(false);
  };

  return (
    <div className="d-flex flex-column min-vh-100">
      <Header user={user} logout={logout} />
      <Container className="flex-grow-1 py-4">
        <h2 className="mb-4">User Profile</h2>
        
        <Row>
          <Col md={8} className="mx-auto">
            <Card className="shadow-sm">
              <Card.Header className="bg-primary text-white">
                <h5 className="mb-0">Personal Information</h5>
              </Card.Header>
              <Card.Body>
                {isEditing ? (
                  <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                      <Form.Label>Full Name</Form.Label>
                      <Form.Control
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                      />
                    </Form.Group>
                    
                    <Form.Group className="mb-3">
                      <Form.Label>Email Address</Form.Label>
                      <Form.Control
                        type="email"
                        value={formData.email}
                        disabled
                      />
                      <Form.Text className="text-muted">
                        Email address cannot be changed
                      </Form.Text>
                    </Form.Group>
                    
                    <Form.Group className="mb-4">
                      <Form.Label>Phone Number</Form.Label>
                      <Form.Control
                        type="text"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="Enter your phone number"
                      />
                    </Form.Group>
                    
                    <div className="d-flex justify-content-end">
                      <Button 
                        variant="secondary" 
                        className="me-2"
                        onClick={() => setIsEditing(false)}
                      >
                        Cancel
                      </Button>
                      <Button variant="primary" type="submit">
                        Save Changes
                      </Button>
                    </div>
                  </Form>
                ) : (
                  <>
                    <Row className="mb-3">
                      <Col md={3} className="fw-bold">Full Name:</Col>
                      <Col md={9}>{user?.name}</Col>
                    </Row>
                    
                    <Row className="mb-3">
                      <Col md={3} className="fw-bold">Email Address:</Col>
                      <Col md={9}>{user?.email}</Col>
                    </Row>
                    
                    <Row className="mb-3">
                      <Col md={3} className="fw-bold">Phone Number:</Col>
                      <Col md={9}>{user?.phone || 'Not provided'}</Col>
                    </Row>
                    
                    <Row className="mb-3">
                      <Col md={3} className="fw-bold">Account Type:</Col>
                      <Col md={9}>{user?.role === 'citizen' ? 'Citizen' : user?.role}</Col>
                    </Row>
                    
                    <div className="d-flex justify-content-end">
                      <Button 
                        variant="primary" 
                        onClick={() => setIsEditing(true)}
                      >
                        Edit Profile
                      </Button>
                    </div>
                  </>
                )}
              </Card.Body>
            </Card>
            
            <Card className="shadow-sm mt-4">
              <Card.Header className="bg-primary text-white">
                <h5 className="mb-0">Account Settings</h5>
              </Card.Header>
              <Card.Body>
                <div className="d-grid">
                  <Button 
                    variant="danger" 
                    onClick={logout}
                  >
                    Log Out
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
      <Footer />
    </div>
  );
};

export default ProfilePage;