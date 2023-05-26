import React, { useState, useEffect } from 'react';

import monkeySteal from './image/612.jpg';
import work from './image/work.jpg';
import monkeyKid from './image/istockphoto.jpg';
import monkeyBook from './image/monkeyhandsup.jpg';
import monkeyEating from './image/eating.jpg'
import blackmonkey from './image/blackmonkey.jpg'
import monkeyAttack from './image/monkeyattack.jpg'

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
                  src={monkeyEating}
                  alt="Unlock your potential with our courses"
                />
                <Carousel.Caption>
                  <h5>Leap into the unknown with the courage of a monkey</h5>
                </Carousel.Caption>
              </Carousel.Item>
              <Carousel.Item>
                <img
                  className="d-block w-100"
                  src={monkeyBook}
                  alt="Transform your future with education"
                />
                <Carousel.Caption>
                  <h5>Have the courage of a monkey to venture outside your comfort zone</h5>
                </Carousel.Caption>
              </Carousel.Item>
              <Carousel.Item>
                <img
                  className="d-block w-100"
                  src={monkeyKid}
                  alt="Upgrade your skills"
                />
                <Carousel.Caption>
                  <h5>Success awaits those who dare to learn.</h5>
                </Carousel.Caption>
              </Carousel.Item>
            </Carousel>
            <Carousel style={{ flex: '1', maxWidth: '1000px', marginLeft: '10px' }} >
              <Carousel.Item>
                <img
                  className="d-block w-100"
                  src={blackmonkey}
                  alt="Unlock your potential with our courses"
                />
                <Carousel.Caption>
                  <h5>Let courage be your guiding light as you embark on your learning journey.</h5>
                </Carousel.Caption>
              </Carousel.Item>
              <Carousel.Item>
                <img
                  className="d-block w-100"
                  src={monkeySteal}
                  alt="Transform your future with education"
                />
                <Carousel.Caption>
                  <h5>Trust in your abilities and embrace the challenges.</h5>
                </Carousel.Caption>
              </Carousel.Item>
              <Carousel.Item>
                <img
                  className="d-block w-100"
                  src={monkeyAttack}
                  alt="Upgrade your skills"
                />
                <Carousel.Caption>
                  <h5>With the best steal technique</h5>
                </Carousel.Caption>
              </Carousel.Item>
            </Carousel>
          </div>


        </Col>
      </Row>


      <Row className="justify-content-center" style={{ marginTop: '20px', marginBottom: '20px' }}>
        <Card className="pt-2" style={{
          width: 'fit-content',
          padding: '13px',
          fontSize: '25px',
          backgroundColor: '#F9FBE7',
          border: '2px solid #ccc',
          borderRadius: '10px',
        }}  >
          <Col className="text-end " ><Link className="myLink" to="/courses">

            See our Courses </Link></Col>
        </Card>
        <Card className="pt-2" style={{
          width: 'fit-content',
          padding: '13px',
          fontSize: '25px',
          backgroundColor: '#F9FBE7',
          border: '2px solid #ccc',
          borderRadius: '10px',
          marginLeft: '80px'
        }}  >
          <Col className="text-end"><Link className="myLink" to="/aboutus">

            About us </Link></Col>
        </Card>
      </Row>
    </Container >
  );
}

export default HomePage;