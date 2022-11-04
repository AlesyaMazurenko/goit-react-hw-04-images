// import { Component } from "react";
import { useState } from 'react';
import './SearchBar.css';
import { toast } from 'react-toastify';
import propTypes from 'prop-types';
import { ImSearch } from 'react-icons/im';

export default function SearchBar({ onSubmit }) {
    
    const [imagesName, setImagesName] = useState('');

    const changeHandler = event => {
        setImagesName(event.target.value.toLowerCase());
    }

    const submitHandler = event => {
        event.preventDefault();

        if (imagesName.trim() === '') {
            toast.warning('Введите строку поиска');
            return;
        }
        // передпсем ищ APP пропс             
        onSubmit(imagesName); /*Передаём значение в App */
        setImagesName('');
    };

    return (
        <header className="searchbar">
            <form className='searchForm' onSubmit={submitHandler}>
                <button type="submit" className="searchForm-button">
                    <ImSearch size="24px" />
                    <span className='searchForm-button-label'>Search</span>
                </button>
                <input
                    className="searchForm-input"
                    type="text"
                    autoComplete="off"
                    autoFocus
                    placeholder="Search images and photos"
                    name="imagesName"
                    value={imagesName}
                    onChange={changeHandler}
                />
            </form>
        </header>
    )
    
    
};

    // export default SearchBar;


SearchBar.propTypes = {
    onSubmit: propTypes.func,
    // onChange: propTypes.func,
}


// export class SearchBar extends Component {
//     state = {
//         imagesName: '',
//     }

//     changeHandler = (event) => {
//          /*Универсальной метод сбора введённых данных */
//         const { name, value } = event.target;
//         this.setState({
//             [name]: value.toLowerCase(),
//         })
//      }

//     submitHandler = event => {
//         event.preventDefault();

//         if (this.state.imagesName.trim() === '') {
//             toast.warning('Введите строку поиска');
//             return;
//         }
//             // передпсем ищ APP пропс             
//         this.props.onSubmit(this.state.imagesName); /*Передаём значение в App */
//         this.setState({ imagesName: '' });
//     };

//     render() {
//         return (
//             <header className="searchbar">
//                 <form className='searchForm' onSubmit={this.submitHandler}>
//                     <button type="submit" className="searchForm-button">
//                           <ImSearch size="24px" />
//                         <span className='searchForm-button-label'>Search</span>
//                     </button>
//                     <input
//                         className="searchForm-input"
//                         type="text"
//                         autoComplete="off"
//                         autoFocus
//                         placeholder="Search images and photos"
//                         name="imagesName"
//                         value={this.state.imagesName}
//                         onChange={this.changeHandler}
//                     />
//                 </form>
//             </header>
//         )
//     }
    
// }


