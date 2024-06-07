import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import glovalVars from './globalVar';
import { Navigate, useNavigate } from 'react-router-dom';

import './App.css';

function ChooseCourseList(prop) {
  const { id } = prop; 
  const [coursesArr, setCourseArr] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    const url = glovalVars.hostUrl + '/choosecourse';
    console.log(url);
    fetch(url)
      .then(respond => respond.json())
      .then(data => {
        setCourseArr([...data.result]);
      })
      .catch(error => {
        console.error('There was an error!', error);
      });
  }, []);

  const handleSelectCourse = (event) => {
    setSelectedCourse(event.target.value);
    setErrorMessage('');
  };
  
  const handleSubmit = () => {
    if (selectedCourse) {
      const bodyData = JSON.stringify({ id, courseCode: selectedCourse });
      const headerInfo = {
        method: 'POST',
        body: bodyData,
        headers: {
          'Content-Type': 'application/json',
        },
      };
      const url = glovalVars.hostUrl + '/addCourse';
      fetch(url, headerInfo)
        .then((response) => {
          if (response.status === 200) {
            navigate('/mycourses')
            console.log('Course added successfully');
          } else {
            // Course addition failed, you can show an error message or perform any other actions
            console.log('Course added failed');
          }
        })
        .catch((error) => {
          console.error('There was an error!', error);
        });
    }
  };

  return (
    <Container className="w-100 mw-100">
      <Row className="justify-content-center pt-2">
        <Col className="text-center">
          <h2> List of All Courses </h2>
        </Col>
      </Row>
      <Row className="justify-content-center pt-2">
        <Col className="text-center" xs={12} md={4}>
          <Card className="my-2">
            <Card.Header as="h5" style={{backgroundColor: '#FFF9DE'}}>Select a Course</Card.Header>
            <Card.Body>
              <Card.Text>
                <label htmlFor="courseSelect" style={{ marginRight: '10px' }}>Choose a course:</label>
                <select id="courseSelect" value={selectedCourse} onChange={handleSelectCourse}>
                <option value="">Select a course</option>
                  {coursesArr.map(item => (
                    <option key={item.code} value={item.code}>
                      {item.code} {item.cname}
                    </option>
                  ))}
                </select>
              </Card.Text>
              <Button style={{backgroundColor: '#FFF9DE', color: 'black' }} onClick={handleSubmit} >
                Add
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default ChooseCourseList;
