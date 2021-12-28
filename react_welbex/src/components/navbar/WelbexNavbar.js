import React from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import { Link } from "react-router-dom"



export default function WelbexNavbar() {
    return(
        <Navbar bg="light" expand="lg" className="my-2">
            <Container>
                <Link to={{ pathname: "/", fromDashboard: false }} className="text-decoration-none">
                    <h1>Welbex</h1>
                </Link>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                    <div className="ms-5">
                        <Link to={{ pathname: "/table", fromDashboard: false }} className="btn btn-outline-secondary">Table</Link>
                        <Link to={{ pathname: "/", fromDashboard: false }} className="btn btn-outline-secondary ms-3">Test</Link>
                        <a href="https://github.com/berzezek/WelbeX" className="btn btn-outline-secondary ms-3">GitHub</a>
                    </div>

                </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}