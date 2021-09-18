import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { API } from 'aws-amplify';
import { toast } from 'react-toastify';
import { Spinner, Modal } from 'react-bootstrap';
import {
  FacebookShareButton,
  TwitterShareButton,
  TelegramShareButton,
  LinkedinShareButton,
} from 'react-share';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faFacebookF,
  faLinkedinIn,
  faTelegramPlane,
  faTwitter,
} from '@fortawesome/free-brands-svg-icons';

import { transfer, checkNftOwner } from 'scripts/transfer';

import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Input } from 'components/Input';
import { getAccessToken } from 'utils/helpers';
import { useUserState } from 'contexts/UserAuthContext';

import { logoDark } from 'Assets/img';

const title = 'I’m joining DLN DAO, You join too.';
const shareUrl = 'https://dln.org';

function UserProfile() {
  const getInitialState = () => ({
    loading: false,
    isAdmin: user.isAdmin,
    inputs: {
      email: user.email || '',
      phone: user.phone || '',
      facebook: user.facebook || '',
      twitter: user.twitter || '',
      instagram: user.instagram || '',
      telegram: user.telegram || '',
      myReferralCode: user.myReferralCode || '',
      referredByCode: user.referredByCode || '',
      referredByCount: 0,
      firstName: user.firstName || '',
      lastName: user.lastName || '',
    },
    copied: false,
  });

  const { user }: any = useUserState();
  const history = useHistory();
  const [state, setState] = useState(getInitialState());
  const [showModal, setShowModal] = useState(false);

  let NFTLink = '';
  useEffect(() => {
    const accessToken = getAccessToken();
    (async function FetchApi() {
      const referredByCount: any = await API.get(
        'auth',
        '/api/users/getReferralCount',
        {
          headers: { Authorization: `Bearer ${accessToken}` },
          queryStringParameters: { myReferralCode: user.myReferralCode },
        }
      );

      setState({
        ...state,
        inputs: { ...state.inputs, referredByCount },
      });

      if (user.isAdmin) {
        const isOwnNFT = await checkNftOwner(user.publicAddress);

        if (!isOwnNFT?.length) {
          const transferNFT = await transfer(user.publicAddress);

          if (transferNFT.receipt.status) {
            const link =
              'https://rinkeby.etherscan.io/tx/' +
              transferNFT.receipt.transactionHash;
            NFTLink = link;
            setShowModal(true);
          }
        }
      }
    })();
  }, []);

  const doSubmit = async (e: any) => {
    e.preventDefault();
    setState({ ...state, loading: true });

    const accessToken = getAccessToken();
    const {
      inputs: {
        email,
        firstName,
        lastName,
        phone,
        facebook,
        twitter,
        instagram,
        telegram,
      },
    } = state;

    await API.patch('auth', `/api/users/${user.id}`, {
      headers: { Authorization: `Bearer ${accessToken}` },
      body: {
        email,
        firstName,
        lastName,
        phone,
        facebook,
        twitter,
        instagram,
        telegram,
      },
    })
      .then(async (response) => {
        toast.success('Your data has been updated successfully');
        setState({ ...state, loading: false });

        return response;
      })
      .catch((err) => {
        toast.error(err);
        setState({ ...state, loading: false });

        return;
      });
  };

  const handleChange = (e: any) => {
    const { value, name } = e.target;
    const { inputs }: any = state;

    inputs[name] = value;

    setState({
      ...state,
      inputs,
    });
  };

  const linkCopied = () => {
    setState({ ...state, copied: true });
    toast.success('Your referral link copied successfully!');
  };

  return (
    <>
      <div className='position-relative'>
        {state.loading && (
          <div className='dln-page-spinner-container'>
            <div className='dln-spinner-body '>
              <Spinner
                className='mr-1 dln-page-spinner'
                as='span'
                animation='border'
                role='status'
                aria-hidden='true'
              />
            </div>
          </div>
        )}
        <div className='container-fluid dln-contact-form pt-2 pb-4'>
          <div className='row justify-content-center'>
            <div className='col-lg-10 col-md-11 col-sm-12'>
              <img
                src={logoDark}
                alt=''
                className='img img-fluid dln-form-logo'
              ></img>
            </div>
          </div>
          <div className='row justify-content-center'>
            <div className='mt-4 mb-3 dln-form-title col-lg-10 col-md-11 col-sm-12'>
              YOUR PROFILE INFORMATION
              <hr className='dln-title-hr' />
            </div>
          </div>
          <div className='row justify-content-center mx-lg-5 px-lg-5 mb-5'>
            <div className='col-lg-10 col-md-11 col-sm-12'>
              <div className='row dln-ref-data'>
                {state.inputs.myReferralCode && (
                  <div className='form-group col-md-6 col-sm-12 text-left'>
                    <span>
                      <span className='dln-txt-primary-color mr-1 font-w--600'>
                        My Referral link:
                      </span>
                      https://www.dln.org/#/?ref=
                      {state.inputs.myReferralCode}
                    </span>

                    <CopyToClipboard
                      text={
                        'https://www.dln.org/#/?ref=' +
                        state.inputs.myReferralCode
                      }
                      onCopy={() => linkCopied()}
                    >
                      <span className='dln-copy-link ml-1'>Copy</span>
                    </CopyToClipboard>
                  </div>
                )}
                {state.inputs.referredByCode && (
                  <div className='form-group col-md-6 col-sm-12'>
                    <span className='dln-txt-primary-color mr-1 font-w--600'>
                      Members referred by you:
                    </span>
                    {state.inputs.referredByCode}
                  </div>
                )}
              </div>
              <form name='contact-form' onSubmit={doSubmit} className=''>
                <div className='row'>
                  <div className='form-group col-md-6 col-sm-12'>
                    <Input
                      name='firstName'
                      value={state.inputs.firstName}
                      placeholder='First Name'
                      doChange={handleChange}
                      type='text'
                      className='form-control col'
                    />
                  </div>
                  <div className='form-group col-md-6 col-sm-12'>
                    <Input
                      name='lastName'
                      value={state.inputs.lastName}
                      placeholder='Last Name'
                      className='form-control'
                      doChange={handleChange}
                    />
                  </div>
                </div>

                <div className='row'>
                  <div className='form-group col-md-6 col-sm-12'>
                    <Input
                      name='email'
                      value={state.inputs.email}
                      placeholder='Email'
                      doChange={handleChange}
                      type='email'
                      className='form-control col'
                    />
                  </div>

                  <div className='form-group col-md-6 col-sm-12'>
                    <Input
                      name='phone'
                      value={state.inputs.phone}
                      placeholder='Phone number'
                      className='form-control'
                      doChange={handleChange}
                    />
                  </div>
                </div>
                <div className='row'>
                  <div className='form-group  col-md-6 col-sm-12'>
                    <Input
                      name='facebook'
                      value={state.inputs.facebook}
                      placeholder='Facebook'
                      className='form-control'
                      doChange={handleChange}
                    />
                  </div>

                  <div className='form-group  col-md-6 col-sm-12'>
                    <Input
                      name='twitter'
                      value={state.inputs.twitter}
                      placeholder='Twitter'
                      className='form-control'
                      doChange={handleChange}
                    />
                  </div>
                </div>
                <div className='row'>
                  <div className='form-group  col-md-6 col-sm-12'>
                    <Input
                      name='instagram'
                      value={state.inputs.instagram}
                      placeholder='Instagram'
                      doChange={handleChange}
                      className='form-control'
                    />
                  </div>

                  <div className='form-group  col-md-6 col-sm-12'>
                    <Input
                      name='telegram'
                      value={state.inputs.telegram}
                      placeholder='Telegram'
                      doChange={handleChange}
                      className='form-control'
                    />
                  </div>
                </div>
                <div className='row mt-2'>
                  <div className='col justify-content-lg-end d-flex justify-content-center'>
                    <button className='btn ml-3 dln-primary-btn'>Update</button>
                  </div>
                </div>
                <div className='row mt-2'>
                  <div className='col'>
                    <button
                      className='btn dln-secondary-btn'
                      onClick={(event) => {
                        event.preventDefault();
                        window.open(
                          'https://docs.google.com/document/d/1NGbIaHrC32SW7KUcDyzrbxoOq2Bv0MgBCvs9UaEDYOc/edit#heading=h.3j7g00oc28q2',
                          '_blank'
                        );
                      }}
                    >
                      Contribute to the DLN Lite Paper
                    </button>
                  </div>
                </div>

                {state.isAdmin && (
                  <>
                    <div className='row mt-2'>
                      <div className='col'>
                        <button
                          className='btn ml-3 dln-secondary-btn'
                          onClick={() => history.push('/tokenOwners')}
                        >
                          Get Token Owners
                        </button>
                      </div>
                    </div>
                    <div className='row mt-2'>
                      <div className='col'>
                        <button
                          className='btn ml-3 dln-secondary-btn'
                          onClick={() => history.push('/users')}
                        >
                          Report
                        </button>
                      </div>
                    </div>
                    {/* <div className='row mt-2'>
                      <div className='col'>
                        <button
                          className='btn ml-3 dln-secondary-btn'
                          onClick={() => history.push('/withdraw')}
                        >
                          Withdraw
                        </button>
                      </div>
                    </div> */}
                  </>
                )}
              </form>
            </div>
          </div>
        </div>
        <div className='row mt-3 dln-social-media-share text-dark dln-bottom0'>
          <div className='col'>
            <ul className='list-inline'>
              <li className='list-inline-item'>
                <FacebookShareButton url={shareUrl} quote={title}>
                  <FontAwesomeIcon
                    icon={faFacebookF}
                    className='mt-1'
                    size='lg'
                  />
                </FacebookShareButton>
              </li>
              <li className='list-inline-item'>
                <TwitterShareButton url={shareUrl} title={title}>
                  <FontAwesomeIcon
                    icon={faTwitter}
                    className='mt-1'
                    size='lg'
                  />
                </TwitterShareButton>
              </li>
              <li className='list-inline-item'>
                <TelegramShareButton url={shareUrl} title={title}>
                  <FontAwesomeIcon
                    icon={faTelegramPlane}
                    className='mt-1'
                    size='lg'
                  />
                </TelegramShareButton>
              </li>
              <li className='list-inline-item'>
                <LinkedinShareButton url={shareUrl}>
                  <FontAwesomeIcon
                    icon={faLinkedinIn}
                    className='mt-1'
                    size='lg'
                  />
                </LinkedinShareButton>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <Modal
        show={showModal}
        onHide={() => setShowModal(false)}
        className='dln-centered-vertically-modal'
      >
        <Modal.Header closeButton>
          <Modal.Title className='dln-txt-primary-color'>
            Congratulations
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h5 className='dln-txt-primary-color'>
            You have unlocked DLN Admin membership NFT!
          </h5>
          <p>
            The NFT has been sent to your wallet , please check the transaction
            <a
              href={NFTLink}
              className='ml-1'
              target='_blank'
              rel='noopener noreferrer'
            >
              here
            </a>
          </p>
          <div className='d-flex justify-content-end mt-4'>
            <button
              className='btn  ml-2 mb-1 dln-txt-primary-color font-weight-bold'
              onClick={() => setShowModal(false)}
            >
              Ok
            </button>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

export { UserProfile };
