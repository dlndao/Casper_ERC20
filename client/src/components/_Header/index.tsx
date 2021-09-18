import React, { useState, useEffect } from 'react';
import { Navbar, Nav, Modal } from 'react-bootstrap';
import Blockies from 'react-blockies';
import { API } from 'aws-amplify';
import Tooltip from '@material-ui/core/Tooltip';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faKey, faSignOutAlt, faBars } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { useUserState, useUserDispatch } from 'contexts/UserAuthContext';
import { UserActionTypes } from 'types';
import { getOS, getBrowser } from 'utils/helpers';
import { assetIcon } from 'Assets/img';
import { investIcon } from 'Assets/img';
import { treasuryIcon } from 'Assets/img';
import { borrowIcon } from 'Assets/img';
import { profileIcon } from 'Assets/img';
import { Link } from 'react-router-dom';

function Header() {
  const { user }: any = useUserState();
  const dispatch = useUserDispatch();
  const [state, setState] = useState({
    loading: false,
    user: undefined,
    username: user.username,
    showModal: false,
  });

  // useEffect(() => {
  //   (async function submitUserInfo() {
  //     const currentUser: any = await axios('https://ipapi.co/json/').then(
  //       (response) => response.data
  //     );

  //     const { ip, country_name, city, latitude, longitude } = currentUser;
  //     const os = getOS();
  //     const browser = getBrowser();

  //     await patchUserInfo({
  //       body: {
  //         country: country_name,
  //         geolocation: `${longitude} ${latitude}`,
  //         ip,
  //         city,
  //         os,
  //         browser,
  //       },
  //     });
  //   })();
  // }, []);

  const onLoggedOut = () => {
    const LS_KEY = 'dln:auth';
    localStorage.removeItem(LS_KEY);
    const user: any = undefined;
    dispatch({
      type: UserActionTypes.SUCCESS,
      payload: user,
    });
  };

  const handleChange = ({
    target: { value },
  }: React.ChangeEvent<HTMLInputElement>) => {
    setState({ ...state, username: value });
  };

  const handleSubmit = async () => {
    const { username }: any = state;
    setState({ ...state, loading: true });
    await patchUserInfo({ username: state.username });
  };

  const patchUserInfo = async (body) => {
    const LS_KEY = 'dln:auth';
    const auth = JSON.parse(localStorage.getItem(LS_KEY) || '{}');
    const { accessToken } = auth;

    await API.patch('auth', `/api/users/${user.id}`, {
      headers: { Authorization: `Bearer ${accessToken}` },
      body,
    })
      .then((user) =>
        setState({ ...state, loading: false, user, showModal: false })
      )
      .catch((err) => {
        window.alert(err);
        setState({ ...state, loading: false });
      });
  };

  return (
    <>
      <Navbar bg='dark' expand='lg' className='dln-user-profile pb-0'>
        <Navbar.Brand className='text-white'>
          <Blockies seed={user.publicAddress} />
          <span
            className='float-right  ml-1 text-truncate dln-user-name cursor-pointer'
            onClick={() => setState({ ...state, showModal: true })}
          >
            {user.username ? state.username : 'not set.'}
          </span>
        </Navbar.Brand>

        <Navbar.Toggle aria-controls='basic-navbar-nav'>
          <FontAwesomeIcon icon={faBars} className='mt-1 text-white' />
        </Navbar.Toggle>
        <Navbar.Collapse id='basic-navbar-nav'>
          <Nav className='mr-auto'>
            <Tooltip
              classes={{
                tooltip: 'dln-tooltip',
                arrow: 'dln-tooltip-arrow',
              }}
              arrow
              placement='top'
              title={user.publicAddress}
            >
              <span className='text-truncate text-white dln-profile-key'>
                <span className='float-left'>
                  <FontAwesomeIcon icon={faKey} />
                </span>
                <span className='text-truncate'>
                  &nbsp; Public key:
                  {user.publicAddress}
                </span>
              </span>
            </Tooltip>
          </Nav>
          <div>
            {/* <Tooltip
              classes={{
                tooltip: 'dln-tooltip',
                arrow: 'dln-tooltip-arrow',
              }}
              arrow
              placement='top'
              title='Profile'
            >
              <Link
                className='dln-menu-item cursor-pointer'
                to={{
                  pathname: '/profile',
                }}
              >
                <img src={profileIcon} />
              </Link>
            </Tooltip> */}
            <Tooltip
              classes={{
                tooltip: 'dln-tooltip',
                arrow: 'dln-tooltip-arrow',
              }}
              arrow
              placement='top'
              title='Casper Assets'
            >
              <Link
                className='dln-menu-item cursor-pointer'
                to={{
                  pathname: '/CasperAssets',
                }}
              >
                <img src={assetIcon} />
              </Link>
            </Tooltip>

            <button onClick={onLoggedOut} className='btn text-white dln-lnk'>
              <FontAwesomeIcon icon={faSignOutAlt} />
              Logout
            </button>
          </div>
        </Navbar.Collapse>
      </Navbar>
      <Modal
        show={state.showModal}
        onHide={() => setState({ ...state, showModal: false })}
        className='dln-centered-vertically-modal'
      >
        <Modal.Header closeButton>
          <Modal.Title className='dln-txt-primary-color'>
            Change Your Name
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <input
            name='username'
            className='form-control'
            onChange={handleChange}
            placeholder='Change UserName'
            value={state.username}
          />
          <div className='d-flex justify-content-end mt-4'>
            <button
              className='btn  ml-2 mb-1 dln-txt-primary-color font-weight-bold'
              onClick={() => setState({ ...state, showModal: false })}
            >
              Close
            </button>
            <button
              disabled={state.loading}
              className='btn dln-primary-btn ml-2 mb-1'
              onClick={handleSubmit}
            >
              Submit
            </button>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

export { Header };
