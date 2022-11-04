import React, { useEffect } from "react";
import { createPortal } from "react-dom";
import propTypes from 'prop-types';
import './Modal.css';

const modalRoot = document.querySelector('#modal-root');

const Modal = ({ onClose, children }) => {
        const handleOverlayClick = e => {
  
        if (e.currentTarget === e.target || e.code === "Escape")
        {
            console.log(e.code);
            onClose();
        }
        };
    
    useEffect(() => {
        const onEscClick = e => {
            if (e.code === "Escape") {
                onClose();
            }
        };
        
        window.addEventListener('keydown', onEscClick);

        return () => {
            window.removeEventListener('keydown', onClose);
        };
    }, [onClose]);

    // componentDidMount() {
    //     window.addEventListener('keydown', this.handleKeyDown);
    // }

    // componentWillUnmount() {
    //     window.removeEventListener('keydown', this.handleKeyDown); 
    // }

   


        return createPortal(
            <div className="overlay" onClick={handleOverlayClick}>
                <div className="modal">
                    {children}
                   {/* // <img src="" alt="" /> */}
                </div>
            </div>,
            modalRoot
            
        )
    
};

Modal.propTypes = {
    onClose: propTypes.func,
};

export default Modal;



// export default class Modal extends Component {
//     componentDidMount() {
//         window.addEventListener('keydown', this.handleKeyDown);
//     }

//     componentWillUnmount() {
//         window.removeEventListener('keydown', this.handleKeyDown); 
//     }

//     handleKeyDown = e => {
//         if (e.code === 'Escape') {
           
//             this.props.onClose();
//         }
//     };

//     handleOverlayClick = e => {
  
//         if (e.currentTarget === e.target) {
//             this.props.onClose();
//         }
//     }

//     render() {
//         return (
//             <div className="overlay" onClick={this.handleOverlayClick}>
//                 <div className="modal">
//                     {this.props.children}
//                    {/* // <img src="" alt="" /> */}
//                 </div>
//             </div>
            
//         )
//     }
// };
