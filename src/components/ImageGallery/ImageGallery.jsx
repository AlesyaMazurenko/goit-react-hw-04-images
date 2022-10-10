import { ImageGalleryItem } from "components/ImageGalleryItem/ImageGalleryItem";
import propTypes from 'prop-types';


const ImageGallery = ({imageName, onClick}) => {
    return (
        <ul class="gallery">
            <ImageGalleryItem imageName={imageName} onClick={onClick}/> 
        </ul>
    ); //
};

export default ImageGallery;

ImageGallery.propTypes = {
    imageName: propTypes.array,
    // onClick: propTypes.func,
}