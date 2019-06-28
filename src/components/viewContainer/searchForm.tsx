import React, { Component, CSSProperties } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { ThemedCSSProperties, ThemeContext } from "../../contexts/themeContext";




interface Props {
}

interface State {
    inputValue: string
}

export default class SearchForm extends Component<Props, State> {
    constructor(props: Props) {
        super(props)
        this.state = { 
            inputValue: localStorage.getItem("searchValue") || ""};

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event: any) {
        this.setState({ inputValue: event.target.value });
    }

    handleSubmit(event: any) {
       /*  alert('A name was submitted: ' + this.state.value); */


    
    if (event.which === 13) {
        this.context.router.history.push(this.state.inputValue)
    }

    event.stopPropagation();
    }
    static contextTypes = {
        router: PropTypes.object
    }

    render() {
        return (
            <ThemeContext.Consumer>
                {({ theme }) => (
            <form>
                    <input 
                        onChange={this.handleChange}
                        type="text" 
                        onKeyPress={this.handleSubmit}
                        value={this.state.inputValue}
                        />

                    <button 
                        type="submit" 
                        onClick={this.handleSubmit}
                        >
                        <Link to={this.state.inputValue}>Search</Link>
                        </button>
            </form>
        )}
        </ThemeContext.Consumer>
        )
    }
    
}

