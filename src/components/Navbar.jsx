import React from 'react';
import { Link } from 'react-router-dom';
import { Link as ChakraLink } from '@chakra-ui/react';

const NavBar = () => {
    return (
        <nav className="navbar">
            <div className="menu">
            <ul>
      <li><ChakraLink as={Link} to="/" data-testid="home-page" className="navbar-title">
        Student Portal
        </ChakraLink></li>
        <li><ChakraLink as={Link} to="/student" data-testid="student-page" className="navbar-link">
          All Students
          </ChakraLink></li>
        <li><ChakraLink as={Link} to="/add" data-testid="add-page" className="navbar-link">
          Add Student
          </ChakraLink></li>
        </ul>
        </div>
    </nav>
    );
};

export default NavBar;
