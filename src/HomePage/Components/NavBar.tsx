import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import "../style/NavBar.css";



const NavigationBar = () => {
const navigate = useNavigate();
function search(val: string) {
navigate("/search/" + val);
window.location.reload();
console.log("navigate to: /search/" + val.trim())
}
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
</Container>
</Navbar>
);
};

export default NavigationBar;
