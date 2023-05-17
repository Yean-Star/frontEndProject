
import React, { useState, useEffect } from 'react';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';

import glovalVars from './globalVar'
import './App.css';

function MyCourses(prop) {
  const { token } = prop;
  const [myCourseArr, setmyCourseArr] = useState([]);

  useEffect(() => {
    if (token !== null) {
      //const headers = { 'Authorization': 'Bearer ' + token.token }
      const bodyData = JSON.stringify({ email: token.email })
      const headerInfo = {
        method: "POST",
        body: bodyData,
        headers:{'Content-Type' : 'application/json',authorization: 'Bearer ' + token.token,}
      }
      const url = glovalVars.hostUrl + '/myCourses'
      const Info = { header: { 'Access-Control-Allow-Origin': '*' } }
      fetch(url, headerInfo)
        .then(respond => { return respond.json() })
        .then(data => {
          //console.log(data.result);
          setmyCourseArr([...data.result])
        })
        .catch(error => { console.error('There was an error!', error); });
    }
  }, [token])

  return (
    <Container className="w-100 mw-100">

      <Row className="justify-content-center pt-2">
        <Col className="text-center"> <h2> My Registered Courses </h2></Col>
      </Row>
      {!token && <h3>Not login yet. Please login first.</h3>}
      <Row className="justify-content-center pt-2">
        {
          myCourseArr.map((item, index) => {
            return (
              <Col key={index} className="text-center" xs={12} md={4}>
                <Card className="my-2">
                  <Card.Header as="h5">{item.coursecode} </Card.Header>
                  <Card.Body>
                    <Card.Title> {item.year}/{item.semester}</Card.Title>
                    <Card.Text>
                      {item.description}
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            )
          })
        }
      </Row>

    </Container>
  );
}

export default MyCourses;