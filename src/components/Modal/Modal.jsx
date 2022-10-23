import React, { Component } from "react";
import propTypes from 'prop-types';
import './Modal.css';


export default class Modal extends Component {
    componentDidMount() {
        // console.log('componentDidMount');

        window.addEventListener('keydown', this.handleKeyDown);
    }

    componentWillUnmount() {
        // console.log('componentWillUnmount');
        window.removeEventListener('keydown', this.handleKeyDown); 
    }

    handleKeyDown = e => {
        if (e.code === 'Escape') {
            // console.log('presssed ESC');
            this.props.onClose();
        }
    };

    handleOverlayClick = e => {
        // console.log('click baskdop')
        // console.log('e.currentTarget', e.currentTarget);
        // console.log('e.target', e.target);
        //e.currentTarget === e.target = проверяем что клик произощел только на сером фоне, а не на других єлементах overlay 
        if (e.currentTarget === e.target) {
            this.props.onClose();
        }
    }

    render() {
        return (
            <div className="overlay" onClick={this.handleOverlayClick}>
                <div className="modal">
                    {this.props.children}
                   {/* // <img src="" alt="" /> */}
                </div>
            </div>
            
        )
    }
};

Modal.propTypes = {
    onClose: propTypes.func,
};
