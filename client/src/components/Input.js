import React, { Component } from 'react';
import axios from 'axios';

class Input extends Component {
    state = {
        address: '',
        data: '',
    }

    enterData = () => {
        const input = {
            address: this.state.address,
            data: this.state.data
        };

        if (input.address && input.data > 0) {
            axios
                .post('/api', input)
                .then((res) => {
                    if (res.data) {
                        this.setState({ address: '', data: '' })
                    }
                })
        }
    }

    render() {
        return (
            <div>
                <h1>OP_RETURN APP</h1>
            </div>
        );
    }
}

export default Input;
