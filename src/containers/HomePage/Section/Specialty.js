import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import './Specialty.scss'

class Specialty extends Component {

    constructor(props) {
        super(props);
        this.state = {

        }
    }

    componentDidMount = async () => {
    }


    render() {
        return (
            <div className="text-center" style={{ border: '1px solid red', margin: '20px 0', padding: '20px 0' }}>
                <h1>Hello Specialty Component</h1>
            </div>
        )
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

export default connect(mapStateToProps, mapDispatchToProps)(Specialty);
