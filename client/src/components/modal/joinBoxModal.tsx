import React from 'react';
import Modal from 'react-modal';
import { SmallLogo } from 'Assets/img';
Modal.setAppElement('#root');

const JoinBoxModal = ({ display, changeState }: any) => {
  return (
    <Modal
      isOpen={display}
      onRequestClose={() => changeState()}
      style={{
        overlay: {
          backgroundColor: 'rgba(255, 255, 255, 0.75)',
        },
        content: {
          position: 'absolute',
          left: '20%',
          right: '20%',
          border: '2px solid #71B670',
          background: '#fff',
          overflow: 'auto',
          WebkitOverflowScrolling: 'touch',
          borderRadius: '4px',
          outline: 'none',
          padding: '20px',
        },
      }}
    >
      <div className='dln-join-box text-center mt-5 px-4'>
        <img src={SmallLogo} alt='logo' className='mb-4 px-5 mx-5' />
        <h5 className='mb-4 px-5 mx-5 font-weight-bold'>
          Welcome to the Decentralized Lending Network!
        </h5>
        <p className='mb-4 px-5 mx-5 mt-5'>
          Joining DLN today makes you a member of the DLN community, placing you
          at the vanguard of impact investment on the blockchain!
        </p>
        <h5 className='mb-4 px-5 mx-5  font-weight-bold'>
          If you are a blockchain developer, enthusiast or investor, to get
          started, install the MetaMask browser plug-in.
        </h5>
        <h5 className='dln-color-accent mb-5  font-weight-bold'>
          If you are from an NGO or Microfinance Institution, please{' '}
          <a
            className='dln-text-underline cursor-pointer dln-color-accent'
            href='mailto:Contact@DLN.org'
          >
            contact us today!
          </a>
        </h5>
        <div className='btn dln-dismiss-btn mt-5'>
          <button
            className='btn dln-dismiss-font-color'
            onClick={() => changeState()}
          >
            Dismiss
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default JoinBoxModal;
