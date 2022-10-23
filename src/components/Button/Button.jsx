import propTypes from 'prop-types';
import './Button.css';

 const Button = ({ onClick }) => {
    return (
        <div className='button-wrapper'>
        <button onClick={onClick} className='button'>load more </button>
        </div>
    )
}

export default Button;

Button.propTypes = {
    onClick: propTypes.func,
}