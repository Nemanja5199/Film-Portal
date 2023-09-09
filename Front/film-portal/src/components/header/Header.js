import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import './Header.css';
import { checkRoleCookie, getCookie } from '../../cookieUtils/cookieUtils'; // Assuming you have functions to check the role cookie and get cookie values
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVideoSlash, faUser } from "@fortawesome/free-solid-svg-icons";
import { Button, Navbar, Nav, Container, Dropdown } from 'react-bootstrap';

const Header = () => {
  const userRole = checkRoleCookie(); // Modify this to use your function to check the role cookie
  const username = getCookie('username'); // Modify 'username' to match the name of your username cookie

  const handleLogout = () => {
    // Delete the role and username cookies by setting their expiration date to a past date
    document.cookie = 'role=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    document.cookie = 'username=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';

    // Refresh the page to reflect the logged-out state
    window.location.reload();
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container fluid>
        <Navbar.Brand href="/" style={{"color":'gold'}}>
          <FontAwesomeIcon icon ={faVideoSlash}/>Gold
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{maxHeight: '100px'}}
            navbarScroll
          >
            <NavLink className="nav-link" to="/">Home</NavLink>

            {userRole === 'USER' && (
              <NavLink className="nav-link" to="/watchList">
                Watch List
              </NavLink>
            )}
          </Nav>
          {userRole === 'USER' || userRole === 'ADMIN' ? (
            <Dropdown className="dropdowm-nav">
              <Dropdown.Toggle variant="outline-info" id="dropdown-basic">
                <FontAwesomeIcon icon={faUser} /> <span className="username">{username}</span>
              </Dropdown.Toggle>
              <Dropdown.Menu className="dropdown-menu">
                <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          ) : (
            <>
              <Button variant="outline-info" className="me-2">
                <Link to="/login" className="btn-link-style">Login</Link>
              </Button>
              <Button variant="outline-info">
                <Link to="/register" className="btn-link-style">Register</Link>
              </Button>
            </>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default Header;
