import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import './Header.css';
import { checkUsernameCookie } from '../../cookieUtils/cookieUtils';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVideoSlash, faUser } from "@fortawesome/free-solid-svg-icons";
import { Button, Navbar, Nav, Container, Dropdown } from 'react-bootstrap';

const Header = () => {
  const getCookieValue = (name) => {
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      if (cookie.startsWith(`${name}=`)) {
        return cookie.substring(name.length + 1);
      }
    }
    return '';
  };

  const isLoggedIn = checkUsernameCookie();
  const username = isLoggedIn ? getCookieValue('username') : 'Username';

  const handleLogout = () => {
    // Delete the username cookie by setting its expiration date to a past date
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

            {isLoggedIn && (
    <NavLink className="nav-link" to="/watchList">
      Watch List
    </NavLink>
  )}
          </Nav>
          {isLoggedIn ? (
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
