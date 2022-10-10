import propTypes from 'prop-types';
import './ImageGalleryItem.css';

export const ImageGalleryItem = ({ images }) => {
    const elements = images.map(({ id, webformatURL, largeImageURL }) => {
        return <li key={id} className='gallery-item'> 
            <img src={webformatURL} alt="" />
        </li>     
    }) //onClick={() => onClick(({largeImageURL}))} 

    return elements;
}

ImageGalleryItem.propTypes = {
    images: propTypes.array,
   // onClick: propTypes.func,
}