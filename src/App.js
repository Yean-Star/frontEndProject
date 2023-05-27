import { useState } from 'react';
import { Route, Routes, Link, useAsyncError } from 'react-router-dom';

import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

import HomePage from './HomePage';
import CourseList from './CourseList';
import MyCourses from './MyCourses';
import Login from './Login';
import Register from './Register';
import ChooseCourseList from './ChooseCourseList';
import AboutUs from './AboutUs';
import EditName from './EditName';
import { useNavigate } from 'react-router-dom';

import bearIcon from './image/monkey.png';
import pencilIcon from './image/pencil.png';

function App() {
  const [content, setContent] = useState(-1);
  const [tokenData, setToken] = useState(null);
  const [idData, setId] = useState(-1);
  const [showLogoutModal, setShowLogoutModal] = useState(false);


  const navigate = useNavigate();
  function handleClick(contentId) {
    setContent(contentId);
  }
  const updateName = (newName, newLastname) => {
    setToken({ ...tokenData, name: newName, lastname: newLastname });
  };

  const handleLogout = () => {
    setToken(null);
    setId(-1);
    setShowLogoutModal(false);
    navigate('/');
    window.location.reload();
  };


  const isLoggedIn = tokenData !== null;

  return (
    <>
      <Navbar
        collapseOnSelect
        expand="lg"
        variant="info"
        style={{ height: '80px', backgroundColor: '#FFF9DE' }}
      >
        <Container>
          <Navbar.Brand href="">
            <img
              alt=""
              src={bearIcon}
              width="45"
              height="45"
              className="d-inline-block align-top"
            />{' '}
            <Link className="myNavLink" to="/">
              Home{' '}
            </Link>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto"></Nav>
            <Nav
              activeKey={content}
              className="me-auto d-flex justify-content-center"
              style={{ flex: '1' }}
            >
              <Nav.Link
                as={Link}
                eventKey={0}
                to="/aboutus"
                onClick={() => handleClick(0)}
                style={{ marginRight: '80px', fontSize: '25px' }}
              >
                About Us
              </Nav.Link>
              <Nav.Link
                as={Link}
                eventKey={1}
                to="/courses"
                onClick={() => handleClick(1)}
                style={{ marginRight: '30px', fontSize: '25px' }}
              >
                All Courses
              </Nav.Link>
              {isLoggedIn && (
                <Nav.Link
                  as={Link}
                  eventKey={2}
                  to="/mycourses"
                  onClick={() => handleClick(2)}
                  style={{ marginLeft: '10px', fontSize: '30px' }}
                >
                  My Course
                </Nav.Link>
              )}
            </Nav>
            <Nav activeKey={content}>
              {isLoggedIn ? (
                <>
                  <Card style={{ marginRight: '5px' }}>
                    <Card.Body style={{ fontWeight: '700' }}>
                      <Nav.Link
                        as={Link}
                        eventKey={3}
                        onClick={() => setShowLogoutModal(true)}
                      >
                        Logout
                      </Nav.Link>
                    </Card.Body>
                  </Card>
                  <Card >
                    <Card.Body style={{ fontWeight: '700' }}>
                      <Nav.Link
                        as={Link}
                        eventKey={4}
                        to="/editname"
                        onClick={() => handleClick(-1)}
                      >
                        <img
                          alt=""
                          src={pencilIcon}
                          width="20"
                          height="20"
                          style={{marginRight:'4px',marginBottom:'3px'}}
                        />{tokenData.name} {tokenData.lastname}
                      </Nav.Link>
                    </Card.Body>
                  </Card>
                </>
              ) : (
                <>
                  <Card style={{ marginRight: '5px', width: 'fit-content' }}>
                    <Card.Body style={{ fontWeight: '700' }}>
                      <Nav.Link
                        as={Link}
                        eventKey={3}
                        to="/login"
                        onClick={() => handleClick(3)}
                      >
                        Login
                      </Nav.Link>
                    </Card.Body>
                  </Card>
                  <Card style={{ width: 'fit-content' }}>
                    <Card.Body style={{ fontWeight: '700' }}>
                      <Nav.Link
                        as={Link}
                        eventKey={4}
                        to="/register"
                        onClick={() => handleClick(4)}
                      >
                        Register
                      </Nav.Link>
                    </Card.Body>
                  </Card>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/courses" element={<CourseList />} />
        <Route path="/mycourses" element={<MyCourses token={tokenData} />} />
        <Route path="/aboutus" element={<AboutUs />} />
        <Route
          path="/login"
          element={<Login token={tokenData} setTokenFn={setToken} id={idData} setIdFn={setId} />}
        />
        <Route path="/register" element={<Register />} />
        <Route path="/editname" element={<EditName token={tokenData} updateName={updateName} />} />
        <Route path="/choosecourse" element={<ChooseCourseList id={idData} />} />
      </Routes>
      {/* Logout Modal */}
      <Modal show={showLogoutModal} onHide={() => setShowLogoutModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Logout</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to logout?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowLogoutModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleLogout}>
            Logout
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}


export default App;
