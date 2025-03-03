import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Badge, Button } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { mockFIRData } from '../../config/db';

const FIRDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [fir, setFir] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In a real app, this would fetch data from backend
    // For frontend demo, we use mock data
    const fetchFIR = async () => {
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Find FIR from mock data
        const foundFIR = mockFIRData.find(item => item._id === id);
        
        if (foundFIR) {
          setFir(foundFIR);
        } else {
          toast.error('FIR not found');
          navigate('/dashboard');
        }
      } catch (error) {
        console.error('Error fetching FIR details:', error);
        toast.error('Failed to load FIR details');
      } finally {
        setLoading(false);
      }
    };

    fetchFIR();
  }, [id, navigate]);

  // Function to get status badge color
  const getStatusBadge = (status) => {
    switch (status?.toLowerCase()) {
      case 'under investigation':
        return 'warning';
      case 'resolved':
        return 'success';
      case 'closed':
        return 'secondary';
      case 'rejected':
        return 'danger';
      case 'filed':
        return 'info';
      default:
        return 'primary';
    }
  };

  if (loading) {
    return (
      <div className="text-center p-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-3">Loading FIR details...</p>
      </div>
    );
  }

  if (!fir) {
    return (
      <div className="text-center p-5">
        <h3>FIR Not Found</h3>
        <p>The requested FIR could not be found.</p>
        <Button variant="primary" onClick={() => navigate('/dashboard')}>
          Back to Dashboard
        </Button>
      </div>
    );
  }

  return (
    <div>
      <Card className="shadow-sm mb-4">
        <Card.Header className="bg-white d-flex justify-content-between align-items-center">
          <h5 className="mb-0">FIR Details</h5>
          <Badge bg={getStatusBadge(fir.status)} className="px-3 py-2">
            {fir.status}
          </Badge>
        </Card.Header>
        <Card.Body>
          <Row className="mb-4">
            <Col md={6}>
              <h6 className="text-muted mb-2">FIR Number</h6>
              <p className="fw-bold fs-5">{fir.firNumber}</p>
            </Col>
            <Col md={6}>
              <h6 className="text-muted mb-2">Filed Date</h6>
              <p>{new Date(fir.createdAt).toLocaleDateString()}</p>
            </Col>
          </Row>
          
          <h6 className="border-bottom pb-2 mb-3">Complainant Information</h6>
          <Row className="mb-4">
            <Col md={6}>
              <h6 className="text-muted mb-2">Name</h6>
              <p>{fir.complainantName}</p>
            </Col>
            <Col md={6}>
              <h6 className="text-muted mb-2">Phone</h6>
              <p>{fir.complainantPhone}</p>
            </Col>
          </Row>
          
          <h6 className="border-bottom pb-2 mb-3">Incident Details</h6>
          <Row className="mb-3">
            <Col md={4}>
              <h6 className="text-muted mb-2">Date</h6>
              <p>{new Date(fir.incidentDate).toLocaleDateString()}</p>
            </Col>
            <Col md={4}>
              <h6 className="text-muted mb-2">Location</h6>
              <p>{fir.incidentLocation}</p>
            </Col>
            <Col md={4}>
              <h6 className="text-muted mb-2">Type</h6>
              <p>{fir.incidentType}</p>
            </Col>
          </Row>
          
          <Row className="mb-4">
            <Col md={12}>
              <h6 className="text-muted mb-2">Description</h6>
              <p>{fir.description}</p>
            </Col>
          </Row>
          
          <h6 className="border-bottom pb-2 mb-3">Case Information</h6>
          <Row>
            <Col md={6}>
              <h6 className="text-muted mb-2">Accused Name</h6>
              <p>{fir.accusedName || 'Not Specified'}</p>
            </Col>
            <Col md={6}>
              <h6 className="text-muted mb-2">Assigned Officer</h6>
              <p>{fir.assignedOfficer || 'Not Assigned'}</p>
            </Col>
          </Row>
        </Card.Body>
        <Card.Footer className="bg-white">
          <div className="d-flex justify-content-between">
            <Button variant="outline-secondary" onClick={() => navigate('/dashboard')}>
              Back
            </Button>
            <div>
              <Button variant="outline-primary" className="me-2">
                <i className="fas fa-print me-1"></i> Print
              </Button>
              <Button variant="primary">
                <i className="fas fa-edit me-1"></i> Update Status
              </Button>
            </div>
          </div>
        </Card.Footer>
      </Card>
    </div>
  );
};

export default FIRDetails;