
import React, { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import glovalVars from './globalVar'
import monkeyBook from './image/monkeyStudy.jpg';

import './App.css';



function Register(prop) {
  const {setTokenFn} = prop;
  const [errorMessage, setErrorMessage] = useState("");
  const [form, setForm] = useState({
    firstname:'',
    lastname:'',
    email: '',
    password: '',
    conpassword:''
  });
  const navigate = useNavigate();

  function submitButton(e){
    e.preventDefault();
    console.log(form);
    const bodyData = JSON.stringify({user:{email:form.email,password:form.password}})
    const headerInfo = {method:"POST",
                        body:bodyData,
                        headers:{'Content-Type' : 'application/json'}}
    const url = glovalVars.hostUrl + '/register';
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
        firstname:'',
        lastname:'',
        email: '',
        password: '',
        conpassword:''
      });
  }

  function submitButton(e){
    if(form.password !== form.conpassword){
      setErrorMessage("Password not match")
      return
    }
    const bodyData = JSON.stringify({user:{firstname:form.firstname,lastname:form.lastname,email:form.email,password:form.password}})
    const headerInfo = {method:"POST",
                        body:bodyData,
                        headers:{'Content-Type' : 'application/json'}}
    const url = glovalVars.hostUrl + '/register';
    fetch(url,headerInfo)
    .then(response=>{
      console.log(response);
      if(response.status === 401){
        throw new Error("Register Fail.")
      }
      else{
        setErrorMessage("");
        navigate('/login')
      }
    }).catch(err=>{
      console.log(err.message)
      setErrorMessage(err.message)
    })
  }

  return (
    <Container className="w-100 mw-100">
      <Row><Col>{errorMessage}</Col>
      </Row>
      <Row className="justify-content-center pt-2">
        <Col className="" xs={12} md={8}>
          <Card className="my-2">
            <Card.Header as="h5">Register to Monkey Course</Card.Header>
            <Card.Body>
              <Form>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control type="email" placeholder="Enter email" name="email" value={form.email} 
                  onChange={(event)=>{setForm( {email: event.target.value, 
                  password:form.password,
                  firstname:form.firstname,
                  lastname:form.lastname,
                  conpassword:form.conpassword} )}}/>
                  <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                  </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control type="password" placeholder="Password" name="password" value={form.password} 
                  onChange={(event)=>{setForm( {password: event.target.value, 
                  email:form.email,
                  firstname:form.firstname,
                  lastname:form.lastname,
                  conpassword:form.conpassword} )}} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="confirmPassword">
                  <Form.Label>Confirm Password</Form.Label>
                  <Form.Control type="conpassword" placeholder="Confirm Password" name="conpassword" value={form.conpassword} 
                  onChange={(event)=>{setForm( {conpassword: event.target.value,
                    password:form.password, 
                    email:form.email,
                    firstname:form.firstname,
                    lastname:form.lastname} )
                  if(event.target.value !== form.password  ){
                    setErrorMessage("Password not match monk")
                  }else{
                    setErrorMessage("")
                  }}} />
                </Form.Group>

                <Button variant="primary" onClick={submitButton}>
                  Submit
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="justify-content-center" style={{ marginTop: '20px' }}>
        <Card className="pt-2" style={{ width: 'fit-content', padding: '13px', fontSize: '50px', borderStyle: 'hidden' }}  >
          <Col className="text-end">
            <img src={monkeyBook} alt="Image" width="200"
              height="200" style={{ marginRight: '10px' }} />
           Unlock the benefits of being one of monkey </Col>
        </Card>
      </Row>
    </Container>
  );
}

export default Register;