import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-scroll';
import { getOS } from 'utils/helpers';
import { DLNLogo } from 'Assets/img';
function Header({ handleClick }: any) {
  const os = getOS();
  return (
    <Navbar
      collapseOnSelect
      expand='lg'
      className='dln-nav px-lg-5 px-md-5 px-sm-0 py-0'
    >
      <Navbar.Brand href='#'>
        <img alt='logo' src={DLNLogo} />
      </Navbar.Brand>
      <Navbar.Toggle aria-controls='responsive-navbar-nav' className='mt-4' />
      <Navbar.Collapse id='responsive-navbar-nav'>
        <Nav className='ml-auto'>
          <Link className='nav-link' to='vision'>
            Vision
          </Link>
          <Link className='nav-link' to='mfi'>
            MFIs Wanted
          </Link>
          <Link className='nav-link' to='foundation'>
            Foundation
          </Link>
          <Link className='nav-link' to='news'>
            News
          </Link>
          <Nav.Link href='mailto:Contact@DLN.org'>Contact</Nav.Link>
          <Nav.Link
            onClick={() =>
              handleClick(
                os === 'iOS' || os === 'Android' ? 'walletconnect' : 'injected'
              )
            }
          >
            Enter
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}
export { Header };
