import { ImageGalleryItem } from "components/ImageGalleryItem/ImageGalleryItem";
import './ImageGallery.css';
// import { ImageGalleryItem } from '../ImageGalleryItem/ImageGalleryItem'
import propTypes from 'prop-types';


 export const ImageGallery = ({images, onClick}) => {
    return (
        <ul className='imageGallery'>
            <ImageGalleryItem images={images} onClick={onClick}/> 
        </ul>
    ) 
};

// export default ImageGallery;

ImageGallery.propTypes = {
    images: propTypes.array,
    onClick: propTypes.func,
}