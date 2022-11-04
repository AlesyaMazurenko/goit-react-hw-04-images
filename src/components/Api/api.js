import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/?';
const KEY = '29288692-4de5473bca5fca6278995f222';
const PAGE_LIMIT = '12';


export const getImages = async (imagesName, page) => {
    try {
        const response = await axios.get(BASE_URL, {
            params: {
                key: KEY,
                q: imagesName,
                image_type: 'photo',
                orientation: 'horizontal',
                per_page: PAGE_LIMIT,
                page: page,
            },
        });
        return response.data;
    } catch (error) {
        console.log(error);
    }
    
};
