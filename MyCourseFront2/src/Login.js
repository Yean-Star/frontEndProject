
import React, { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import glovalVars from './globalVar'

import './App.css';



function Login(prop) {
  const {setTokenFn} = prop;
  const [errorMessage, setErrorMessage] = useState("");
  const [form, setForm] = useState({
    email: '',
    password: ''
  });
  const navigate = useNavigate();

  function submitButton(e){
    e.preventDefault();
    console.log(form);
    const bodyData = JSON.stringify({user:{email:form.email,password:form.password}})
    const headerInfo = {method:"POST",
                        body:bodyData,
                        headers:{'Content-Type' : 'application/json'}}
    const url = glovalVars.hostUrl + '/login';
    fetch(url,headerInfo)
    .then(response=>{
      console.log(response);
      if(response.status === 401){
        throw new Error("Login Fail.")
      }
      else{
        return response.json()
      }
    }).then(data =>{
      console.log(data.token)
      setTokenFn({token:data.token,email:form.email})
      setErrorMessage("");
      resetButton();
      navigate('/mycourses')
    }).catch(err=>{
      console.log(err.message)
      setTokenFn(null);
      setErrorMessage(err.message)
    })
    
 
  }
  function resetButton () {
    setForm(
      {
        email: '',
        password: ''
      });
  }

  return (
    <Container className="w-100 mw-100">
      <Row><Col>{errorMessage}</Col>
      </Row>
      <Row className="justify-content-center pt-2">
        <Col className="" xs={12} md={8}>
          <Card className="my-2">
            <Card.Header as="h5">Login to Monkey Course</Card.Header>
            <Card.Body>
              <Form>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control type="email" placeholder="Enter email" name="email" value={form.email} 
                  onChange={(event)=>{setForm( {email: event.target.value, password:form.password} )}}/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control type="password" placeholder="Password" name="password" value={form.password} 
                  onChange={(event)=>{setForm( {password: event.target.value, email:form.email} )}} />
                </Form.Group>

                <Button variant="primary" onClick={submitButton}>
                  Submit
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Login;