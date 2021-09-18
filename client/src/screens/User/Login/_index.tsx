import React, { useState, useEffect, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import ModalVideo from 'react-modal-video';
import jwtDecode from 'jwt-decode';
import TextTransition, { presets } from 'react-text-transition';
import Slider from 'react-slick';
import Web3 from 'web3';
import { useWallet } from 'use-wallet';
import { API } from 'aws-amplify';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Spinner } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faFacebookF,
  faLinkedinIn,
  faTelegramPlane,
  faTwitter,
  faMedium
} from '@fortawesome/free-brands-svg-icons';

import { useUserDispatch } from 'contexts/UserAuthContext';
import { User, Auth, UserActionTypes } from 'types';
import { getOS } from 'utils/helpers';

import {
  dgh,
  blockchain,
  totle,
  rivet,
  primedao,
  giftz,
  lunarCrush,
  dmm,
  coinsquad,
  casper,
  WebDbtech,
  wish,
  feedBackAdel,
  feedBackDavid,
  feedBackJoe,
  feedBackGregory,
  feedBackBadri,
  illustration16,
  illustration17,
  wave13,
  hero11,
  wave8,
  wave9,
  wave10,
  wave11,
  braces,
  dlnLogo,
  newsLetter
} from 'Assets/img';
import './app.css';
import './custom.css';
//import './plugins.min.css';

let web3: Web3 | any = undefined; // Will hold the web3 instance

