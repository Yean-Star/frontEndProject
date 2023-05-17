import React, { useState, useEffect } from 'react';

import book from './image/book1.jpg';
import work from './image/work.jpg';
import classroom from './image/classroom.jpg';
import monkeyBook from './image/monkeyBook.png';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Carousel from 'react-bootstrap/Carousel';
import Card from 'react-bootstrap/Card';


import './App.css';
import { Link } from 'react-router-dom';
import glovalVars from './globalVar';

function HomePage(prop) {

  const [top3, setTop3] = useState([]);

  useEffect(() => {
    const url = glovalVars.hostUrl + '/top3'
    console.log(url)
    const Info = { header: { 'Access-Control-Allow-Origin': '*' } }
    fetch(url)
      .then(respond => { return respond.json() })
      .then(data => {
        //console.log(data.result);
        setTop3([...data.result])
      })
      .catch(error => { console.error('There was an error!', error); });
  }, [])

  return (
    <Container className="w-10 mw-10">
      <Row className="justify-content-center" style={{ backgroundColor: '#FFF9DE', marginTop: '20px' }}>
        <Col className="text-center">
          <div className="d-flex">
            <Carousel style={{ flex: '1', maxWidth: '1000px', marginRight: '10px' }}>
              <Carousel.Item>
                <img
                  className="d-block w-100"
                  src={book}
                  alt="Unlock your potential with our courses"
                />
                <Carousel.Caption>
                  <h5>Unlock your potential with our courses</h5>
                </Carousel.Caption>
              </Carousel.Item>
              <Carousel.Item>
                <img
                  className="d-block w-100"
                  src={classroom}
                  alt="Transform your future with education"
                />
                <Carousel.Caption>
                  <h5>Transform your future with education</h5>
                </Carousel.Caption>
              </Carousel.Item>
              <Carousel.Item>
                <img
                  className="d-block w-100"
                  src={work}
                  alt="Upgrade your skills"
                />
                <Carousel.Caption>
                  <h5>Upgrade your skills</h5>
                </Carousel.Caption>
              </Carousel.Item>
            </Carousel>
            <Carousel style={{ flex: '1', maxWidth: '1000px', marginLeft: '10px' }} >
              <Carousel.Item>
                <img
                  className="d-block w-100"
                  src={book}
                  alt="Unlock your potential with our courses"
                />
                <Carousel.Caption>
                  <h5>Unlock your potential with our courses</h5>
                </Carousel.Caption>
              </Carousel.Item>
              <Carousel.Item>
                <img
                  className="d-block w-100"
                  src={classroom}
                  alt="Transform your future with education"
                />
                <Carousel.Caption>
                  <h5>Transform your future with education</h5>
                </Carousel.Caption>
              </Carousel.Item>
              <Carousel.Item>
                <img
                  className="d-block w-100"
                  src={work}
                  alt="Upgrade your skills"
                />
                <Carousel.Caption>
                  <h5>Upgrade your skills</h5>
                </Carousel.Caption>
              </Carousel.Item>
            </Carousel>
          </div>
          

        </Col>
      </Row>

      <Row className="justify-content-center" style={{ backgroundColor: '#FFF9DE', marginTop: '20px' }}>
        <Col className="text-left"></Col>
        <Carousel>
              <Carousel.Item>
                <img
                  className="d-block w-100"
                  src={book}
                  alt="Unlock your potential with our courses"
                />
                <Carousel.Caption>
                  <h5>Unlock your potential with our courses</h5>
                </Carousel.Caption>
              </Carousel.Item>
              <Carousel.Item>
                <img
                  className="d-block w-100"
                  src={classroom}
                  alt="Transform your future with education"
                />
                <Carousel.Caption>
                  <h5>Transform your future with education</h5>
                </Carousel.Caption>
              </Carousel.Item>
              <Carousel.Item>
                <img
                  className="d-block w-100"
                  src={work}
                  alt="Upgrade your skills"
                />
                <Carousel.Caption>
                  <h5>Upgrade your skills</h5>
                </Carousel.Caption>
              </Carousel.Item>
            </Carousel>
      </Row>


      <Row className="justify-content-center" style={{ marginTop: '20px' }}>
        <Card className="pt-2" style={{ width: 'fit-content', padding: '13px', fontSize: '50px', backgroundColor: '#F9FBE7', borderStyle: 'groove' }}  >
          <Col className="text-end"><Link className="myLink" to="/courses">
            <img src={monkeyBook} alt="Image" width="80"
              height="80" style={{ marginRight: '10px' }} />
            See all Courses </Link></Col>
        </Card>
        <Card className="pt-2" style={{ width: 'fit-content', padding: '13px', fontSize: '50px', backgroundColor: '#F9FBE7', borderStyle: 'groove',marginLeft: '20px' }}  >
          <Col className="text-end"><Link className="myLink" to="/aboutus">
            <img src={monkeyBook} alt="Image" width="80"
              height="80" style={{ marginRight: '10px' }} />
            About us </Link></Col>
        </Card>
      </Row>
    </Container >
  );
}

export default HomePage;