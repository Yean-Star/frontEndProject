import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import glovalVars from './globalVar';
import { Route, Routes, Link, useAsyncError } from "react-router-dom"

import './App.css';

function MyCourses(prop) {
  const { token } = prop;
  const [myCourseArr, setmyCourseArr] = useState([]);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [courseToRemove, setCourseToRemove] = useState(null);

  const handleRemoveCourse = (course) => {
    setCourseToRemove(course);
    setShowConfirmationModal(true);
  };

  const handleConfirmationModalClose = () => {
    setShowConfirmationModal(false);
  };

  const handleCourseRemovalConfirmed = () => {
    if (courseToRemove) {
      const { studentid, code } = courseToRemove;
      const bodyData = JSON.stringify({ studentid, courseCode: code });
      const headerInfo = {
        method: 'POST',
        body: bodyData,
        headers: {
          'Content-Type': 'application/json',
        },
      };
      const url = glovalVars.hostUrl + '/removeCourse';

      fetch(url, headerInfo)
        .then((response) => {
          if (response.ok) {
            // Course removed successfully
            // Update the myCourseArr state by removing the course locally
            setmyCourseArr((prevArr) =>
              prevArr.filter((item) => item.code !== code)
            );
          } else {
            // Error occurred while removing the course
            console.error('Failed to remove course. Status:', response.status);
          }
        })
        .catch((error) => {
          console.error('Failed to remove course. Error:', error);
        })
        .finally(() => {
          setShowConfirmationModal(false);
        });
    }
  };

  useEffect(() => {
    if (token !== null) {
      //const headers = { 'Authorization': 'Bearer ' + token.token }
      const bodyData = JSON.stringify({ email: token.email });
      const headerInfo = {
        method: 'POST',
        body: bodyData,
        headers: {
          'Content-Type': 'application/json',
          authorization: 'Bearer ' + token.token,
        },
      };
      const url = glovalVars.hostUrl + '/myCourses';
      const Info = { header: { 'Access-Control-Allow-Origin': '*' } };
      fetch(url, headerInfo)
        .then((respond) => respond.json())
        .then((data) => {
          setmyCourseArr([...data.result]);
        })
        .catch((error) => {
          console.error('There was an error!', error);
        });
    }
  }, [token]);

  return (
    <Container className="w-100 mw-100">
      <Row className="justify-content-center pt-2">
        <Col className="text-center">
          <h2>My Registered Courses</h2>
        </Col>
      </Row>

      {token && (
        <Card
          className="my-2"
          style={{
            width: 'fit-content',
            padding: '3px',
            fontSize: '20px',
            backgroundColor: '#F9FBE7',
            borderStyle: 'groove',
            borderRadius: '20px'
          }}
        >
          <Card.Body>
            <Card.Text>
              <h4 style={{ fontSize: '30px' }}>Welcome, {token.name}!</h4>
            </Card.Text>
          </Card.Body>
        </Card>
      )}
      {!token && <h3>Not logged in yet. Please log in first.</h3>}
      <Row className="justify-content-center pt-2">
        {myCourseArr.map((item, index) => {
          return (
            <Col key={index} className="text-center" xs={12} md={4}>
              <Card className="my-2 course-card">
                <Card.Header as="h5" className="card-header">
                  {item.code} | {item.cname}
                </Card.Header>
                <Card.Body>
                  <Card.Text>
                    Taught by <h5>Teacher.{item.firstname} {item.lastname}</h5>
                    At <b>{item.placename}</b>
                  </Card.Text>
                  <Button
                    variant="outline-secondary"
                    onClick={() => handleRemoveCourse(item)}
                    size="sm"
                  >
                    Remove Course
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          );
        })}
      </Row>

      {token && (
        <Row className="justify-content-center" style={{ marginTop: '20px' }}>
          {!token && <h3>Not logged in yet. Please log in first.</h3>}
          {token && (
            <Card
              className="pt-2"
              style={{
                width: 'fit-content',
                padding: '13px',
                fontSize: '20px',
                backgroundColor: '#F9FBE7',
                borderStyle: 'groove',
              }}
            >
              <Col className="text-end">
                <Link className="myLink" to="/choosecourse">
                  + Add Course
                </Link>
              </Col>
            </Card>
          )}
        </Row>
      )}

      {/* Confirmation modal */}
      <Modal
        show={showConfirmationModal}
        onHide={handleConfirmationModalClose}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this course?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleConfirmationModalClose}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleCourseRemovalConfirmed}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default MyCourses;
