import React, { Component } from 'react';
import { Button, Form, Input, InputGroup } from "reactstrap";
import { isEmail } from "validator";

import { loginMessages } from '../common/Constants';
import AuthService from "../services/auth.service";

class ForgotPassword extends Component {
    constructor() {
        super();
        this.state = {
            Email: '',
            errors: {}
        }
        this.Email = this.Email.bind(this);
    }
    Email(event) {
        this.setState({ Email: event.target.value })
    }
    validateForm() {
        let errors = {};
        let isValid = true;
        if (!this.state.Email) {
            isValid = false;
            errors["email"] = "Please enter your email Address.";
        }
        if (typeof this.state.Email !== "undefined") {
            var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
            if (!pattern.test(this.state.Email)) {
                isValid = false;
                errors["email"] = "Please enter valid email address.";
            }
        }
        this.setState({
            errors: errors
        });
        return isValid;
    }
    forgotPassword = () => {
        if(this.validateForm()) {
            var data = JSON.stringify({
                "email": this.state.Email
            });
            var errors = {};

            AuthService.forgotPassword(data).then(
                response => {
                    if (response && response.data) {
                        errors["resp"] = "Email sent successfully";
                    } else {
                        errors["resp"] = "Someting went Wrong";
                    }
                },
                error => {
                    errors["resp"] = "Someting went Wrong";
                }
            );
            debugger;
            this.setState({
                errors: errors
            });
            //this.props.popupClose();
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
                    <div className="text-danger mt-4">{this.state.errors.email}</div>
                    <div className="text-success mt-4">{this.state.errors.resp}</div>
                </Form>
            </React.Fragment>
        );
    }
}
export default ForgotPassword;