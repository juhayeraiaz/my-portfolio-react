import { useState, useEffect } from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import navIcon1 from '../assets/img/nav-icon1.svg';
import navIcon2 from '../assets/img/nav-icon2.svg';
import navIcon3 from '../assets/img/nav-icon3.svg';
import navIcon4 from '../assets/img/nav-icon4.svg';
export const NavBar = () => {

  const [activeLink, setActiveLink] = useState('home');
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    }

    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  }, [])

  const onUpdateActiveLink = (value) => {
    setActiveLink(value);
  }

  return (

    <Navbar expand="md" className={scrolled ? "scrolled" : ""}>
      <Container>
        <Navbar.Toggle aria-controls="basic-navbar-nav">
          <span className="navbar-toggler-icon"></span>
        </Navbar.Toggle>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link href="#home" className={activeLink === 'home' ? 'active navbar-link' : 'navbar-link'} onClick={() => onUpdateActiveLink('home')}>Home</Nav.Link>
            <Nav.Link href="#skills" className={activeLink === 'skills' ? 'active navbar-link' : 'navbar-link'} onClick={() => onUpdateActiveLink('skills')}>Skills</Nav.Link>
            <Nav.Link href="#project" className={activeLink === 'projects' ? 'active navbar-link' : 'navbar-link'} onClick={() => onUpdateActiveLink('projects')}>Projects</Nav.Link>
            <Nav.Link href="#contact" className={activeLink === 'contact' ? 'active navbar-link' : 'navbar-link'} onClick={() => onUpdateActiveLink('contact')}>Contact Me</Nav.Link>
            <Nav.Link href="#blogs" className={activeLink === 'blogs' ? 'active navbar-link' : 'navbar-link'} onClick={() => onUpdateActiveLink('blogs')}>Blogs</Nav.Link>
          </Nav>
          <span className="navbar-text">
            <div className="social-icon">
              <a target='_blank' rel='noreferrer' href="https://www.linkedin.com/in/juhayer-aiaz/"><img src={navIcon1} alt="Icon" /></a>
              <a target='_blank' rel='noreferrer' href="https://www.facebook.com/Juhayer.aiaz0/"><img src={navIcon2} alt="Icon" /></a>
              <a target='_blank' rel='noreferrer' href="https://www.instagram.com/juhayer.aiaz/"><img src={navIcon3} alt="Icon" /></a>
              <a target='_blank' rel='noreferrer' href="https://www.github.com/juhayeraiaz/"><img src={navIcon4} alt="Icon" /></a>
            </div>
          </span>
        </Navbar.Collapse>
      </Container>
    </Navbar>

  )
}
