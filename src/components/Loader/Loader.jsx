
import { ColorRing } from 'react-loader-spinner';

export default function Loader() {
    return (
        <ColorRing
            visible={true}
            height="80"
            width="80"
            display="block"
            justify-content="center"
            padding-right="auto"
            ariaLabel="blocks-loading"
            wrapperStyle={{}}
            wrapperClass="blocks-wrapper"
            colors={['#b8c480', '#B2A3B5', '#F4442E', '#51E5FF', '#429EA6']}
        />
    )
}