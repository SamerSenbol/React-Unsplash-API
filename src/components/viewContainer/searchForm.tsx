import React, { Component, CSSProperties } from 'react';

interface Props {
}
interface State {
    value: string
}

export default class SearchForm extends Component<Props, State> {
    constructor(props: Props) {
        super(props)
        this.state = { value: '' };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event: React.ChangeEvent<HTMLTextAreaElement>) {
        this.setState({ value: event.target.value });
    }

    handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        alert('A name was submitted: ' + this.state.value);
        event.preventDefault();
    }
    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <label>
                    Essay:
          <textarea style={button} value={this.state.value} onChange={this.handleChange} />
                </label>
                <input style={input}
                 type="submit" value="Search" />
            </form>
        );
    }
}
const input: CSSProperties = {
    width: '100%',
}              
const button: CSSProperties = {
    width: '100%',
}              