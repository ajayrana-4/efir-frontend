import React, { useState } from 'react';
import { Container, Card, Form, Button, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';

const RegisterFIRPage = ({ user, logout }) => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    incidentType: '',
    incidentDate: '',
    incidentLocation: '',
    description: '',
    accusedName: '',
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    // Clear error when user changes a field
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    const { incidentType, incidentDate, incidentLocation, description } = formData;

    if (!incidentType) newErrors.incidentType = 'Please select an incident type';
    if (!incidentDate) newErrors.incidentDate = 'Incident date is required';
    if (!incidentLocation) newErrors.incidentLocation = 'Incident location is required';
    if (!description || description.length < 20) {
      newErrors.description = 'Please provide a detailed description (at least 20 characters)';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      // Generate FIR ID
      const firId = `FIR${Date.now().toString().slice(-6)}`;
      
      // Create FIR object
      const firData = {
        id: firId,
        firNumber: firId,
        complainantName: user.name,
        complainantPhone: user.phone || 'Not provided',
        complainantEmail: user.email,
        ...formData,
        status: 'Filed',
        createdAt: new Date().toISOString(),
        updates: [
          {
            date: new Date().toISOString(),
            status: 'Filed',
            comment: 'FIR has been filed successfully'
          }
        ]
      };

      // Get existing FIRs from localStorage or initialize new array
      const existingFIRs = JSON.parse(localStorage.getItem('firs') || '[]');
      
      // Add new FIR
      existingFIRs.push(firData);
      
      // Save back to localStorage
      localStorage.setItem('firs', JSON.stringify(existingFIRs));

      // Success message
      toast.success('FIR registered successfully! Your FIR number is ' + firId);

      // Navigate to "My FIRs" page
      navigate('/my-firs');
    } catch (error) {
      console.error('Error registering FIR:', error);
      toast.error('Failed to register FIR. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="d-flex flex-column min-vh-100">
      <Header user={user} logout={logout} />
      <Container className="flex-grow-1 py-4">
        <h2 className="mb-4">Register New FIR</h2>
        <Card className="shadow-sm">
          <Card.Header className="bg-primary text-white">
            <h5 className="mb-0">FIR Registration Form</h5>
          </Card.Header>
          <Card.Body className="p-4">
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>Incident Type*</Form.Label>
                <Form.Select 
                  name="incidentType"
                  value={formData.incidentType}
                  onChange={handleChange}
                  isInvalid={!!errors.incidentType}
                >
                  <option value="">Select Incident Type</option>
                  <option value="Theft">Theft</option>
                  <option value="Robbery">Robbery</option>
                  <option value="Assault">Assault</option>
                  <option value="Burglary">Burglary</option>
                  <option value="Fraud">Fraud</option>
                  <option value="Vandalism">Vandalism</option>
                  <option value="Other">Other</option>
                </Form.Select>
                <Form.Control.Feedback type="invalid">
                  {errors.incidentType}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Incident Date*</Form.Label>
                <Form.Control
                  type="date"
                  name="incidentDate"
                  value={formData.incidentDate}
                  onChange={handleChange}
                  max={new Date().toISOString().split('T')[0]}
                  isInvalid={!!errors.incidentDate}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.incidentDate}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Incident Location*</Form.Label>
                <Form.Control
                  type="text"
                  name="incidentLocation"
                  value={formData.incidentLocation}
                  onChange={handleChange}
                  placeholder="Enter location where incident occurred"
                  isInvalid={!!errors.incidentLocation}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.incidentLocation}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Accused Name (if known)</Form.Label>
                <Form.Control
                  type="text"
                  name="accusedName"
                  value={formData.accusedName}
                  onChange={handleChange}
                  placeholder="Enter name of accused person (if known)"
                />
              </Form.Group>

              <Form.Group className="mb-4">
                <Form.Label>Description of Incident*</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={4}
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Provide a detailed description of the incident"
                  isInvalid={!!errors.description}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.description}
                </Form.Control.Feedback>
              </Form.Group>

              <div className="d-flex justify-content-between">
                <Button variant="secondary" onClick={() => navigate('/')}>
                  Cancel
                </Button>
                <Button 
                  variant="primary" 
                  type="submit" 
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Submitting...' : 'Register FIR'}
                </Button>
              </div>
            </Form>
          </Card.Body>
        </Card>
      </Container>
      <Footer />
    </div>
  );
};

export default RegisterFIRPage;