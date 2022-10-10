//mport { toContainHTML } from "@testing-library/jest-dom/dist/matchers";
import { Component } from "react";

export default class SearchBar extends Component {
    state = {
        imagesName: '',
    }

    handleSubmit = event => {
        event.preventDefault();

        if (this.state.imagesName.trim() === '') {
            alert('Введите строку поиска')
            return;
        }
        //передпсем ищ APP пропс             
        this.props.onSubmit(this.state.imagesName);
        this.setState({ imagesName: '' });
    };

    handleSaerchChange = event => {
        this.setState({ imagesName: event.currentTarget.value.toLowerCase() })
    };

    render() {
        return (
            <header className="searchbar">
                <form class="form" onSubmit={this.handleSubmit}>
                    <button type="submit" class="button">
                        <span class="button-label">Search</span>
                    </button>
                    <input
                        class="input"
                        type="text"
                        autocomplete="off"
                        autofocus
                        placeholder="Search images and photos"
                        onChange={this.handleSaerchChange}
                    />
                </form>
            </header>       
        )
    }
}


