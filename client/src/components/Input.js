import React, { Component } from 'react';
import axios from 'axios';

class Input extends Component {
    constructor(props) {
        super(props);
        this.state = {
            address: '',
            data: '',
            txId: '',
        };
    }

    handleSubmit = async (event) => {
        event.preventDefault()
        const request = {
            address: this.state.address,
            data: this.state.data
        }
        const response = await axios.post('/api', request);
        this.setState({txId: response.data.txId})
    }

    handleChange = (event) => {
        let name = event.target.name
        let value = event.target.value
        this.setState({[name]: value});
    }

    render () {
        return (
            <div>
                <h1>OP_RETURN APP</h1>
                <form onSubmit={this.handleSubmit}>
                    <p>Enter the new owner's address</p>
                    <input
                        type='text'
                        name='address'
                        onChange={this.handleChange}
                    />
                    <p>Enter the chassi ID</p>
                    <input
                        type='text'
                        name='data'
                        onChange={this.handleChange}
                    />
                    <br />
                    <br />
                    <input type='submit' name='Submit'/>
                    <p>TxId</p>
                    <p>{this.state.txId}</p>
                </form>
            </div>
        );
    }
}

export default Input;
