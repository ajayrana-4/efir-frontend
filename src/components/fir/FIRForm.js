import React, { useState } from 'react';
import { Form, Button, Card, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Formik } from 'formik';
import * as Yup from 'yup';

// FIR validation schema
const FIRSchema = Yup.object().shape({
  complainantName: Yup.string().required('Complainant name is required'),
  complainantPhone: Yup.string()
    .matches(/^[0-9]{10}$/, 'Phone number must be 10 digits')
    .required('Phone number is required'),
  complainantAddress: Yup.string().required('Address is required'),
  accusedName: Yup.string(),
  incidentDate: Yup.date().required('Incident date is required')
    .max(new Date(), 'Incident date cannot be in the future'),
  incidentLocation: Yup.string().required('Incident location is required'),
  incidentType: Yup.string().required('Please select incident type'),
  description: Yup.string()
    .min(20, 'Description must be at least 20 characters')
    .required('Description is required'),
});

const FIRForm = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Mock form submission
  const handleSubmit = async (values, { resetForm }) => {
    setIsSubmitting(true);
    
    try {
      // In a real app, this would be an API call
      console.log('FIR Form Values:', values);
      
      // Simulate server processing
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Show success message
      toast.success('FIR submitted successfully!');
      resetForm();
      
      // Redirect to dashboard
      navigate('/dashboard');
    } catch (error) {
      toast.error('Failed to submit FIR. Please try again.');
      console.error('Error submitting FIR:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="shadow-sm">
      <Card.Header className="bg-primary text-white">
        <h5 className="mb-0">Register New FIR</h5>
      </Card.Header>
      <Card.Body>
        <Formik
          initialValues={{
            complainantName: '',
            complainantPhone: '',
            complainantAddress: '',
            accusedName: '',
            incidentDate: '',
            incidentLocation: '',
            incidentType: '',
            description: '',
          }}
          validationSchema={FIRSchema}
          onSubmit={handleSubmit}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
          }) => (
            <Form onSubmit={handleSubmit}>
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Complainant Name *</Form.Label>
                    <Form.Control
                      type="text"
                      name="complainantName"
                      value={values.complainantName}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isInvalid={touched.complainantName && errors.complainantName}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.complainantName}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Complainant Phone *</Form.Label>
                    <Form.Control
                      type="text"
                      name="complainantPhone"
                      value={values.complainantPhone}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isInvalid={touched.complainantPhone && errors.complainantPhone}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.complainantPhone}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
              </Row>

              <Row>
                <Col md={12}>
                  <Form.Group className="mb-3">
                    <Form.Label>Complainant Address *</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={2}
                      name="complainantAddress"
                      value={values.complainantAddress}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isInvalid={touched.complainantAddress && errors.complainantAddress}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.complainantAddress}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
              </Row>

              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Accused Name (if known)</Form.Label>
                    <Form.Control
                      type="text"
                      name="accusedName"
                      value={values.accusedName}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Incident Date *</Form.Label>
                    <Form.Control
                      type="date"
                      name="incidentDate"
                      value={values.incidentDate}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isInvalid={touched.incidentDate && errors.incidentDate}
                      max={new Date().toISOString().split('T')[0]}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.incidentDate}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
              </Row>

              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Incident Location *</Form.Label>
                    <Form.Control
                      type="text"
                      name="incidentLocation"
                      value={values.incidentLocation}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isInvalid={touched.incidentLocation && errors.incidentLocation}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.incidentLocation}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Incident Type *</Form.Label>
                    <Form.Select
                      name="incidentType"
                      value={values.incidentType}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isInvalid={touched.incidentType && errors.incidentType}
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
                </Col>
              </Row>

              <Form.Group className="mb-3">
                <Form.Label>Incident Description *</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={4}
                  name="description"
                  value={values.description}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isInvalid={touched.description && errors.description}
                  placeholder="Please provide detailed description of the incident..."
                />
                <Form.Control.Feedback type="invalid">
                  {errors.description}
                </Form.Control.Feedback>
              </Form.Group>

              <div className="d-flex justify-content-between mt-4">
                <Button variant="secondary" onClick={() => navigate('/dashboard')}>
                  Cancel
                </Button>
                <Button variant="primary" type="submit" disabled={isSubmitting}>
                  {isSubmitting ? 'Submitting...' : 'Submit FIR'}
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </Card.Body>
    </Card>
  );
};

export default FIRForm;