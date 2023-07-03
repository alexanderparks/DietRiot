import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import React, { Component } from "react";
import "../Style/NavBar.css";

const NavigationBar = () => {
    return (
        <Navbar className="navbar navbar-expand-lg fixed-top bg-body-tertiary">
            <Container className="justify-content-start">
            <Navbar.Brand className="brand" href="/home">DietRiot</Navbar.Brand>
            <Nav className="me-auto">
                <Nav.Link href="/home">Home</Nav.Link>
                <Nav.Link href="/about">About Us</Nav.Link>
                <Nav.Link href="/recipes">Recipes</Nav.Link>
                <Nav.Link href="/ingredients">Ingredients</Nav.Link>
                <Nav.Link href="/dietgroups">Diet Groups</Nav.Link>
            </Nav>
            </Container>
        </Navbar>
    );
};

export default NavigationBar;
