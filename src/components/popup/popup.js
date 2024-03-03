import './popup.css';
import PropTypes from 'prop-types';

export default function Popup({ text }) {
  return (
    <div className='popup-wrapper'>
      <p className='popup__main'>
        {text}
      </p>
    </div>
  );
}

Popup.propTypes = {
  text: PropTypes.string.isRequired,
};