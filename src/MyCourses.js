
import React, { useState, useEffect } from 'react';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';

import { Link } from 'react-router-dom';
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
        headers: { 'Content-Type': 'application/json', authorization: 'Bearer ' + token.token, }
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

      {token && myCourseArr.length > 0 && <Card className="my-2" style={{ padding: '1px', width: 'fit-content', backgroundColor: '#F8F6F4',borderStyle:'none',borderRadius:'20px' }}>
        <Card.Body><Card.Text > <h4 style={{
          fontSize: '30px',
        }}>Welcome, {myCourseArr[0].name}!</h4></Card.Text></Card.Body>
      </Card>
      }
      {!token && <h3 className="justify-content-center pt-2" >Not login yet. Please login first.</h3>}
      <Row className="justify-content-center pt-2">
        {
          myCourseArr.map((item, index) => {
            return (
              <Col key={index} className="text-center" xs={12} md={4}>
                <Card className="my-2">
                  <Card.Header as="h5">{item.code} | {item.cname} </Card.Header>
                  <Card.Body>
                    <Card.Text>
                      Teach by <h6>Teacher.{item.firstname} {item.lastname}</h6>
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>

            )
          })
        }
      </Row>

      {token && (
        <Row className="justify-content-center" style={{ marginTop: '20px' }}>
          {!token && (
            <h3>Not logged in yet. Please log in first.</h3>
          )}
          {token && (
            <>
              <Col className="text-start" >
                <Card
                  className="pt-2"
                  style={{
                    width: 'fit-content',
                    padding: '13px',
                    fontSize: '20px',
                    backgroundColor: '#F9FBE7',
                    border: '2px solid #ccc',
                    borderRadius: '10px',
                    marginLeft: '550px'
                  }}
                >
                  <Link className="myLink" to="/choosecourse">
                    Add Course
                  </Link>
                </Card>
              </Col>
              <Col className="text-end" >
                <Card
                  className="pt-2"
                  style={{
                    width: 'fit-content',
                    padding: '13px',
                    fontSize: '20px',
                    backgroundColor: '#F9FBE7',
                    border: '2px solid #ccc',
                    borderRadius: '10px',

                  }}
                >
                  <Link className="myLink" to="/removemyCourses">
                    Remove Course
                  </Link>
                </Card>
              </Col>
            </>
          )}
        </Row>
      )}



    </Container>
  );
}

export default MyCourses;