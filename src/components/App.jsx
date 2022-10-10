import { Component } from "react";
import axios from "axios";
import SearchBar from './Searchbar/Searchbar';
import Loader from './Loader/Loader';
import ImageGallery from './ImageGallery/ImageGallery';
 
import './App.css'

export default class App extends Component {
  state = {
    images: [],
    imageName: '',
    page: 1,
    error: null,
    loading: false,
  }

  componentDidMount() {
    const { imageName, page } = this.state;

   // if (prevState.imageName !== imageName) {  //|| page !== prevState.page)
      this.fetchImages(imageName, page)
    //}
  }

  fetchImages() {
    const { imageName, page } = this.state;

    this.setState({
      loading: true,
    });

    axios.get(`https://pixabay.com/api/?q=${imageName}&page=${page}&key=29288692-4de5473bca5fca6278995f222&image_type=photo&orientation=horizontal&per_page=12`)
      .then((data) => {
        console.log(data.data.hits);
        const dataN = data.data.hits;
        this.setState(({ images }) => {
          return {
            images: [...images, ...dataN]
          }
        })
      })
      .catch(error => {
        this.setState({
          error
        })
      })
      .finally(() => this.setState({loading: false}));
  }
    
  // async fetchImages() {
  //   const { imageName, page } = this.state;
  //   this.setState({
  //     loading: true
  //   })

  //   try {
  //     const data = await fetch(`https://pixabay.com/api/?q=${imageName}&page=${page}&key=29288692-4de5473bca5fca6278995f222&image_type=photo&orientation=horizontal&per_page=12`)
  //       .then(response => {
  //         if (response.ok) {
  //           return response.json();
  //         }

  //         return Promise.reject(
  //           new Error(`Немає зображення по запиту ${imageName}`),
  //         );
  //       })
  //       .then(images => this.setState([...images, ...data.hits]));
  //   }
  //   catch (error) { 
  //     this.setState({error})
  //   }
  //   finally {
  //     this.setState({
  //       loading:false
  //     })
  //   }
  // }
  
    
  
   handleFormSubmit = imageName => {
      this.setState({ imageName });
      console.log(imageName);
   };
  
  render() {
    const { images, error, loading, imageName, page } = this.state;
    const isImages = Boolean(imageName.length);  
    return (
      <div
        style={{
          height: '100vh',
          fontSize: 40,
          color: '#010101'
        }}
      >
        {images && <div>tyt bydet images after fetch</div>
        }
       
        {error && <p>Немає зображення по запиту ${imageName}</p>}
        <SearchBar onSubmit={this.handleFormSubmit} />
        {loading && <Loader />}
        {isImages && <ImageGallery imageName={imageName} onClick={this.handleFormSubmit} />}
      </div>
    );
  }
};
