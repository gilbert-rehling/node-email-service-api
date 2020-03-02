import React from 'react';
import axios from 'axios';

class EmailForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            sender: '',
            receiver: '',
            subject: '',
            message: ''
        };
        this.formChangeHandler  = this.formChangeHandler.bind(this);
        this.formSubmitHandler  = this.formSubmitHandler.bind(this);
    }

    // populate the state
    formChangeHandler(event) {
        // dynamic state population
        console.log("name: " + event.target.name);
        console.log("value: " + event.target.value);
        let stateObject = function() {
            let returnObj = {};
            returnObj[event.target.name] = event.target.value;
            return returnObj;

        }.bind(event)();

        this.setState( stateObject );
    };

    // submit the form the the email service
    formSubmitHandler(event) {
        event.preventDefault();

        let api = 'http://192.168.1.140:8080/api/email';

        axios.post(api,
           {
               sender: this.state.sender,
               receiver: this.state.receiver,
               subject: this.state.subject,
               message: this.state.message
           }
            )
            .then( (response) => {
                console.log(response);
            })
            .catch( (error) => {
                console.log(error);
            });
    };

    render() {
        return (
            <form className="App-form" onSubmit={this.formSubmitHandler}>
                <h3>Complete all fields to send a test email</h3>
                <label>Your Email Address</label>
                <input
                    type={'text'}
                    name={'sender'}
                    onChange={(e) => this.formChangeHandler(e)}
                    />
                <label>Receiver's Email Address</label>
                <input
                    type={'text'}
                    name={'receiver'}
                    onChange={(e) => this.formChangeHandler(e)}
                />
                <label>Email Subject</label>
                <input
                    type={'text'}
                    name={'subject'}
                    onChange={(e) => this.formChangeHandler(e)}
                />
                <label>Email Message</label>
                <textarea name={'message'} onChange={(e) => this.formChangeHandler(e)} defaultValue={''}></textarea>
                <br/>
                <br/>
                <input
                    type={'submit'}
                    value={'Send Email'}
                    />
            </form>
        )
    }
}

export default EmailForm;