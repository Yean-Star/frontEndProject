import { useState } from 'react';
import { Route, Routes, Link, useAsyncError } from "react-router-dom"

import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

import HomePage from './HomePage';
import CourseList from './CourseList';
import MyCourses from './MyCourses';
import Login from './Login';
import Register from './Register';
import ChooseCourseList from './ChooseCourseList';
import AboutUs from './AboutUs';

import bearIcon from './image/monkey.png';

function App() {
  const [content, setContent] = useState(-1);
  const [tokenData, setToken] = useState(null);
  function handleClick(contentId) {
    setContent(contentId);
  }
  return (
    <>
      <Navbar collapseOnSelect expand="lg"  variant="info" style={{ height: '80px', backgroundColor: '#FFF9DE' }}>
        <Container>
          <Navbar.Brand href="">
            <img
              alt=""
              src={bearIcon}
              width="45"
              height="45"
              className="d-inline-block align-top"
            />{' '}
            <Link className="myNavLink" to="/">Home </Link>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
            </Nav>
            <Nav activeKey={content} className="me-auto d-flex justify-content-center" style={{ flex: '1' }} >
            <Nav.Link as={Link} eventKey={0} to="/aboutus" onClick={() => handleClick(0)} style={{ marginRight: '80px', fontSize: '30px' }} >
                About Us
              </Nav.Link>
              <Nav.Link as={Link} eventKey={1} to="/courses" onClick={() => handleClick(1)} style={{ marginRight: '30px' , fontSize: '30px'}}>
                All Courses
              </Nav.Link>
              <Nav.Link as={Link} eventKey={2} to="/mycourses" onClick={() => handleClick(2)} style={{ marginLeft: '10px', fontSize: '30px' }} >
                My Course
              </Nav.Link>
              
            </Nav>
            <Nav activeKey={content}>
              <Card className="icon-frame">
                <Card.Body>
                  <Nav.Link as={Link} eventKey={3} to="/login" onClick={() => handleClick(3)}>
                    Login
                  </Nav.Link>
                </Card.Body>
              </Card>
              <Card className="icon-frame">
                <Card.Body>
                  <Nav.Link as={Link} eventKey={4} to="/register" onClick={() => handleClick(4)}>
                    Register
                  </Nav.Link>
                </Card.Body>
              </Card>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/courses" element={<CourseList />} />
        <Route path="/mycourses" element={<MyCourses token={tokenData} />} />
        <Route path="/aboutus" element={<AboutUs />} />
        <Route path="/login" element={<Login token={tokenData} setTokenFn={setToken} />} />
        <Route path="/register" element={<Register token={tokenData} setTokenFn={setToken} />} />
        <Route path="/choosecourse" element={<ChooseCourseList />} />
      </Routes>

    </>
  );

}

export default App;