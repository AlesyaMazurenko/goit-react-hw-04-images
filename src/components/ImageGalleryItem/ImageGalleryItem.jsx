import propTypes from 'prop-types';
import './ImageGalleryItem.css';

export const ImageGalleryItem = ({ images, onClick }) => {
    const elements = images.map(({ id, webformatURL, largeImageURL }) => {
        return <li key={id} className='imageGalleryItem' onClick={() => onClick(({ id, largeImageURL }))} >
            <img src={webformatURL} alt="" className='imageGalleryItem-image' />
        </li>
    }) 
    return elements;
};

//export default ImageGalleryItem;

ImageGalleryItem.propTypes = {
    images: propTypes.array,
   onClick: propTypes.func,
}