import React, { useState } from 'react';
import { Container, Card, Form, Button, Alert } from 'react-bootstrap';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';

const FIREnquiryPage = ({ user, logout }) => {
  const [firNumber, setFirNumber] = useState('');
  const [firData, setFirData] = useState(null);
  const [error, setError] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    setError('');
    setFirData(null);
    
    if (!firNumber.trim()) {
      setError('Please enter an FIR number');
      return;
    }
    
    setIsSearching(true);
    
    try {
      // Get FIRs from localStorage
      const firs = JSON.parse(localStorage.getItem('firs') || '[]');
      
      // Find the FIR with matching number
      const foundFir = firs.find(fir => fir.firNumber === firNumber.trim());
      
      if (foundFir) {
        setFirData(foundFir);
      } else {
        setError('No FIR found with the provided number');
      }
    } catch (error) {
      console.error('Error searching for FIR:', error);
      setError('An error occurred while searching. Please try again.');
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <div className="d-flex flex-column min-vh-100">
      <Header user={user} logout={logout} />
      <Container className="flex-grow-1 py-4">
        <h2 className="mb-4">Check FIR Status</h2>
        
        <Card className="shadow-sm mb-4">
          <Card.Body className="p-4">
            <Form onSubmit={handleSearch}>
              <Form.Group className="mb-3">
                <Form.Label>Enter FIR Number</Form.Label>
                <div className="d-flex">
                  <Form.Control
                    type="text"
                    value={firNumber}
                    onChange={(e) => setFirNumber(e.target.value)}
                    placeholder="e.g., FIR123456"
                  />
                  <Button 
                    variant="primary" 
                    type="submit" 
                    className="ms-2"
                    disabled={isSearching}
                  >
                    {isSearching ? 'Searching...' : 'Search'}
                  </Button>
                </div>
              </Form.Group>
            </Form>
            
            {error && <Alert variant="danger">{error}</Alert>}
          </Card.Body>
        </Card>
        
        {firData && (
          <Card className="shadow-sm">
            <Card.Header className="bg-primary text-white">
              <h5 className="mb-0">FIR Details - {firData.firNumber}</h5>
            </Card.Header>
            <Card.Body>
              <div className="mb-4">
                <h6>Complainant Information</h6>
                <p className="mb-1"><strong>Name:</strong> {firData.complainantName}</p>
                <p className="mb-1"><strong>Contact:</strong> {firData.complainantPhone}</p>
                <p className="mb-0"><strong>Email:</strong> {firData.complainantEmail}</p>
              </div>
              
              <div className="mb-4">
                <h6>Incident Details</h6>
                <p className="mb-1"><strong>Type:</strong> {firData.incidentType}</p>
                <p className="mb-1"><strong>Date:</strong> {new Date(firData.incidentDate).toLocaleDateString()}</p>
                <p className="mb-1"><strong>Location:</strong> {firData.incidentLocation}</p>
                <p className="mb-0"><strong>Accused:</strong> {firData.accusedName || 'Not specified'}</p>
              </div>
              
              <div className="mb-4">
                <h6>Current Status</h6>
                <div className="p-3 bg-light rounded">
                  <p className="mb-1"><strong>Status:</strong> <span className={`badge bg-${getStatusBadgeColor(firData.status)}`}>{firData.status}</span></p>
                  <p className="mb-0"><strong>Filed on:</strong> {new Date(firData.createdAt).toLocaleDateString()}</p>
                </div>
              </div>
              
              {firData.updates && firData.updates.length > 0 && (
                <div>
                  <h6>Status Updates</h6>
                  <div className="border rounded">
                    {firData.updates.map((update, index) => (
                      <div key={index} className={`p-3 ${index < firData.updates.length - 1 ? 'border-bottom' : ''}`}>
                        <div className="d-flex justify-content-between">
                          <strong>{update.status}</strong>
                          <small>{new Date(update.date).toLocaleDateString()}</small>
                        </div>
                        <p className="mb-0 mt-1">{update.comment}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </Card.Body>
          </Card>
        )}
      </Container>
      <Footer />
    </div>
  );
};

// Helper function to determine badge color based on status
const getStatusBadgeColor = (status) => {
  switch (status.toLowerCase()) {
    case 'filed':
      return 'info';
    case 'under investigation':
      return 'warning';
    case 'resolved':
      return 'success';
    case 'closed':
      return 'secondary';
    case 'rejected':
      return 'danger';
    default:
      return 'primary';
  }
};

export default FIREnquiryPage;