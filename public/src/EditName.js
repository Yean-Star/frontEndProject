import React, { useState, useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import glovalVars from './globalVar';
import monkeyBook from './image/monkeyhandsup.png';

import './App.css';

function EditName(prop) {
  const { token, updateName } = prop;
  const [errorMessage, setErrorMessage] = useState('');
  const [form, setForm] = useState({
    firstname: '',
    lastname: '',
    email: '',
    password: '',
  });
  const navigate = useNavigate();

  useEffect(() => {
    const url = glovalVars.hostUrl + '/student';
    const bodyData = JSON.stringify(({ email:token.email }));
    const headerInfo = {
      method: 'POST',
      body: bodyData,
      headers: {
        'Content-Type': 'application/json',
        authorization: 'Bearer ' + token.token,
      },
    };
    fetch(url,headerInfo) 
      .then(response => response.json())
      .then(data => {
        // Handle the retrieved student information
        console.log(data);
        // Update the form fields with the student's data
        setForm({
          firstname: data[0].name,
          lastname: data[0].lastname,
          email: data[0].email,
          password: data[0].password, // Exclude the password for security reasons
        });
      })

      
      .catch(error => {
        console.error('Error fetching student information:', error);
      });
    
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent the default form submission behavior
  
    // Make an API request to update the student's name
    const url = glovalVars.hostUrl + '/update-student';
    const bodyData = JSON.stringify({
      email: form.email,
      firstname: form.firstname,
      lastname: form.lastname,
    });
    const headerInfo = {
      method: 'POST',
      body: bodyData,
      headers: {
        'Content-Type': 'application/json',
        authorization: 'Bearer ' + token.token,
      },
    };
    fetch(url, headerInfo)
      .then((response) => response.json())
      .then((data) => {
        // Handle the response or show success message
        console.log(data);
        updateName(data.firstname || form.firstname, data.lastname || form.lastname);
        navigate('/');

        // You can display a success message or perform additional actions here
      })
      .catch((error) => {
        console.error('Error updating student information:', error);
      });
  };



  return (
    <Container className="w-100 mw-100">
      <Row>
        <Col>{errorMessage}</Col>
      </Row>
      <Row className="justify-content-center pt-2">
        <Col className="" xs={12} md={8}>
          <Card className="my-2">
            <Card.Header as="h5">Edit Profile</Card.Header>
            <Card.Body>
              <Form>
                <Row className="mb-3" controlId="formBasicNames">
                  <Col xs={6}>
                    <Form.Label>First Name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter first name"
                      name="firstname"
                      value={form.firstname}
                      onChange={(event) => {
                        setForm({ ...form, firstname: event.target.value });
                      }}
                    />
                  </Col>
                  <Col xs={6}>
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter last name"
                      name="lastname"
                      value={form.lastname}
                      onChange={(event) => {
                        setForm({ ...form, lastname: event.target.value });
                      }}
                    />
                  </Col>
                </Row>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    name="email"
                    value={form.email}
                    disabled
                  />
                  <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                  </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    name="password"
                    value={form.password}
                    disabled
                  />
                </Form.Group>
                <Button variant="outline-secondary" onClick={handleSubmit} >
                  Change
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default EditName;
