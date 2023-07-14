import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import "../style/NavBar.css";
import { FormControl, Button } from "react-bootstrap";

const NavigationBar = () => {
  const navigate = useNavigate();
  function search(val: string) {
    navigate("/search/" + val.trim());
    window.location.reload();
    console.log("navigate to: /search/" + val);
  }
  return (
    <Navbar bg="light" variant="lihgt" expand="md" fixed="top">
      <Container className="justify-content-start">
        <Navbar.Brand className="brand" href="/home">
          DietRiot
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="navbarCollapse" />
        <Navbar.Collapse id="navbarCollapse">
          <Nav className="me-auto" navbar>
            <Nav.Item>
              <Nav.Link href="/home" active>
                Home
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link href="/about">About</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link href="/recipes">Recipes</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link href="/ingredients">Ingredients</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link href="/dietgroups">Diet Groups</Nav.Link>
            </Nav.Item>
          </Nav>
          <div className="searchBar">
            <Form.Control
              type="search"
              placeholder="Search"
              aria-describedby="searchHelpBlock"
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  search((event.target as HTMLTextAreaElement).value);
                }
              }}
            />
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavigationBar;
