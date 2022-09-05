import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import './MedicalInstitution.scss'

import nhiKhoa from "../../../assets/images/175620-nhi-khoa.jpg";


const SampleNextArrow = (props) => {
    const { className, style, onClick } = props;
    return (
        <div
            className={className}
            style={{
                ...style
                // , backgroundColor: '#959595'
                , display: 'flex'
                , alighItems: 'center'
                , justifyContent: 'center'
            }}
            onClick={onClick}
        />
    );
}

const SamplePrevArrow = (props) => {
    const { className, style, onClick } = props;
    return (
        <div
            className={className}
            style={{
                ...style
                , display: 'flex'
                , alighItems: 'center'
                , justifyContent: 'center'
            }}
            onClick={onClick}
        />
    );
}

class MedicalInstitution extends Component {

    constructor(props) {
        super(props);
        this.state = {

        }
    }

    componentDidMount = async () => {
    }



    render() {

        let settings = {
            dots: true,
            infinite: true,
            speed: 500,
            slidesToShow: 5,
            slidesToScroll: 1,
            nextArrow: <SampleNextArrow />,
            prevArrow: <SamplePrevArrow />
        };
        return (
            <div className='section-institution-container'>
                <div className='section-institution-header'>
                    <span className='header-title'>Cơ Sở Y Tế Nổi Bật</span>
                </div>
                <div className='section-institution-content'>
                    <Slider {...settings}>
                        <div className='institution-img'>
                            <div style={{
                                backgroundImage: `url(${nhiKhoa})`
                                , backgroundRepeat: 'no-repeat'
                                , backgroundSize: 'cover'
                                , backgroundPosition: 'center'
                                , height: '100%'
                                , width: '100%'
                            }}></div>
                            <p>Test</p>
                        </div>
                        <div className='institution-img'>
                            <h3>2</h3>
                        </div>
                        <div className='institution-img'>
                            <h3>3</h3>
                        </div>
                        <div className='institution-img'>
                            <h3>4</h3>
                        </div>
                        <div className='institution-img'>
                            <h3>5</h3>
                        </div>
                        <div className='institution-img'>
                            <h3>6</h3>
                        </div>
                    </Slider>
                </div>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(MedicalInstitution);
