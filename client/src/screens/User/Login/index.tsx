import React from 'react';
import { useHistory } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import { Signer } from 'casper-js-sdk';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import {
  faFacebookF,
  faLinkedinIn,
  faTelegramPlane,
  faTwitter,
  faMedium,
} from '@fortawesome/free-brands-svg-icons';

import { useUserDispatch } from 'contexts/UserAuthContext';
import { UserActionTypes } from 'types';
import Card from './card';
import { Header } from 'components/Header';
import PrivacyPolicyModal from 'components/modal/privacyPolicyModal';
import JoinBoxModal from 'components/modal/joinBoxModal';
import { getActivePublicKey } from 'services/casper';

import {
  DLNLHeroRight,
  Borrower,
  Lenders,
  SocialStaking,
  SocialStakingSmall,
  Money,
  Social,
  Investors,
  Proposal,
  Token,
  Giftz,
  Casper,
  PD,
  BS,
  Rivet,
  Totle,
  wishKnish,
  WDBT,
  Assets,
  Drapper,
  Arrow,
  ArrowWithHeads,
  alphaFin2,
  CoinSqad,
  DLN_Community,
  Factory,
} from 'Assets/img';
// landing page with sections
export function Login() {
  const history = useHistory();
  const dispatch = useUserDispatch();
  const [display, setDisplay] = React.useState(false);
  const [displayJoinBox, setDisplayJoinBox] = React.useState(false);

  const handleClick = async (type?: any) => {
    const isConnected = await Signer.isConnected();

    if (!isConnected) {
      try {
        Signer.sendConnectionRequest();
      } catch (e) {
        alert('Please download or enable CasperLabs Signer extension.');
        return;
      }
    }

    const selectedAddress = await Signer.getActivePublicKey()
      .then((key) => key)
      .catch((err) => {});

    if (selectedAddress) {
      const pk: any = await getActivePublicKey();
      console.log(pk);
      // setActivePublicKey(pk);
      // setIsConnected(true);
      const casperUser: any = { publicAddress: pk };
      dispatch({
        type: UserActionTypes.SUCCESS,
        payload: casperUser,
      });
      history.push('CasperAssets');
    }
  };

  const displayText = () => {
    setDisplay(true);
  };

  const handler = () => {
    setDisplay(false);
  };

  const handlerCloseBox = () => {
    setDisplayJoinBox(false);
  };
  return (
    <>
      <Container fluid className='px-0 dln-landPage'>
        <Header handleClick={handleClick} />
        <div className='dln-header-line'></div>
        <main className='dln-hero mt-2'>
          <Row>
            <Col md={7} sm={12} className='dln-hero-left'>
              <div className='dln-hero-left--text'>
                <h1>AT THE INTERSECTION OF DEFI AND GIVING</h1>
                <p className='dln-text'>
                  Introducing a system that lifts billions out of poverty and
                  rewards all stakeholders. DLN is the future of Microfinancing,
                  a future in which Microloans are easily accessible, rapidly
                  distributed and plentiful.
                </p>
                <button className='btn btn-joinUs' onClick={handleClick}>
                  Enter
                </button>
              </div>
            </Col>
            <Col md={5} sm={12} className='pl-0 dln-hide-small-device'>
              <div className='dln-hero-right'>
                <img
                  className='visibility-hidden'
                  src={DLNLHeroRight}
                  alt='hero-right'
                />
              </div>
            </Col>
          </Row>
        </main>
        <section className='py-5 mt-3 dln-Microlending-section' id='vision'>
          <Row className='justify-content-center'>
            <Col md={6} sm={12}>
              <h1 className='dln-title text-center'>
                Microlending{' '}
                <label className='dln-title  dln-space-no-wrap pl-0'>
                  Re-imagined
                </label>
              </h1>
              <p className='dln-text text-center px-5 mx-3 dln-px-sm-2'>
                Traditional financing is a two-party system: the borrower and
                the lender. DLN breaks the mold, adding a third party:&nbsp;
                <span className='dln-color-accent dln-space-no-wrap'>
                  The Investor
                </span>
              </p>
            </Col>
          </Row>
          <Row className='px-5 mt-3 pt-5 dln-px-sm-2'>
            <Col md={4} sm={12} className='dln-card-container  mb-2'>
              <div className='dln-card dln-card-borrower'>
                <h4 className='dln-card-title'>Borrower</h4>
                <p className='dln-text px-3'>
                  Borrower applies for loan with smartphone and asks social
                  network for help collateralizing loan.
                </p>
              </div>
            </Col>
            <Col
              md={4}
              sm={12}
              className='dln-card-container px-3 mb-2 dln-card-container--investor'
            >
              <div className='dln-card px-2  dln-card-investor'>
                <h4 className='dln-card-title'>Investor</h4>
                <p className='dln-text px-3'>
                  Friends, neighbors and family chip in, offering up assets to
                  collateralize borrower loan.
                </p>
              </div>
            </Col>
            <Col md={4} sm={12} className='dln-card-container  mb-2'>
              <div className='dln-card dln-card-lender'>
                <h4 className='dln-card-title'>Lender</h4>
                <p className='dln-text px-3'>
                  With borrower loan fully collateralized, the Lender’s funds
                  are released risk-free to borrower.
                </p>
              </div>
            </Col>
          </Row>
          <div className='dln-scaling-section'>
            <div>
              <img
                src={SocialStaking}
                className='visibility-hidden dln-hide-small-device'
                alt='back'
              />
              <img
                src={SocialStakingSmall}
                className='visibility-hidden d-none dln-show-small-device'
                alt='back'
              />
            </div>
            <Col
              md={{ span: 5, offset: 6 }}
              className='dln-scaling-section--content'
            >
              <h1 className='dln-title'>Scaling Just Got Easier</h1>
              <p className='dln-text text-left'>
                Investor collateral and the liquidity provided by lenders are
                invested in the blockchain money market.
              </p>
              <p className='dln-text text-left'>
                While traditional banks net a meager .4%, safe deposits on the
                blockchain deliver APY earnings in excess of 9%.
              </p>
              <h2 className='dln-title dln-title--sub mt-3'>
                The DLN Difference
              </h2>
              <Row>
                <Col className='d-flex justify-content-center'>
                  <div className='dln-details-box  px-5 py-3 dln-px-sm-2'>
                    <Row className='mb-2'>
                      <Col md={4}>
                        <div className='dln-details-box--left'>Borrowers</div>
                      </Col>
                      <Col>
                        <div className='dln-details-box--right'>
                          PAY 0% INTEREST
                        </div>
                      </Col>
                    </Row>
                    <Row className='mb-2'>
                      <Col md={4}>
                        <div className='dln-details-box--left'>Lenders</div>
                      </Col>
                      <Col>
                        <div className='dln-details-box--right'>
                          EARN 3% INTEREST
                        </div>
                      </Col>
                    </Row>
                    <Row>
                      <Col md={4}>
                        <div className='dln-details-box--left'>Investors</div>
                      </Col>
                      <Col>
                        <div className='dln-details-box--right'>
                          EARN 3% INTEREST
                        </div>
                      </Col>
                    </Row>
                  </div>
                </Col>
              </Row>
            </Col>
          </div>
        </section>
        <section className='py-3 dln-finance-section mb-5'>
          <Row className='justify-content-center'>
            <Col md={12} sm={12}>
              <h1 className='dln-title text-center dln-title--micro'>
                Microfinance Just Got a New Set of Rails
              </h1>
            </Col>
          </Row>
          <Row className='px-5 dln-px-sm-2'>
            <Col lg={3} md={6} sm={12} className='dln-card-container  mb-2'>
              <div className='dln-card'>
                <h4 className='dln-card-title'>Affordability</h4>
                <p className='dln-text px-3'>
                  Borrower only pays back principle. No fees. Interest rates are
                  0%.
                </p>
              </div>
            </Col>
            <Col lg={3} md={6} sm={12} className='dln-card-container mb-2'>
              <div className=' dln-card'>
                <h4 className='dln-card-title'>Accessibility</h4>
                <p className='dln-text px-3'>
                  Brick & Mortar is a thing of the past. With DLN, business is
                  done on a smartphone.
                </p>
              </div>
            </Col>
            <Col lg={3} md={6} sm={12} className='dln-card-container mb-2'>
              <div className='dln-card'>
                <h4 className='dln-card-title'>Community Focused</h4>
                <p className='dln-text px-3'>
                  Local capital is unlocked, and community members are rewarded
                  for participation.
                </p>
              </div>
            </Col>
            <Col lg={3} md={6} sm={12} className='dln-card-container mb-2'>
              <div className='dln-card'>
                <h4 className='dln-card-title'>Sustainability</h4>
                <p className='dln-text px-3'>
                  A financial system that does not depend on government
                  assistance or NGO subsidies.
                </p>
              </div>
            </Col>
          </Row>
        </section>
        <section className='dln-social-stacking-section py-4'>
          <Row>
            <Col md={3} className='align-self-center'>
              {' '}
              <img src={Social} alt='social' />
            </Col>
            <Col md={6} className='align-self-center px-4'>
              <h1 className='dln-title text-center dln-color-green3'>
                Social Staking
              </h1>
              <p className='dln-text dln-color-green3 text-center px-5 mx-3 dln-px-sm-2'>
                IP Pending, Application No.: 63/072,738
              </p>
              <p className='dln-text text-white text-left'>
                Along with the efficiencies of Decentralized Finance, DLN adds a
                patent-pending, community-driven innovation: Social Staking.
              </p>
              <p className='dln-text text-white text-left'>
                In any conventional lending market, there is a borrower and a
                lender. What makes DLN so revolutionary is that there is also a
                third party: The Investor.
              </p>
              <p className='dln-text text-white text-left'>
                Investors are members of the borrower’s community. With DLN, the
                borrower asks community members for help collateralizing the
                loan. In supporting the borrower, that investor earns rewards.
              </p>{' '}
            </Col>
            <Col md={3} className='align-self-center'>
              <img src={Money} alt='Money' className='dln-land-money' />
            </Col>
          </Row>
        </section>
        <section className='dln-smart-contract py-5 px-5 dln-hide-small-device dln-social-staking-hide-in-ipad'>
          <Row className='px-5 mx-5 py-5'>
            <Col md={12} lg={4}>
              <Row>
                <Col>
                  <div className='dln-smart-contract-item mb-3'>
                    <img
                      src={Investors}
                      alt='Money'
                      className='dln-smart-contract-img'
                    />
                    <span className='dln-smart-contract-caption'>
                      Investors
                    </span>
                  </div>
                  <div className='mb-3'>
                    <img src={Arrow} alt='arrow' className='dln-arrow' />
                  </div>
                  <div className='dln-smart-contract-item'>
                    {' '}
                    <img
                      src={Assets}
                      alt='Assets'
                      className='dln-smart-contract-img'
                    />
                    <span className='dln-smart-contract-caption'>Asset</span>
                  </div>
                </Col>
                <Col md={1} className='dln-rotate-140 align-self-center'>
                  <img src={ArrowWithHeads} alt='arrow' className='dln-arrow' />
                </Col>
              </Row>
            </Col>

            <Col md={12} lg={4} className='align-self-center'>
              <div className='dln-outer-box  text-center d-inline-block mb-5'>
                <div className='dln-inner-box'>
                  Social Staking Smart Contract
                </div>
              </div>
              <div>
                <img
                  src={ArrowWithHeads}
                  alt='arrow'
                  className='dln-arrow dln-rotate-90 mb-3'
                />
              </div>
              <div className='dln-smart-contract-item'>
                <img
                  src={Proposal}
                  alt='Assets'
                  className='dln-smart-contract-img'
                />
                <span className='dln-smart-contract-caption'>Proposal</span>
              </div>
              <div className='dln-smart-contract-item'>
                <img
                  src={Borrower}
                  alt='Assets'
                  className='dln-smart-contract-img'
                />
                <span className='dln-smart-contract-caption'>Borrower</span>
              </div>
            </Col>

            <Col md={12} lg={4}>
              <Row>
                <Col md={1} className='align-self-center'>
                  <img
                    src={ArrowWithHeads}
                    alt='arrow'
                    className='dln-arrow dln-rotate-40'
                  />
                </Col>
                <Col>
                  <div className='dln-smart-contract-item mb-3'>
                    <img
                      src={Lenders}
                      alt='Money'
                      className='dln-smart-contract-img'
                    />
                    <span className='dln-smart-contract-caption'>Lenders</span>
                  </div>
                  <div className='mb-3'>
                    <img src={Arrow} alt='arrow' className='dln-arrow' />
                  </div>
                  <div className='dln-smart-contract-item'>
                    {' '}
                    <img
                      src={Token}
                      alt='Assets'
                      className='dln-smart-contract-img'
                    />
                    <span className='dln-smart-contract-caption'>Asset</span>
                  </div>
                </Col>
              </Row>{' '}
            </Col>
          </Row>
        </section>
        <div className='dln-bg-grey'>
          <section className='container future-roadmap-area pt-5' id='mfi'>
            <Row className='justify-content-center'>
              <Col md={12} sm={12}>
                <h1 className='dln-title text-center'>
                  Finally, Something the Unbanked Can Bank On
                </h1>
              </Col>
            </Row>
            <Row className='justify-content-center mt-3 mx-1'>
              <Col
                md={3}
                xs={9}
                className='dln-MFI-outerBox p-1 d-flex flex-column align-self-center'
              >
                <div className='dln-MFI-text'>MFIs Wanted</div>
                <div>
                  {' '}
                  <a className='dln-MFI-innerBox' href='mailto:Contact@DLN.org'>
                    Contact Us
                  </a>
                </div>
              </Col>
              <Col md={9} sm={12} className='text-left pl-4 dln-MFI-right-text'>
                <p>You are fiercely protective of the community you serve. </p>

                <p>Yours is a labor of love.</p>

                <p>
                  On-boarding new initiatives takes time and resources that are
                  scarce.
                </p>
                <p className='dln-MFI-right-text-large mb-0'>
                  DLN IS HERE TO HELP. LET'S BUILD TOGETHER.
                </p>
              </Col>
            </Row>
            <Row>
              <Col className='text-left mt-5 dln-mt-sm-2 '>
                <p className='dln-MFI-right-text'>
                  The Decentralized Lending Network does not compete with
                  existing Microfinance Institutions. DLN is not an MFI. It’s a
                  technology, a new set of rails that will allow existing MFIs
                  to scale. As such, our market is any and all of the 3,000+
                  MFIs around the world. Our goal with DLN is simple: Provide
                  Microfinance Institutions with the freedom to scale, and meet
                  the needs of the billions in need.
                </p>
              </Col>
            </Row>
            <Row className='justify-content-center my-4'>
              <Col md={12} sm={12} className='justify-content-center d-flex'>
                <div className='dln-dogood-text dln-dogood-text--timeline'>
                  <Row className='justify-content-center'>
                    <Col md='auto' sm={12}>
                      <h2>PAST.</h2>
                    </Col>
                    <Col md='auto' sm={12}>
                      <h2>PRESENT.</h2>
                    </Col>
                    <Col md='auto' sm={12}>
                      <h2>FUTURE.</h2>
                    </Col>
                  </Row>
                </div>
              </Col>
            </Row>
            <section className='timeline timeline-1 bg-gray'>
              <div className='container'>
                {/*.row end */}
                <div className='row dln-roadmap py-5'>
                  <div className='col-sm-12 col-md-12 col-lg-10 offset-lg-1'>
                    <div className='timeline-content'>
                      <div className='row row-interval  flex-row-reverse'>
                        <div className='col-md-6'>
                          <div className='timeline-panel timeline-panel-right'>
                            <div className='event--date'>
                              <span className='day'>22</span>
                              <span className='month'>Aug, 2020</span>
                            </div>
                            <div className='event--content'>
                              <h6>Inception Planning</h6>
                              {/* <p>Taking the time to manage your money better can really pay off. It can help you stay on top of your bills and save £1,000s. </p> */}
                            </div>
                          </div>
                        </div>
                      </div>
                      {/*.row end */}
                      <div className='row row-interval'>
                        <div className='col-md-6'>
                          <div className='timeline-panel timeline-panel-left'>
                            <div className='event--content'>
                              <h6>Lite Paper, IP Filed</h6>
                              {/* <p>Use our Budget planner to keep on top of your spending, use our tool to work out what you have left after paying your bills.</p> */}
                            </div>
                            {/*.event-content end */}
                            <div className='event--date'>
                              <span className='day'>14</span>
                              <span className='month'>Sept, 2020</span>
                            </div>
                            {/*.event-date end */}
                          </div>
                        </div>
                      </div>
                      {/*.row end */}
                      <div className='row row-interval  flex-row-reverse'>
                        <div className='col-md-6'>
                          <div className='timeline-panel timeline-panel-right'>
                            <div className='event--date'>
                              <span className='day'>19</span>
                              <span className='month'>Oct, 2020</span>
                            </div>
                            <div className='event--content'>
                              <h6>DLN Community Engaged</h6>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/*.row end */}
                      <div className='row row-interval'>
                        <div className='col-md-6'>
                          <div className='timeline-panel timeline-panel-left'>
                            <div className='event--content'>
                              <h6>Membership NFTs</h6>
                            </div>
                            {/*.event-content end */}
                            <div className='event--date'>
                              <span className='day'>25</span>
                              <span className='month'>Nov, 2020</span>
                            </div>
                            {/*.event-date end */}
                          </div>
                        </div>
                      </div>
                      {/*.row end */}
                      <div className='row row-interval  flex-row-reverse'>
                        <div className='col-md-6'>
                          <div className='timeline-panel timeline-panel-right'>
                            <div className='event--date'>
                              <span className='day'>19</span>
                              <span className='month'>Dec, 2020</span>
                            </div>
                            <div className='event--content'>
                              <h6>Initial Smart Contracts</h6>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/*.row end */}
                      <div className='row row-interval'>
                        <div className='col-md-6'>
                          <div className='timeline-panel timeline-panel-left'>
                            <div className='event--content'>
                              <h6>
                                Social Staking Smart Contracts on Ethereum
                              </h6>
                            </div>
                            {/*.event-content end */}
                            <div className='event--date'>
                              <span className='day'>25</span>
                              <span className='month'>Jan, 2021</span>
                            </div>
                            {/*.event-date end */}
                          </div>
                        </div>
                      </div>
                      {/*.row end */}
                    </div>
                    {/*.timeline-content end */}
                  </div>
                  {/*.col-lg-10 end */}
                </div>
                {/*.row end */}
              </div>
              {/*.container end */}
            </section>
          </section>
        </div>
        <section className='dln-foundation' id='foundation'>
          <Row>
            <Col className='text-center py-2'>
              <div>THE DLN FOUNDATION</div>
            </Col>
          </Row>
        </section>
        <section className='dln-community'>
          <Row className='justify-content-center py-5'>
            <Col
              lg={7}
              md={9}
              sm={12}
              className='justify-content-center text-left px-2'
            >
              <p className='dln-text px-md-2 px-3'>
                DLN is a not-for-profit Decentralized Autonomous Organization,
                or DAO. A DAO is very similar to an open source project
                (Wikipedia is an example of an open source project) on the
                Internet. But because it ‘lives’ on a blockchain, it’s called a
                DAO.
              </p>
            </Col>
          </Row>
          <Row className='justify-content-center px-3'>
            <Col md={12} sm={12} className='text-left px-2'>
              <h1 className='dln-text text-center'>
                FOR THE COMMUNITY, BY THE COMMUNITY{' '}
              </h1>
            </Col>
          </Row>
          <Row className='justify-content-center pb-2 dln-community-img-container'>
            <Col md={12} sm={12}>
              <img
                src={DLN_Community}
                alt='community'
                className='img img-fluid dln-community-img'
              />
            </Col>
          </Row>
          <Row className='justify-content-center'>
            <Col md={12} sm={12} className='justify-content-center d-flex'>
              <div className='dln-dogood-text'>
                <Row className='justify-content-center'>
                  <Col md='auto' sm={12}>
                    <h2>DO GOOD.</h2>
                  </Col>
                  <Col md='auto' sm={12}>
                    <h2>GET ACTIVE.</h2>
                  </Col>
                  <Col md='auto' sm={12}>
                    <h2>JOIN DLN.</h2>
                  </Col>
                </Row>
              </div>
            </Col>
          </Row>
          <Row className='justify-content-center mt-2'>
            <Col
              lg={5}
              md={9}
              sm={12}
              className='justify-content-center text-left'
            >
              <p className='dln-text px-md-2 px-3'>
                DLN is not owned by anyone. As with any decentralized innovation
                on the blockchain, it exists as an autonomous technology,
                commandeered, overseen and continuously improved by an
                ever-growing community of concerned people, technologists, and
                blockchain enthusiasts around the globe.{' '}
              </p>
            </Col>
          </Row>
        </section>
        <section className='dln-social-stacking-section' id='news'>
          <Row className='justify-content-center'>
            <Col
              md={8}
              sm={12}
              className='align-self-center pb-3 justify-content-center dln-new-event d-flex '
            >
              <img
                className='dln-new-event-img img img-fluid'
                src={Factory}
                alt='Factory'
              />
              <div className='dln-new-event-text text-left align-content-center d-flex flex-column align-self-center'>
                <p>NEWS</p>
                <p>ANNOUNCEMENTS</p> <p>EVENTS</p>{' '}
              </div>
            </Col>
          </Row>
        </section>
        <section className='dln-carousel-section'>
          <div className='container'>
            <h2 className='dln-featured-text'>Featured</h2>
          </div>
          <Row>
            <Col>
              <div className='container dln-carousel-box'>
                <Card></Card>
              </div>
            </Col>
          </Row>
        </section>
        <section className=' dln-carousel-section '>
          <div className='dln-carousel-box container'>
            <Row>
              <Col>
                <div className='dln-padding-vertical'>
                  <h4 className='dln-title'>Impact is our Passion</h4>
                  <p className='dln-box-text text-center'>
                    DLN DAO’s contributors are among the most prominent names in
                    blockchain projects today.{' '}
                  </p>
                </div>
                <div className='dln-logosSectionContainer'>
                  <img alt='logo' src={Drapper} className='dln-partner-logos' />
                  <img
                    alt='logo'
                    src={alphaFin2}
                    className='dln-partner-logos'
                  />
                  <img
                    alt='logo'
                    src={CoinSqad}
                    className='dln-partner-logos'
                  />
                  <img alt='logo' src={Giftz} className='dln-partner-logos' />
                  <img alt='logo' src={Casper} className='dln-partner-logos' />
                  <img alt='logo' src={PD} className='dln-partner-logos' />
                  <img alt='logo' src={BS} className='dln-partner-logos' />
                  <img alt='logo' src={Rivet} className='dln-partner-logos' />
                  <img alt='logo' src={Totle} className='dln-partner-logos' />
                  <img
                    alt='logo'
                    src={wishKnish}
                    className='dln-partner-logos'
                  />
                  <img alt='logo' src={WDBT} className='dln-partner-logos' />
                </div>
              </Col>
            </Row>
          </div>
        </section>
        <section className='space--top'>
          <div className='dln-footer-holder'>
            <div className='dln-header-line'></div>
            <Header handleClick={handleClick} />
          </div>
          <div className='container'>
            <div className='row'>
              <div className='col-12 mx-auto'>
                <div className='icon-fill--wide text-center d-lg-flex justify-content-lg-center flex-wrap reveal'>
                  <h4 className='dln-title text-center dln-followUs-p'>
                    Follow us
                  </h4>
                  <a
                    className='t-icon box-shadow--5 rounded--05 m-1 btn-hover--primary'
                    href='https://t.me/DLNDAO'
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    <div className='dln-footer-display'>
                      <div className='dln-icon-holder'>
                        <span className='t-icon__brand-icon h4-font color--primary dln-icon-span'>
                          <FontAwesomeIcon icon={faTelegramPlane} />
                        </span>
                      </div>
                    </div>
                  </a>

                  <a
                    className='t-icon box-shadow--5 rounded--05 m-1 btn-hover--primary'
                    href='https://www.facebook.com/DLN-DAO-107891987768628'
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    <div className='dln-footer-display'>
                      <div className='dln-icon-holder'>
                        <span className='t-icon__brand-icon h4-font color--primary dln-icon-span'>
                          <FontAwesomeIcon icon={faFacebookF} />
                        </span>
                      </div>
                    </div>
                  </a>
                  <a
                    className='t-icon box-shadow--5 rounded--05 m-1 btn-hover--primary'
                    href='https://dlndao.medium.com/'
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    <div className='dln-footer-display'>
                      <div className='dln-icon-holder'>
                        <span className='t-icon__brand-icon h4-font color--primary dln-icon-span'>
                          <FontAwesomeIcon icon={faMedium} />
                        </span>
                      </div>
                    </div>
                  </a>
                  <a
                    className='t-icon box-shadow--5 rounded--05 m-1 btn-hover--primary'
                    href='https://www.linkedin.com/company/dln-dao'
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    <div className='dln-footer-display'>
                      <div className='dln-icon-holder'>
                        <span className='t-icon__brand-icon h4-font color--primary dln-icon-span'>
                          <FontAwesomeIcon icon={faLinkedinIn} />
                        </span>
                      </div>
                    </div>
                  </a>
                  <a
                    className='t-icon box-shadow--5 rounded--05 m-1 btn-hover--primary'
                    href='https://twitter.com/dlndao'
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    <div className='dln-footer-display'>
                      <div className='dln-icon-holder'>
                        <span className='t-icon__brand-icon h4-font color--primary dln-icon-span'>
                          <FontAwesomeIcon icon={faTwitter} />
                        </span>
                      </div>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className='container py-3'>
            <div className='row'>
              <div className='col-12 mx-auto'>
                <p className='dln-color-accent dln-privacy-text'>
                  &copy;2021 DLN.org |{' '}
                  <a href='#!' onClick={() => displayText()}>
                    Privacy Policy
                  </a>
                </p>
              </div>
            </div>
          </div>
          {display && (
            <PrivacyPolicyModal
              display={display}
              changeState={() => handler()}
            />
          )}
          {displayJoinBox && (
            <JoinBoxModal
              display={displayJoinBox}
              changeState={() => handlerCloseBox()}
            />
          )}
        </section>
      </Container>
    </>
  );
}
