import React, { Component } from 'react';
import { Button, Form, Input, InputGroup } from "reactstrap";
import { isEmail } from "validator";

import MyAlert from "../components/MyAlert";
import { loginMessages } from '../common/Constants';

class ForgotPassword extends Component {
    constructor() {
        super();
        this.state = {
            Email: '',
            showAlert: false,
            alertConfig: {
                "variant": "danger"
            },
        }
        this.Email = this.Email.bind(this);
    }
    Email(event) {
        this.setState({ Email: event.target.value })
    }
    forgotPassword = () => {
        if (!isEmail(this.state.Email)) {
            this.setState(prevState => ({
                alertConfig: {
                    ...prevState.alertConfig,
                    message: loginMessages.EMAILERROR
                },
                showAlert: true
            }))
        } else {
            this.props.popupClose();
        }
    }
    render() {
        return (
            <React.Fragment>
                <Form>
                    <InputGroup className="mb-3">
                        <Input type="text" onChange={this.Email} placeholder="name@example.com" />
                    </InputGroup>
                    <Button color="success" onClick={this.forgotPassword} >Submit</Button>
                    {this.state.showAlert && < MyAlert alertConfig={this.state.alertConfig} showAlert={this.state.showAlert} />}
                </Form>
            </React.Fragment>
        );
    }
}
export default ForgotPassword;