import React, { Component } from 'react';
import { Button, Card, CardBody, CardGroup, Col, Form, Input, InputGroup, Row } from "reactstrap";
import WorkerService from "../services/worker.service";

class Profile extends Component {
    state = {
        item:{}
    }
    handleChange(propertyName, event) {
        var item = this.state.item;
        item[propertyName] = event.target.value;
        this.setState({ item: item });
    }
    saveProfile() {
        var data = this.state.item;
       console.log(data);
       /* WorkerService.updateWorkerProfile(id, data).then(
            response => {
                console.log(response);
            },
            error => {
                console.log("Error");
            }
        ); 
        */
    }
    render() {
        return (
            <React.Fragment>

                <CardGroup>
                    <Card className="p-2">
                        <CardBody>
                            <Form>
                                <InputGroup className="mb-3">
                                    <Input type="text" placeholder="Enter Name" onChange={this.handleChange.bind(this, 'name')} />
                                </InputGroup>
                                <InputGroup className="mb-3">
                                    <Input type="text" placeholder="Enter Phone Number" onChange={this.handleChange.bind(this, 'phone')}/>
                                </InputGroup>
                                <InputGroup className="mb-3">
                                    <Input type="text" placeholder="Enter Address" onChange={this.handleChange.bind(this, 'address')}/>
                                </InputGroup>
                                <InputGroup className="mb-3">
                                    <Input type="text" placeholder="Enter Email" onChange={this.handleChange.bind(this, 'email')}/>
                                </InputGroup>
                                <InputGroup className="mb-3">
                                    <Input type="text" placeholder="Availability per day" onChange={this.handleChange.bind(this, 'avail_per_day')}/>
                                </InputGroup>
                                <InputGroup className="mb-3">
                                    <Input type="text" placeholder="Cost per hour" onChange={this.handleChange.bind(this, 'cost_per_hr')}/>
                                </InputGroup>
                                <InputGroup className="mb-3">
                                    <Input type="text" placeholder="Profession" onChange={this.handleChange.bind(this, 'professionId')}/>
                                </InputGroup>
                                <InputGroup className="mb-3 justify-content-center">
                                    <Button color="success"  onClick={() => this.saveProfile()}>Save</Button>
                                </InputGroup>
                            </Form>
                        </CardBody>
                    </Card>
                </CardGroup>

            </React.Fragment>
        );
    }
}
export default Profile;