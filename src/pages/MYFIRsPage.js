import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Table, Badge, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';

const MYFIRsPage = ({ user, logout }) => {
  const [firs, setFirs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load FIRs from localStorage
    try {
      const allFirs = JSON.parse(localStorage.getItem('firs') || '[]');
      
      // Filter FIRs for the current user
      const userFirs = allFirs.filter(fir => fir.complainantEmail === user.email);
      
      // Sort by creation date (newest first)
      userFirs.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      
      setFirs(userFirs);
    } catch (error) {
      console.error('Error loading FIRs:', error);
    } finally {
      setLoading(false);
    }
  }, [user]);

  // Function to get status badge color
  const getStatusBadge = (status) => {
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

  return (
    <div className="d-flex flex-column min-vh-100">
      <Header user={user} logout={logout} />
      <Container className="flex-grow-1 py-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2>My FIRs</h2>
          <Button as={Link} to="/register-fir" variant="primary">
            Register New FIR
          </Button>
        </div>

        <Card className="shadow-sm">
          <Card.Body>
            {loading ? (
              <div className="text-center p-4">
                <div className="spinner-border text-primary" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
                <p className="mt-2">Loading your FIRs...</p>
              </div>
            ) : firs.length === 0 ? (
              <div className="text-center p-4">
                <p className="mb-3">You haven't filed any FIRs yet.</p>
                <Button as={Link} to="/register-fir" variant="primary">
                  Register Your First FIR
                </Button>
              </div>
            ) : (
              <Table responsive hover>
                <thead>
                  <tr>
                    <th>FIR Number</th>
                    <th>Incident Type</th>
                    <th>Date Filed</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {firs.map((fir) => (
                    <tr key={fir.id}>
                      <td>{fir.firNumber}</td>
                      <td>{fir.incidentType}</td>
                      <td>{new Date(fir.createdAt).toLocaleDateString()}</td>
                      <td>
                        <Badge bg={getStatusBadge(fir.status)}>
                          {fir.status}
                        </Badge>
                      </td>
                      <td>
                        <Button 
                          as={Link} 
                          to={`/fir-details/${fir.id}`} 
                          variant="outline-primary" 
                          size="sm"
                        >
                          View Details
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            )}
          </Card.Body>
        </Card>
      </Container>
      <Footer />
    </div>
  );
};

export default MYFIRsPage;