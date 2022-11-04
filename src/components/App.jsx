import { useState, useEffect } from "react";
  import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';

import SearchBar from './Searchbar/Searchbar';
import Loader from './Loader/Loader';
import { ImageGallery } from './ImageGallery/ImageGallery'
import { getImages } from "./Api/api";
import Modal from './Modal/Modal';
import Button from './Button/Button';

import './App.css'

export default function App() {
  const [images, setImages] = useState([]);
  const [imagesName, setImagesName] = useState('');
  const [page, setPage] = useState(1);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalLink, setModalLink] = useState('');

  


  // componentDidMount() {
  //   const { imagesName, page } = this.state;

  //  // if (prevState.imageName !== imageName) {  //|| page !== prevState.page)
  //     this.fetchImages(imagesName, page)
  //   //}
  // }

  // componentDidUpdate(prevProps, prevState) {
  //   // console.log('prevProps', prevProps);
  //   // console.log('prevState', prevState);
  //   const { page, imagesName} = this.state;
  //   if (prevState.imagesName !== imagesName ||
  //     prevState.page !== page) {
  //     this.fetchImages(imagesName, page);
  //   }
  // } 

  useEffect(() => {
    async function fetchImages() {
      if (!imagesName) {
        return;
      }
      
      setLoading(true);
    
      try {
        const response = await getImages(imagesName, page);
        console.log('response', response);
        setError(false);
       
        if (response.hits.length === 0) {
          toast.error('Немає зображення по запиту');
          setImages([]);
          setLoading(false);
          setError(true);
          return;
        }
        
        setImages((prev) => {
          return [...prev, ...response.hits];
        })
        
      } catch (error) {
        setError(true);
        setImages([]);
      } finally {
        setLoading(false);
      }
    }
    fetchImages();
  }, [imagesName, page]);

   

/*Получаем значения из компонента Searcbar и очищаем предыдущий поиск*/
 const handleSubmitForm = (imagesName) => {
    // console.log(imagesName);
   setImagesName(imagesName);
   setImages([]);
   setPage(1);
  };
      
  const loadMore = () => {
    setPage(prev => prev + 1);
  };
    
  const openModal = (modalLink) => {
    setModalIsOpen(true);
    setModalLink(modalLink.largeImageURL);
  }

  const toggleModal = () => {
    setModalIsOpen(!modalIsOpen);
  }
  
  
  // render() {
  //   const { images, error, loading, imagesName, modalIsOpen, modalLink } = this.state;
    const isImages = Boolean(images.length); 
    const isLoadMore = (images.length % 12 === 0) ? true : false ;
    return (
      <div
        style={{
          height: '100vh',
          fontSize: 24,
          color: '#010101'
        }}
      >
        {/* {images && <div>tyt bydet images after fetch <ImageGallery images={images} onClick={openModal} /></div>} */}
        <SearchBar onSubmit={handleSubmitForm} />  
        <div className="wrapper">
          {error && <p>Немає зображення по запиту {imagesName}</p>}
          {loading && <Loader />}
          
        </div>
        {isImages && <ImageGallery images={images} onClick={openModal} />}
        {isImages && isLoadMore && <Button onClick={loadMore} /> }
        {modalIsOpen && (
          <Modal onClose={toggleModal}>
          
            {/* <button type="button" onClick={this.toggleModal}></button> */}
              <img src={modalLink} alt=""></img>
          </Modal >)}
        <ToastContainer autoClose={4000} />
      </div>
    )
  
};

// export default class App extends Component {
//   state = {
//     images: [],
//     imagesName: '',
//     page: 1,
//     error: null,
//     loading: false,
//     modalIsOpen: false,
//     modalLink: '',
//   }

//   // componentDidMount() {
//   //   const { imagesName, page } = this.state;

//   //  // if (prevState.imageName !== imageName) {  //|| page !== prevState.page)
//   //     this.fetchImages(imagesName, page)
//   //   //}
//   // }

//   componentDidUpdate(prevProps, prevState) {
//     // console.log('prevProps', prevProps);
//     // console.log('prevState', prevState);
//     const { page, imagesName} = this.state;
//     if (prevState.imagesName !== imagesName ||
//       prevState.page !== page) {
//       this.fetchImages(imagesName, page);
//     }
//   } 

//   fetchImages = async (imagesName, page) => {
//     if (!imagesName) {
//       return;
//     }
//     try {
//       this.setState({
//         loading: true,
//         error: false,
//       });
      
//       const response = await getImages(imagesName, page);
//       console.log('response', response);

//       if (response.hits.length === 0) {
//         toast.error('Немає зображення по запиту');
       
//         this.setState(
//           {images: [],
//             loading: false,
//             error: true,
//           });
//          return;
//       }

//       this.setState(prevState => {
//         return {
//           images: [...prevState.images, ...response.hits]
//         }
//       });
//     } catch (error) {
//       console.log(error)
//       this.setState({
//         images: [],
//         error
//       })
//     } finally {
//       this.setState({
//         loading: false
//       });
//     }
//   };

// /*Получаем значения из компонента Searcbar и очищаем предыдущий поиск*/
//   handleSubmitForm = (imagesName) => {
//     // console.log(imagesName);
//     this.setState({
//       imagesName: imagesName,
//       images: [],
//       page: 1,
//     }); 
//   };
      
//   loadMore = () => {
//     this.setState(({ page }) => {
//       return {
//         page: page + 1
//       }
//     })
//   };
    
//   openModal = (modalLink) => {
//     this.setState({
//       modalIsOpen: true,
//       modalLink: modalLink.largeImageURL

//     })
//   }

//   toggleModal = () => {
//     this.setState((state) => ({
//       modalIsOpen: !state.modalIsOpen
//     }))
//   }
  
  
//   render() {
//     const { images, error, loading, imagesName, modalIsOpen, modalLink } = this.state;
//     const isImages = Boolean(images.length); 
//     const isLoadMore = (images.length % 12 === 0) ? true : false ;
//     return (
//       <div
//         style={{
//           height: '100vh',
//           fontSize: 24,
//           color: '#010101'
//         }}
//       >
//         {/* {images && <div>tyt bydet images after fetch <ImageGallery images={images} onClick={openModal} /></div>} */}
//         <SearchBar onSubmit={this.handleSubmitForm} />  
//         <div className="wrapper">
//           {error && <p>Немає зображення по запиту {imagesName}</p>}
//           {loading && <Loader />}
          
//         </div>
//         {isImages && <ImageGallery images={images} onClick={this.openModal} />}
//         {isImages && isLoadMore && <Button onClick={ this.loadMore} /> }
//         {modalIsOpen && (
//           <Modal onClose={this.toggleModal}>
          
//             {/* <button type="button" onClick={this.toggleModal}></button> */}
//               <img src={modalLink} alt=""></img>
//           </Modal >)}
//         <ToastContainer autoClose={4000} />
//       </div>
//     )
//   }
// };