export function Login() {
  const sliderSettings = {
    infinite: true,
    slidesToShow: 1,
    arrows: false,
    dots: true,
    autoplay: true,
    speed: 800,
    pauseOnDotsHover: true
  };
  const history = useHistory();
  const dispatch = useUserDispatch();
  const { account, connect, ethereum }: any = useWallet();
  const [state, setState] = useState({
    loading: false,
    users: [],
    open: false
  });
  const [isOpen, setOpen] = useState(false);
  const [usersCount, setUsersCount] = useState(0);
  const [countriesCount, setCountriesCount] = useState(0);
  const [index, setIndex] = React.useState(0);
  const address: any = useRef('');
  const eth: any = useRef('');

  const AnimatedText = ['Slavery', 'Racism', 'Exclusion'];
  const LS_KEY = 'dln:auth';

  useEffect((): any => {
    address.current = account;
    eth.current = ethereum;
    setInterval(() => setIndex((index) => index + 1), 2000);
    (async () => {
      const users: any = await API.get('auth', `/api/users`, {});
      const countriesCount = await API.get(
        'auth',
        `/api/users/countriesCount`,
        {}
      );

      setUsersCount(users.length);
      setCountriesCount(countriesCount);
    })();
  }, [account, ethereum]);

  const generateDialog = () => {
    const os = getOS();
    const iosLink = 'https://apps.apple.com/us/app/metamask/id1438144202';
    const androidLink =
      'https://play.google.com/store/apps/details?id=io.metamask';
    const webLink =
      'https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn';

    const link =
      os === 'iOS' ? iosLink : os === 'Android' ? androidLink : webLink;
    return (
      <Dialog
        open={state.open}
        onClose={() => {
          setState({ ...state, open: false });
        }}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        <DialogTitle id='alert-dialog-title'>{'Install MetaMask?'}</DialogTitle>
        <DialogContent>
          <DialogContentText id='alert-dialog-description'>
            Please install
            <a href={link} target='_blank' rel='noopener noreferrer'>
              {'  '}MetaMask
            </a>
            {'  '}
            first.
          </DialogContentText>
        </DialogContent>
      </Dialog>
    );
  };

  const onLoggedIn = async (auth: Auth) => {
    const { accessToken } = auth;
    const {
      payload: { id }
    } = jwtDecode(accessToken);

    localStorage.setItem(LS_KEY, JSON.stringify(auth));
    const user: any = await API.get('auth', `/api/users/${id}`, {
      headers: { Authorization: `Bearer ${accessToken}` }
    })
      .then((user: User) => user)
      .catch(() => null);

    dispatch({
      type: UserActionTypes.SUCCESS,
      payload: user
    });
    history.push('profile');
  };

  const handleAuthenticate = ({
    publicAddress,
    signature
  }: {
    publicAddress: string;
    signature: string;
  }) =>
    API.post('auth', '/api/auth', {
      headers: { 'Content-Type': 'application/json' },
      body: { publicAddress, signature }
    })
      .then((response) => response)
      .catch((err) => err);

  const handleClick = async (type?: any) => {
    let publicAddress: any = '';
    if (!web3) {
      if (type === 'injected') {
        // Check if MetaMask is installed
        if (!(window as any).ethereum) {
          setState({ ...state, open: true });
          return;
        }

        try {
          // Request account access if needed
          await (window as any).ethereum.enable();

          // We don't know window.web3 version, so we use our own instance of Web3
          // with the injected provider given by MetaMask
          web3 = new Web3((window as any).ethereum);
          const coinbase = await web3.eth.getCoinbase();

          if (!coinbase) {
            window.alert('Please activate MetaMask first.');
            return;
          }

          publicAddress = coinbase.toLowerCase();
        } catch (error) {
          window.alert('You need to allow MetaMask.');
          return;
        }
      } else {
        await connect(type);

        if (address.current) {
          web3 = new Web3(eth.current);
          publicAddress = address.current.toLowerCase();
        }
      }
      (window as any).metaWeb3 = web3;

      if (publicAddress) {
        setState({ ...state, loading: true });

        // Look if user with current publicAddress is already present on backend
        await API.get('auth', `/api/users`, {
          queryStringParameters: { publicAddress }
        })
          // If yes, retrieve it. If no, create it.
          .then((users) =>
            users.length ? users[0] : handleSignUp(publicAddress)
          )
          // Popup MetaMask confirmation modal to sign message
          .then(handleSignMessage)
          .catch((err) => {
            alert(err);
            setState({ ...state, loading: false });
          });
      }
    }
  };

  const handleSignMessage = ({
    publicAddress,
    nonce
  }: {
    publicAddress: string;
    nonce: string;
  }): any => {
    try {
      var params: any = [
        web3.utils.utf8ToHex(`Sign DLN DAO contribution access: ${nonce}`),
        publicAddress
      ];
      var method: any = 'personal_sign';

      web3!.currentProvider.sendAsync(
        {
          method,
          params,
          publicAddress
        },
        (err: any, result: any) => {
          if (err)
            throw new Error(
              'You need to sign the message to be able to log in.'
            );
          if (result.error) return console.error(result.error);
          handleAuthenticate({
            publicAddress,
            signature: result.result
          }).then(onLoggedIn);
        }
      );
    } catch (err) {
      throw new Error(err);
    }
  };

  const handleSignUp = (publicAddress: string) => {
    const myReferralCode = (Math.random() + 1).toString(36).substring(7);
    const referredByCode = window.location.hash.split('=')[1] || '';

    return API.post('auth', '/api/users', {
      headers: { 'Content-Type': 'application/json' },
      body: { publicAddress, myReferralCode, referredByCode }
    }).then((response) => response);
  };

  const os = getOS();
  const GenerateDialog = generateDialog;

  return (
    <main className='main hidden'>
      <GenerateDialog />
      <header className='navbarTheme navbarTheme-sticky navbarTheme-expand-lg navbarTheme-light'>
        <div className='container-fluid position-relative'>
          <a className='navbarTheme-brand' href='index.html'>
            <img
              className='navbarTheme-brand__regular'
              src={dlnLogo}
              width='200px'
              alt='logo'
            />
            <img
              className='navbarTheme-brand__sticky'
              src={dlnLogo}
              width='200px'
              alt='dlnLogo'
            />
          </a>
          <div className='mr-lg-0 ml-lg-2 float-right'>
            <button
              onClick={() =>
                handleClick(
                  os === 'iOS' || os === 'Android'
                    ? 'walletconnect'
                    : 'injected'
                )
              }
              className='btnTheme btn-size--sm btn-bg--primary--05 btn-hover--splash color--primary Login-Padding'
            >
              <span className='btn__text font-w--500'>Log in</span>
            </button>
          </div>
        </div>
      </header>

      <section className='hero hero--full hero--v11 bg-color--primary-light--1 d-flex align-items-center'>
        <div className='svg-shape--top w-100'>
          <img src={wave8} alt='wave' className='svg fill--white' />
        </div>
        <div className='svg-shape--top'>
          <img src={wave9} alt='wave' className='svg fill-primary-light--1' />
        </div>
        <div className='container'>
          <div className='row flex-column-reverse flex-lg-row'>
            <div className='col-12 col-md-10 col-lg-7 mx-auto mx-lg-0 text-center text-lg-left z-index2'>
              <div className='hero-content reveal'>
                <div className='cd-intro'>
                  <h1 className='hero__title h2-font font-w--700 mb-2 cd-headline letters scale'>
                    The Path To End <br />
                    Financial{' '}
                    <span className='cd-words-wrapper color--primary'>
                      <TextTransition
                        text={AnimatedText[index % AnimatedText.length]}
                        springConfig={presets.wobbly}
                      />
                    </span>
                  </h1>
                </div>

                <p className='hero__description text-color--700 opacity--70 font-size--20 mb-4 mb-lg-5 pr-xl-5'>
                  DLN is a decentralized autonomous organization created by the
                  community for the community with a mission to launch an open
                  financial network that enables free 0% interest microloans
                  backed by your social reputation.
                </p>

                <p className='hero__description text-color--700 opacity--70 font-size--20 mb-4 mb-lg-5 pr-xl-5'>
                  Join DLN DAO now to make financial equality a reality.
                </p>

                <div className='d-flex align-items-center justify-content-center justify-content-lg-start'>
                  <button
                    onClick={() =>
                      handleClick(
                        os === 'iOS' || os === 'Android'
                          ? 'walletconnect'
                          : 'injected'
                      )
                    }
                    className='btnTheme btn-hover--3d btn-bg--primary btn-size--lg mr-2'
                  >
                    <span className='btn__text'>JOIN DLN DAO</span>
                  </button>
                  <ModalVideo
                    channel='youtube'
                    autoPlay={true}
                    isOpen={isOpen}
                    videoId='Z2FaDrjdLSQ'
                    onClose={() => setOpen(false)}
                  />

                  <button className='lightbox' onClick={() => setOpen(true)}>
                    <span
                      style={{
                        paddingLeft: '22px !important',
                        paddingTop: '20px !important'
                      }}
                      className='btnTheme btn-media color--primary btn-media-size--md btn-bg--light rounded--full padding22'
                    >
                      <i className='icon icon-triangle-right'></i>
                    </span>
                  </button>
                </div>
              </div>
            </div>
            <div className='col-12 col-lg-6 mt-6 mt-lg-0 mb-3 mb-lg-0 pl-lg-7 pb-lg-3 pos-abs-lg-vertical-center pos-right hero__image'>
              <picture>
                <img
                  src={hero11}
                  alt='hero-image'
                  className='img-fluid reveal'
                />
              </picture>
            </div>
          </div>
        </div>
      </section>

      <section className='py-4 pb-lg-10'>
        <div
          className='section-overlap bg-color--primary-light--1 pos-abs-top jsElement'
          data-height='360'
        ></div>

        <div className='container'>
          <div className='row'>
            <div className='col-12 col-sm-9 col-lg-6 mb-4 mb-lg-7 mx-auto text-center reveal'>
              <h2 className='mb-2 font-size--40 font-w--700'>
                The future <br />
                of <span className='color--primary'>lending</span> is here
              </h2>
              <p>
                DLN (Decentralized Lending Network) is a project intended for
                everyone and built by the community to enable affordable, zero
                fees, and interest-free microloans.
              </p>
            </div>
          </div>
          <div className='row'>
            <div className='col-12 col-sm-8 col-md-6 col-lg-4 mx-auto mb-3'>
              <div className='text-center'>
                <span className='icon--xl bg-color--primary rounded--full color--white mb-2'>
                  <i className='icon icon-remittances'></i>
                </span>
                <h3 className='font-size--26 font-w--700'>0% Loans</h3>
                <hr
                  className='bg-color--primary border--none mx-auto mb-3 jsElement'
                  data-height='3'
                  data-width='80'
                />
                <p>
                  DLN is the first blockchain lending network that allows you to
                  access zero interest and zero-fee loans.
                </p>
              </div>
            </div>
            <div className='col-12 col-sm-8 col-md-6 col-lg-4 mx-auto mb-3'>
              <div className='text-center'>
                <span className='icon--xl bg-color--primary rounded--full color--white mb-2'>
                  <i className='icon icon-mobile-money'></i>
                </span>
                <h3 className='font-size--26 font-w--700'>Mobile First</h3>
                <hr
                  className='bg-color--primary border--none mx-auto mb-3 jsElement'
                  data-height='3'
                  data-width='80'
                />
                <p>
                  DLN is built with a mobile first vision and a fully featured
                  open source mobile app for iOS and Android.
                </p>
              </div>
            </div>
            <div className='col-12 col-sm-8 col-md-6 col-lg-4 mx-auto mb-3'>
              <div className='text-center'>
                <span className='icon--xl bg-color--primary rounded--full color--white mb-2'>
                  <i className='icon icon-micro-payments'></i>
                </span>
                <h3 className='font-size--26 font-w--700'>Social Staking</h3>
                <hr
                  className='bg-color--primary border--none mx-auto mb-3 jsElement'
                  data-height='3'
                  data-width='80'
                />
                <p>
                  DLN is powered by a proprietary social staking algorithm that
                  earns interest for backers and liquidity providers.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className='space bg-color--primary'>
        <div className='svg-shape--top w-100 z-index1'>
          <img src={braces} alt='wave' className='svg w-100 fill--white' />
        </div>
        <div className='svg-shape--top opacity--05'>
          <img src={wave11} alt='wave' className='svg fill--white' />
        </div>
        <div className='svg-shape opacity--05'>
          <img src={wave10} alt='wave' className='svg fill--white' />
        </div>

        <div className='position-relative mb-xl-10'>
          <div className='container'>
            <div className='row flex-column-reverse flex-lg-row-reverse align-items-center text-center'>
              <div className='col-12 col-md-10 col-lg-6 text-lg-left'>
                <div className='mb-3 mb-md-5'>
                  <h2 className='mb-2 h3-font mb-md-3 font-w--700'>
                    Today’s Micro Lending Rails <br />
                    Don’t Cut It
                  </h2>
                  <p>
                    The inefficiencies in process and infrastructure of existing
                    micro lending providers result in high fees and financial
                    burdens for consumers.
                  </p>
                </div>

                <div className='row text-md-left justify-content-center'>
                  <div className='col-12 col-sm-6 d-flex flex-column flex-md-row mb-4'>
                    <span className='icon--3x mr-md-2 mb-1 mb-md-0 color--white'>
                      <i className='icon icon-turtle'></i>
                    </span>
                    <div>
                      <h3 className='h5-font font-w--700 mb-sm-1'>VERY SLOW</h3>
                      <p>Approvals can take weeks to months.</p>
                    </div>
                  </div>
                  <div className='col-12 col-sm-6 d-flex flex-column flex-md-row mb-4'>
                    <span className='icon--3x mr-md-2 mb-1 mb-md-0 color--white'>
                      <i className='icon icon-cut'></i>
                    </span>
                    <div>
                      <h3 className='h5-font font-w--700 mb-sm-1'>
                        INEFFICIENT
                      </h3>
                      <p>Too much paperwork adds to inefficiency.</p>
                    </div>
                  </div>
                  <div className='col-12 col-sm-6 d-flex flex-column flex-md-row mb-4'>
                    <span className='icon--3x mr-md-2 mb-1 mb-md-0 color--white'>
                      <i className='icon icon-card-update'></i>
                    </span>
                    <div>
                      <h3 className='h5-font font-w--700 mb-sm-1'>EXPENSIVE</h3>
                      <p>Compare rates of 30% and more to DLN's 0%</p>
                    </div>
                  </div>
                  <div className='col-12 col-sm-6 d-flex flex-column flex-md-row mb-4'>
                    <span className='icon--3x mr-md-2 mb-1 mb-md-0 color--white'>
                      <i className='icon icon-link-broken'></i>
                    </span>
                    <div>
                      <h3 className='h5-font font-w--700 mb-sm-1'>
                        UNACCEPTABLE
                      </h3>
                      <p>The world needs a better lending system.</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className='col-12 col-lg-6 mb-3 mb-lg-0 pos-abs-lg-vertical-center pos-left text-lg-right pr-lg-10'>
                <picture>
                  <img
                    src={illustration16}
                    alt='hero-image'
                    className='img-fluid reveal'
                  />
                </picture>
              </div>
            </div>
          </div>
        </div>

        <div className='position-relative pb-7 py-xl-10'>
          <div className='container'>
            <div className='row flex-column-reverse flex-lg-row align-items-center text-center'>
              <div className='col-12 col-md-10 col-lg-6 text-lg-left'>
                <h2 className='mb-3 h3-font font-w--700'>
                  DLN DAO: <br />
                  Decentralized Autonomous Organization
                </h2>
                <p className='opacity--80'>
                  DLN DAO is here to establish an open-source ecosystem of
                  lenders, borrowers, builders, and enthusiasts that overhauls
                  the traditional lending market with a more equitable,
                  decentralized network of contributors for developed and
                  developing countries.
                </p>

                <p className='opacity--80'>
                  The DAO will deliver micro-lending support structures that
                  traditional lending and borrowing vehicles provide, yet in a
                  decentralized fashion that encourages and incentivizes
                  participation and maintenance of the entire lending network.
                </p>
              </div>
              <div className='col-12 col-lg-6 mt-5 mt-lg-0 mb-3 mb-lg-0 pl-lg-10 pos-abs-lg-vertical-center pos-right text-lg-left'>
                <picture>
                  <img
                    src={illustration17}
                    alt='hero-image'
                    className='img-fluid reveal'
                  />
                </picture>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        className='space--bottom jsElement'
        style={{ marginTop: '-60px' }}
      >
        <div className='container'>
          <div className='row'>
            <div className='col-12 col-sm-6 col-lg-3 mb-3 mb-lg-0'>
              <div className='card border--none bg-white text-center box-shadow--4 py-4 px-2 d-flex align-items-center card-hover--shadow-3d'>
                <span className='icon--lg color--primary bg-color--primary-opacity--10 rounded--full mb-2'>
                  <i className='icon icon-key'></i>
                </span>
                <h3 className='h5-font font-w--700 mb-1'>Access</h3>
                <p className='font-size--16'>
                  Tap into a global network of qualified borrowers and lenders.
                </p>
              </div>
            </div>
            <div className='col-12 col-sm-6 col-lg-3 mb-3 mb-lg-0'>
              <div className='card border--none bg-white text-center box-shadow--4 py-4 px-2 d-flex align-items-center card-hover--shadow-3d'>
                <span className='icon--lg color--primary bg-color--primary-opacity--10 rounded--full mb-2'>
                  <i className='icon icon-metrics'></i>
                </span>
                <h3 className='h5-font font-w--700 mb-1'>Speed</h3>
                <p className='font-size--16'>
                  Start bowworing and backing projects with instant settlement.
                </p>
              </div>
            </div>
            <div className='col-12 col-sm-6 col-lg-3 mb-3 mb-lg-0'>
              <div className='card border--none bg-white text-center box-shadow--4 py-4 px-2 d-flex align-items-center card-hover--shadow-3d'>
                <span className='icon--lg color--primary bg-color--primary-opacity--10 rounded--full mb-2'>
                  <i className='icon icon-touch-id'></i>
                </span>
                <h3 className='h5-font font-w--700 mb-1'>Security</h3>
                <p className='font-size--16'>
                  DLN leverages secure smart contracts and blockchain
                  technology.
                </p>
              </div>
            </div>
            <div className='col-12 col-sm-6 col-lg-3 mb-3 mb-lg-0'>
              <div className='card border--none bg-white text-center box-shadow--4 py-4 px-2 d-flex align-items-center card-hover--shadow-3d'>
                <span className='icon--lg color--primary bg-color--primary-opacity--10 rounded--full mb-2'>
                  <i className='icon icon-3d-29'></i>
                </span>
                <h3 className='h5-font font-w--700 mb-1'>Decentralized</h3>
                <p className='font-size--16'>
                  DLN DAO runs itself through a community of dedicated
                  supporters.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className='svg-shape--top w-100 z-index1'>
          <img src={braces} alt='wave' className='svg w-100 fill--white' />
        </div>
        <div className='bg-color--primary-light--1 space--top position-relative z-index2 pb-5'>
          <div className='container'>
            <div className='row'>
              <div className='col-12 col-lg-10 mx-auto text-center reveal'>
                <h2 className='mb-3 font-size--40 font-w--700'>
                  <span className='color--primary'>Next generation</span>{' '}
                  financial network <br />
                  and decentralized economy.
                </h2>
                <p className='mb-4 mb-lg-7 px-lg-6'>
                  Dr. Adel ElMessiry recently presented the concept and call for
                  contributors for DLN at the LA Blockchain Summit, the world’s
                  largest blockchain and crypto conference.
                </p>
                <a
                  target='_blank'
                  rel='noopener noreferrer'
                  className='btn btn-bg--primary lightbox reveal'
                  data-autoplay='true'
                  data-vbtype='video'
                  href='https://www.youtube.com/watch?v=Z2FaDrjdLSQ'
                >
                  <span className='btn__text'>
                    <i className='icon icon-play-outline mr-1 font-size--30'></i>
                    Watch the presentation
                  </span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
      <hr className='my-0' style={{ borderTop: '5px solid #1ed660' }} />
      <section className='space--top bg-color--primary'>
        <div className='background-holder background--top--left dln-partner-back'></div>
        <div className='svg-shape w-100 jsElement' data-push='250'>
          <img src={wave13} alt='wave' className='svg w-100' />
        </div>
        <div
          className='section-overlap bg-color--primary-light--1 d-lg-none d-xl-block pos-abs-bottom jsElement'
          data-height='170'
        ></div>

        <div className='container'>
          <div className='row text-center text-md-left justify-content-between align-items-lg-center align-items-xl-end mb-6'>
            <div className='col-12 col-sm-10 col-md-7 mb-5 mb-md-0 mx-auto mx-md-0 reveal'>
              <h2 className='mb-2 h3-font font-w--700'>
                Mission-Driven <br /> Global Contributors
              </h2>
              <p className='opacity--80'>
                DLN DAO’s initial contributors encompass some of the top
                blockchain projects in the world.{' '}
              </p>
            </div>
            <div className='col-12 col-sm-8 col-md-5 col-xl-4 d-inline-flex d-lg-block align-items-center justify-content-center mx-auto mx-md-0'>
              <div className='row justify-content-between'>
                <div className='col-sm-10 col-md-5 col-xl-5 dln-states py-2 card box-shadow--5 border--none text-center'>
                  <span className='font-size--60 color--green'>
                    {usersCount === 0 && (
                      <Spinner
                        className='font-size--18 mb-2 mr-2'
                        as='span'
                        animation='border'
                        role='status'
                        aria-hidden='true'
                      />
                    )}
                    {usersCount !== 0 && <span>{usersCount} </span>}+
                  </span>
                  <span className='h4-font text-color--400'>Contributors</span>
                </div>
                <div className='col-sm-10 col-md-5 col-xl-5 dln-states py-2 card box-shadow--5 border--none  text-center'>
                  <span className='font-size--60 color--green'>
                    {countriesCount === 0 && (
                      <Spinner
                        className='font-size--18 mb-2 mr-2'
                        as='span'
                        animation='border'
                        role='status'
                        aria-hidden='true'
                      />
                    )}
                    {countriesCount !== 0 && <span>{countriesCount} </span>}+
                  </span>
                  <span className='h4-font text-color--400'>Countries</span>
                </div>
              </div>
            </div>
          </div>

          <div className='row justify-content-between align-items-lg-start'>
            <div className='col-12 col-lg-7 col-xl-7 d-flex flex-wrap flex-column flex-sm-row align-items-center justify-content-center align-items-lg-start justify-content-lg-start justify-content-xl-between mb-4 mb-lg-0 reveal dln-partner-section'>
              <div className='card d-inline-flex border--none bg-color--transparent card-hover--bg--alt-shadow mb-1 mx-sm-2 mx-xl-0 mb-md-4 p-3 jsElementFocus'>
                <span>
                  <img src={dgh} alt='partner' />
                </span>
              </div>
              <div className='card d-inline-flex border--none bg-color--transparent card-hover--bg--alt-shadow mb-1 mx-sm-2 mx-sm-1 mx-xl-0 mb-md-4 p-3 jsElementFocus'>
                <span>
                  <img src={casper} alt='partner' />
                </span>
              </div>

              <div className='card d-inline-flex border--none bg-color--transparent card-hover--bg--alt-shadow mb-1 mx-sm-2 mx-xl-0 mb-md-4 p-3 jsElementFocus'>
                <span>
                  <img src={coinsquad} alt='partner' />
                </span>
              </div>
              <div className='card d-inline-flex border--none bg-color--transparent card-hover--bg--alt-shadow mb-1 mx-sm-2 mx-xl-0 mb-md-4 p-3 jsElementFocus'>
                <span>
                  <img src={dmm} alt='partner' />
                </span>
              </div>
              <div className='card d-inline-flex border--none bg-color--transparent card-hover--bg--alt-shadow mb-1 mx-sm-2 mx-xl-0 mb-md-4 p-3 jsElementFocus'>
                <span>
                  <img src={giftz} alt='partner' />
                </span>
              </div>
              <div className='card d-inline-flex border--none bg-color--transparent card-hover--bg--alt-shadow mb-1 mx-sm-2 mx-xl-0 mb-md-4 p-3 jsElementFocus'>
                <span>
                  <img src={lunarCrush} alt='partner' />
                </span>
              </div>
              <div className='card d-inline-flex border--none bg-color--transparent card-hover--bg--alt-shadow mb-1 mx-sm-2 mx-xl-0 mb-md-4 p-3 jsElementFocus'>
                <span>
                  <img src={primedao} alt='partner' />
                </span>
              </div>
              <div className='card d-inline-flex border--none bg-color--transparent card-hover--bg--alt-shadow mb-1 mx-sm-2 mx-xl-0 mb-md-4 p-3 jsElementFocus'>
                <span>
                  <img src={rivet} alt='partner' />
                </span>
              </div>
              <div className='card d-inline-flex border--none bg-color--transparent card-hover--bg--alt-shadow mb-1 mx-sm-2 mx-xl-0 mb-md-4 p-3 jsElementFocus'>
                <span>
                  <img src={totle} alt='partner' />
                </span>
              </div>
              <div className='card d-inline-flex border--none bg-color--transparent card-hover--bg--alt-shadow mb-1 mx-sm-2 mx-xl-0 mb-md-4 p-3 jsElementFocus'>
                <span>
                  <img src={blockchain} alt='partner' />
                </span>
              </div>
              <div className='card d-inline-flex border--none bg-color--transparent card-hover--bg--alt-shadow mb-1 mx-sm-2 mx-xl-0 mb-md-4 p-3 jsElementFocus'>
                <span>
                  <img src={WebDbtech} alt='partner' />
                </span>
              </div>
              <div className='card d-inline-flex border--none bg-color--transparent card-hover--bg--alt-shadow mb-1 mx-sm-2 mx-xl-0 mb-md-4 p-3 jsElementFocus'>
                <span>
                  <img src={wish} alt='partner' />
                </span>
              </div>
            </div>
            <div className='col-12 col-md-10 col-lg-5 col-xl-4 mx-auto mx-lg-0 px-0'>
              <div className='testimonials testimonials--v2 position-relative pb-7 dln-testimonials'>
                <div className='carosuel-slider--v5 card box-shadow--5 p-3 pb-10'>
                  <Slider {...sliderSettings}>
                    <div className='slide'>
                      <span className='testimonial__quote color--green'>
                        <i className='icon icon-quote'></i>
                      </span>
                      <blockquote className='body-font blockquote mb-2'>
                        By putting one's own reputation on the line, a backer
                        collection decides to back a borrower's proposal by
                        providing the assets required for the borrower to
                        receive the loan.
                      </blockquote>
                      <div className='d-flex align-items-center'>
                        <span className='mr-2'>
                          <img
                            src={feedBackJoe}
                            className='img img-thumbnail rounded-circle'
                            width='66'
                            height='66'
                            alt='avatar'
                          />
                        </span>
                        <div className='d-flex flex-column'>
                          <span className='client-name font-size--17 font-w--600'>
                            Joe Vezzani
                          </span>
                          <span>CEO LunarCRUSH</span>
                        </div>
                      </div>
                    </div>

                    <div className='slide'>
                      <span className='testimonial__quote color--green'>
                        <i className='icon icon-quote'></i>
                      </span>
                      <blockquote className='body-font blockquote mb-2'>
                        The social staking contract allows the close friends of
                        the borrower to take a chance by backing the borrower
                        proposal. It is this backing that de-risks the borrowing
                        process and creates a Backed Collateral Debt Position
                        (BCDP) that is enforced by the social relation between
                        the backer and the borrower.
                      </blockquote>
                      <div className='d-flex align-items-center'>
                        <span className='mr-2'>
                          <img
                            src={feedBackAdel}
                            className='img img-thumbnail rounded-circle'
                            width='66'
                            height='66'
                            alt='avatar'
                          />
                        </span>
                        <div className='d-flex flex-column'>
                          <span className='client-name font-size--17 font-w--600'>
                            Dr. Adel ElMessiry
                          </span>
                          <span>DLN DAO</span>
                        </div>
                      </div>
                    </div>
                    <div className='slide'>
                      <span className='testimonial__quote color--green'>
                        <i className='icon icon-quote'></i>
                      </span>
                      <blockquote className='body-font blockquote mb-2'>
                        Blockchain in its essence is by, and for the community,
                        it has undergone two evolutions, the first was digital
                        asset creation while the second is DeFi. Both fell short
                        of addressing the needs of the global underbanked
                        community.
                      </blockquote>
                      <div className='d-flex align-items-center'>
                        <span className='mr-2'>
                          <img
                            src={feedBackAdel}
                            className='img img-thumbnail rounded-circle'
                            width='66'
                            height='66'
                            alt='avatar'
                          />
                        </span>
                        <div className='d-flex flex-column'>
                          <span className='client-name font-size--17 font-w--600'>
                            Dr. Adel ElMessiry
                          </span>
                          <span>DLN DAO</span>
                        </div>
                      </div>
                    </div>
                    <div className='slide'>
                      <span className='testimonial__quote color--green'>
                        <i className='icon icon-quote'></i>
                      </span>
                      <blockquote className='body-font blockquote mb-2'>
                        Millions of sincere and hardworking people across the
                        world are deprived of one thing that stops them from
                        becoming successful: access to finance. By introducing
                        social stake and blockchain-based secure solution, DLN
                        has the potential to revolutionize this space.
                      </blockquote>
                      <div className='d-flex align-items-center'>
                        <div className='d-inline-block dln-user-testimonial'>
                          <img
                            src={feedBackBadri}
                            className='img img-thumbnail rounded-circle'
                            width='66'
                            height='66'
                            alt='avatar'
                          />
                        </div>
                        <div className='d-flex flex-column'>
                          <span className='client-name font-size--17 font-w--600'>
                            Dr. Badri Narayanan Gopalakrishnan
                          </span>
                          <span>
                            Founder and Director, Infinite Sum Modelling
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className='slide'>
                      <span className='testimonial__quote color--green'>
                        <i className='icon icon-quote'></i>
                      </span>
                      <blockquote className='body-font blockquote mb-2'>
                        DLN is on a mission to create a decentralized lending
                        network protocol supported by a decentralized autonomous
                        organization (DAO) that will allow micro-lending without
                        any fees, interest or collateral from the borrower while
                        still providing rewards to the backer through an
                        innovative social staking contract.
                      </blockquote>
                      <div className='d-flex align-items-center'>
                        <span className='mr-2'>
                          <img
                            src={feedBackAdel}
                            className='img img-thumbnail rounded-circle'
                            width='66'
                            height='66'
                            alt='avatar'
                          />
                        </span>
                        <div className='d-flex flex-column'>
                          <span className='client-name font-size--17 font-w--600'>
                            Dr. Adel ElMessiry
                          </span>
                          <span>DLN DAO</span>
                        </div>
                      </div>
                    </div>
                    <div className='slide'>
                      <span className='testimonial__quote color--green'>
                        <i className='icon icon-quote'></i>
                      </span>
                      <blockquote className='body-font blockquote mb-2'>
                        Social staking is an innovative design that truly
                        enables democratization of finance. DLN is making
                        financial services more accessible to everyone globally
                        through novel products and community governance.
                      </blockquote>
                      <div className='d-flex align-items-center'>
                        <span className='mr-2'>
                          <img
                            src={feedBackDavid}
                            className='img img-thumbnail rounded-circle'
                            width='66'
                            height='66'
                            alt='avatar'
                          />
                        </span>
                        <div className='d-flex flex-column'>
                          <span className='client-name font-size--17 font-w--600'>
                            David Bleznak
                          </span>
                          <span>Founder and CEO of Totle</span>
                        </div>
                      </div>
                    </div>
                  </Slider>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className='bg-color--primary-light--1 pt-6 pb-7 pb-lg-10'>
        <div className='container'>
          <div className='row'>
            <div className='col-12 col-sm-9 col-lg-6 mb-4 mb-lg-6 mx-auto text-center reveal'>
              <h2 className='mb-2 font-size--40 font-w--700'>
                Join the Community
              </h2>
              <p>
                Join our channels to others who are eager to pave a path towards
                the end of financial slavery.
              </p>
            </div>
          </div>
          <div className='row'>
            <div className='col-12 mx-auto'>
              <div className='icon-fill--wide text-center d-lg-flex justify-content-lg-center flex-wrap reveal'>
                <a
                  className='t-icon box-shadow--5 rounded--05 m-1 btn-hover--primary'
                  href='https://t.me/DLNDAO'
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  <span className='t-icon__brand-icon h4-font color--primary'>
                    <i className='fab fa-telegram-plane'></i>
                    <FontAwesomeIcon icon={faTelegramPlane} />
                  </span>
                  <span className='t-icon__brand-name h5-font font-w--500 text-color--700'>
                    telegram
                  </span>
                </a>
                <a
                  className='t-icon box-shadow--5 rounded--05 m-1 btn-hover--primary'
                  href='https://www.facebook.com/DLN-DAO-107891987768628'
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  <span className='t-icon__brand-icon h4-font color--primary'>
                    {/* <i className='fab fa-facebook-alien'></i> */}
                    <FontAwesomeIcon icon={faFacebookF} />
                  </span>
                  <span className='t-icon__brand-name h5-font font-w--500 text-color--700'>
                    facebook
                  </span>
                </a>
                <a
                  className='t-icon box-shadow--5 rounded--05 m-1 btn-hover--primary'
                  href='https://dlndao.medium.com/'
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  <span className='t-icon__brand-icon h4-font color--primary'>
                    <FontAwesomeIcon icon={faMedium} />
                  </span>
                  <span className='t-icon__brand-name h5-font font-w--500 text-color--700'>
                    medium
                  </span>
                </a>
                <a
                  className='t-icon box-shadow--5 rounded--05 m-1 btn-hover--primary'
                  href='https://www.linkedin.com/company/dln-dao'
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  <span className='t-icon__brand-icon h4-font color--primary'>
                    <FontAwesomeIcon icon={faLinkedinIn} />
                  </span>
                  <span className='t-icon__brand-name h5-font font-w--500 text-color--700'>
                    linkedin
                  </span>
                </a>
                <a
                  className='t-icon box-shadow--5 rounded--05 m-1 btn-hover--primary'
                  href='https://twitter.com/dlndao'
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  <span className='t-icon__brand-icon h4-font color--primary'>
                    <FontAwesomeIcon icon={faTwitter} />
                  </span>
                  <span className='t-icon__brand-name h5-font font-w--500 text-color--700'>
                    twitter
                  </span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className='space--top'>
        <div className='position-relative pb-7 pb-md-4 pb-lg-1 pb-xl-0 z-index1'>
          <div className='container'>
            <div className='row'>
              <div className='col-12 col-sm-9 col-lg-6 mb-4 mb-lg-7 mx-auto text-center reveal'>
                <h2 className='mb-2 font-size--40 font-w--700'>
                  Sign up for the latest updates.
                </h2>
                <p>Sign up below for the latest updates on DLN DAO.</p>
              </div>
            </div>
            <div className='row mb-8'>
              <div className='col-12 col-md-10 col-lg-6 mx-md-auto'>
                <div className='form--v4 reveal'>
                  <form
                    action='#'
                    className='form bg-color--primary rounded--05'
                  >
                    <div className='input-group d-flex'>
                      <input
                        type='email'
                        className='form-control'
                        placeholder='Enter your email'
                        required
                      />
                      <button
                        className='btn btn-hover--splash btn-bg--primary'
                        type='submit'
                      >
                        <span className='btn__text'>
                          <i className='icon icon-arrow-right'></i>
                        </span>
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
            <div className='row'>
              <div className='col-12 col-md-10 col-lg-9 col-xl-8 text-center mx-auto mb-3 mb-sm-1'>
                <picture>
                  <img
                    src={newsLetter}
                    alt='illustration'
                    className='img-fluid'
                  />
                </picture>
              </div>
            </div>
          </div>
        </div>

        <footer
          className='footer bg-color--primary section--dark position-relative hidden jsElement'
          data-pull='-153'
        >
          <div className='py-3'>
            <div className='container'>
              <div className='row'>
                <div className='col-12 text-center'>
                  <p className='font-size--15 opacity--80'>
                    © 2020{' '}
                    <a href='#' className='color--white'>
                      DLN.org
                    </a>
                    . All Rights Reserved.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </section>
    </main>
  );
}
