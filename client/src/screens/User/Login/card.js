import React from 'react';
import { 
  Right_Arrow, 
  Left_Arrow, 
  SmallLogo, 
  VideoThumbnail1, 
  VideoThumbnail2,
  DCBSLogo, 
  AfgahnOrg,
  HelpSl,
  Questscope 
} from 'Assets/img';
import CustomModal from './../../../components/modal/modal';
import Slider from "react-slick";

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <img src={Right_Arrow}
      className={className}
      onClick={onClick}
    />

  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <img src={Left_Arrow}
      className={className}
      onClick={onClick}
    />
  );
}
class Card extends React.Component {
  constructor(props) {
    super(props)

    this.handler = this.handler.bind(this)
  }
  state = {
    firstDoc: {
      title: 'Hands Empowering the Less Privileged in Sierra Leone (HELP-Salone) Partners with AlphaFin, Inc.',
      body: 'NASHVILLE, TENNESSEE (April 8, 2021) – The Decentralized Lending Network (DLN.org) has a new partner, AlphaFin, Inc.'
    },
    secondDoc: {
      title: 'Development Organization DCBS Signs Letter of Intent with AlphaFin, Inc. NASHVILLE, TENNESSEE - (March 24, 2021)  ',
      body: 'FinTech company AlphaFin, Inc., today announced receipt of a Letter of Intent from Dhosa Chandaneswar '
    },
    thirdDoc: {
      title: 'DLN and Afghanistan Women Council Development Organization Head Toward Partnership NASHVILLE, TENNESSEE - (April 1, 2021)  ',
      body: 'AlphaFin, Inc, the company developing DLN.org, the Decentralized Lending Network.'
    },
    fourthDoc: {
      title: 'Questscope Signs Decentralized Lending Network Letter of Intent NASHVILLE, TENNESSEE - (May 18, 2021) ',
      body: 'AlphaFin, Inc, the company developing DLN.org, the Decentralized Lending Network.'
    },
    display: false,
    title: '',
    id: ''
  };

  displayText = (title, id) => {
    this.state.display = true
    this.setState({
      title, id
    })
  };

  handler() {
    this.setState({
      display: false,

    })
  }

  render() {
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 2,
      slidesToScroll: 1,
      nextArrow: <SampleNextArrow />,
      prevArrow: <SamplePrevArrow />,

      customPaging: i => (
        <div className='dln-slick-custom-dots' />
      ),
      responsive: [
        {
          breakpoint: 1440,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
            infinite: true,
            dots: true
          }
        },
        {
          breakpoint: 1439,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            infinite: true,
            dots: true
          }
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
          }
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1
          }
        }
      ]
    };
    return (
      <div>
        <Slider {...settings}>
          <div className='dln-slide-card' onClick={() => this.displayText(this.state.firstDoc.title, 1)}>
          <img src={HelpSl} className="dln-margin-bottom"/>
            <p className='dln-title-box-Text'>{this.state.firstDoc.title}</p>
          </div>
          <div className='dln-slide-card' onClick={() => this.displayText(this.state.secondDoc.title, 2)}>          
            <img src={DCBSLogo} className="dln-margin-bottom"/>
            <p className='dln-title-box-Text text-center'>{this.state.secondDoc.title}</p>
          </div>
          <div className='dln-slide-card' onClick={() => this.displayText(this.state.thirdDoc.title, 3)}>
          <img src={AfgahnOrg} className="dln-margin-bottom"/>
            <p className='dln-title-box-Text text-center'>{this.state.thirdDoc.title}</p>
          </div>
          <div className='dln-slide-card' onClick={() => this.displayText(this.state.fourthDoc.title, 4)}>
          <img src={Questscope} className="dln-margin-bottom"/>
            <p className='dln-title-box-Text'>{this.state.fourthDoc.title}</p>
          </div>
          <div className='dln-slide-card'>
            <img src={SmallLogo} className="dln-margin-bottom dln-margin-top"/>
            <p className='dln-title-box-Text text-center'>CHECK BACK OFTEN FOR MORE NEWS & ANNOUNCEMENTS!</p>
          </div>
          <div className='dln-slide-card'>
            <a
              target='_blank'
              rel='noopener noreferrer'
              className='btn btn-bg--primary lightbox reveal dln-video-link'
              data-autoplay='true'
              data-vbtype='video'
              href='https://www.youtube.com/watch?v=fG7EuO_lXRc'
            >
              <img
                src={VideoThumbnail1}
                alt='DLN-Youtube-Video'
                className="dln-margin-bottom"
              />
              <p className='dln-title-box-Text text-center'>Jan 29, 2021 - Dr. Adel Elmessiry interviewed on DGH's What the Block?! by Alon Goren</p>
            </a>
          </div>
          <div className='dln-slide-card'>
            <a
              target='_blank'
              rel='noopener noreferrer'
              className='btn btn-bg--primary lightbox reveal dln-video-link'
              data-autoplay='true'
              data-vbtype='video'
              href='https://www.youtube.com/watch?v=jHg_Lm4B1I8'
            >
              <img
                src={VideoThumbnail2}
                alt='DLN-Youtube-Video'
                className="dln-margin-bottom"
              />
              <p className='dln-title-box-Text text-center'>March 10, 2021 - Episode #1 of The Den @ DLN, with Todd Glider and Dr. Adel Elmessiry</p>
            </a>
          </div>
        </Slider>
        <CustomModal
          display={this.state.display}
          changeState={this.handler}
          title={this.state.title}
          id={this.state.id}
        />
      </div>
    );
  }
}
export default Card;
