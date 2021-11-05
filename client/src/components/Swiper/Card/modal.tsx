import React from 'react';
import Modal from 'react-modal';
import FirstArticle from '../StaticArticls/firstArticl';
import SecondArticle from '../StaticArticls/secondArticle';
import ThirdArticle from '../StaticArticls/thirdArticle';
import FourthArticle from '../StaticArticls/fourthArticle';
Modal.setAppElement('#root')

// modal to view the swiper card content  
const CustomModal = ({ display, changeState, title, id }: any) => {
    return (
        <Modal isOpen={display}
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

                }
            }}>
            <br></br>
            <h1 className='dln-title-box-Text dln-news-modal-title'>{title}</h1>
            <br></br>
            {id === 1 ? (
                <FirstArticle />
            ) : id === 2 ? (
                <SecondArticle />
            ) : id === 3 ?(<ThirdArticle />):(<FourthArticle />)}
            <br></br>
            <div className="btn dln-dismiss-btn ">
                <button className='btn dln-dismiss-font-color'  onClick={() => changeState()}>Dismiss</button>
            </div>
        </Modal>
    );
};

export default CustomModal;
