import { Component } from "react";
  import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';

import {SearchBar} from './Searchbar/Searchbar';
import Loader from './Loader/Loader';
import {ImageGallery} from './ImageGallery/ImageGallery'
import { getImages } from "./Api/api";
import Modal from './Modal/Modal';
import Button from './Button/Button';

import './App.css'

export default class App extends Component {
  state = {
    images: [],
    imagesName: '',
    page: 1,
    error: null,
    loading: false,
    modalIsOpen: false,
    modalLink: '',
  }

  // componentDidMount() {
  //   const { imagesName, page } = this.state;

  //  // if (prevState.imageName !== imageName) {  //|| page !== prevState.page)
  //     this.fetchImages(imagesName, page)
  //   //}
  // }

  componentDidUpdate(prevProps, prevState) {
    // console.log('prevProps', prevProps);
    // console.log('prevState', prevState);
    const { page, imagesName} = this.state;
    if (prevState.imagesName !== imagesName ||
      prevState.page !== page) {
      this.fetchImages(imagesName, page);
    }
  } 

  fetchImages = async (imagesName, page) => {
    if (!imagesName) {
      return;
    }
    try {
      this.setState({
        loading: true,
        error: false,
      });
      
      const response = await getImages(imagesName, page);
      console.log('response', response);

      if (response.hits.length === 0) {
        toast.error('Немає зображення по запиту');
       
        this.setState(
          {images: [],
            loading: false,
            error: true,
          });
         return;
      }

      this.setState(prevState => {
        return {
          images: [...prevState.images, ...response.hits]
        }
      });
    } catch (error) {
      console.log(error)
      this.setState({
        images: [],
        error
      })
    } finally {
      this.setState({
        loading: false
      });
    }
  };

/*Получаем значения из компонента Searcbar и очищаем предыдущий поиск*/
  handleSubmitForm = (imagesName) => {
    // console.log(imagesName);
    this.setState({
      imagesName: imagesName,
      images: [],
      page: 1,
    }); 
  };
      
  loadMore = () => {
    this.setState(({ page }) => {
      return {
        page: page + 1
      }
    })
  };
    
  openModal = (modalLink) => {
    this.setState({
      modalIsOpen: true,
      modalLink: modalLink.largeImageURL

    })
  }

  toggleModal = () => {
    this.setState((state) => ({
      modalIsOpen: !state.modalIsOpen
    }))
  }
  
  
  render() {
    const { images, error, loading, imagesName, page, modalIsOpen, modalLink } = this.state;
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
        <SearchBar onSubmit={this.handleSubmitForm} />  
        <div className="wrapper">
          {error && <p>Немає зображення по запиту {imagesName}</p>}
          {loading && <Loader />}
          
        </div>
        {isImages && <ImageGallery images={images} onClick={this.openModal} />}
        {isImages && isLoadMore && <Button onClick={ this.loadMore} /> }
        {modalIsOpen && (
          <Modal onClose={this.toggleModal}>
          
            {/* <button type="button" onClick={this.toggleModal}></button> */}
              <img src={modalLink} alt=""></img>
          </Modal >)}
        <ToastContainer autoClose={4000} />
      </div>
    )
  }
};
