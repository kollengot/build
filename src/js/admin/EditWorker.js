import React, { Component } from 'react';

import AdminService from "../services/admin.service";

class EditWorker extends Component {
    state = {
        item: this.props.selectedItem,
        editWorkerPage: this.props.editWorkerPage
    }
    handleChange(propertyName, event) {
        var item = this.state.item;
        item[propertyName] = event.target.value;
        this.setState({ item: item });
    }
    saveWorker() {
        if(this.state.item.id !== undefined) {
            this.editWorker();
        } else {
            this.createWorker();
        }
        
    }
    editWorker() {
        var data = {
            "name": this.state.item.name,
            "phone": this.state.item.phone,
            "address" : this.state.item.address,
            "email": this.state.item.email,
            "avail_per_day": this.state.item.avail_per_day,
            "cost_per_hr" : this.state.item.cost_per_hr,
            "total_avail_per_week": this.state.item.total_avail_per_week,
            "professionId": this.state.item.professionId
        };
        AdminService.editWorker(this.state.item.id, data).then(
            response => {
                this.props.parentCallback(response.data.message);
            },
            error => {
                console.log("Error");
            }
        ); 
    }
    createWorker() {
        console.log(this.state.item);
        var data = {
            "name": this.state.item.name,
            "phone": this.state.item.phone,
            "address" : this.state.item.address,
            "email": this.state.item.email,
            "avail_per_day": this.state.item.avail_per_day,
            "cost_per_hr" : this.state.item.cost_per_hr,
            "total_avail_per_week": this.state.item.total_avail_per_week,
            "professionId": this.state.item.professionId
        };

        AdminService.createWorker(data).then(
            response => {
                this.props.parentCallback(response.data.message);
            },
            error => {
                console.log("Error");
            }
        ); 
    }
    resetReq() {

    }
    handleBreadCrumb() {
        this.props.parentCallback();
    }
    render() {
        return (
            <React.Fragment>

                <div className="col edit-worker">
                    <div className="list-group-header section-header row">
                        <div className="col-4">

                            <nav aria-label="breadcrumb">
                                <ul className="breadcrumb">
                                    <li className="breadcrumb-item" onClick={this.handleBreadCrumb.bind(this)}>
                                        <span className="mb-1 underline">Manage</span>
                                        <span className="mb-1 blue-color pl-2">Worker</span>
                                    </li>
                                    <li className="breadcrumb-item active" aria-current="page">
                                        <span className="mb-1">{(this.state.item.length !== 0) ? 'Edit' : 'Add'}</span>
                                        <span className="mb-1 blue-color pl-2">Worker</span>
                                    </li>
                                </ul>
                            </nav>

                        </div>
                        <div className="col-8 text-right">
                            <button type="button" className="btn btn-blue btn-sm pr-4 pl-4" onClick={() => this.resetReq()} >Reset</button>
                            <button type="button" className="btn btn-green btn-sm ml-2 pr-4 pl-4" onClick={() => this.saveWorker()}>Save</button>
                        </div>
                    </div>

                    <div className="blue-box-div row">
                        <div className="col white-border-right">
                            <div>
                                <span>Worker Name</span>
                                <input type="text"
                                    className="form-control" defaultValue={this.state.item.name}
                                    onChange={this.handleChange.bind(this, 'name')} />
                            </div>
                            <div>
                                <span>Phone</span>
                                <input type="text"
                                    className="form-control" defaultValue={this.state.item.phone}
                                    onChange={this.handleChange.bind(this, 'phone')} />
                            </div>
                            <div>
                                <span>Address</span>
                                <textarea className="form-control" rows="3"
                                    defaultValue={this.state.item.address}
                                    onChange={this.handleChange.bind(this, 'address')}></textarea>
                            
                            </div>
                            <div>
                                <span>Email</span>
                                <input type="text"
                                    className="form-control" defaultValue={this.state.item.email}
                                    onChange={this.handleChange.bind(this, 'email')} />
                            </div>
                            <div>
                                <span>Available per Day</span>
                                <input type="number"
                                    className="form-control" defaultValue={this.state.item.avail_per_day}
                                    onChange={this.handleChange.bind(this, 'avail_per_day')} />
                            </div>
                            <div>
                                <span>Cost per Hour</span>
                                <input type="number"
                                    className="form-control" defaultValue={this.state.item.cost_per_hr}
                                    onChange={this.handleChange.bind(this, 'cost_per_hr')} />
                            </div>
                            <div>
                                <span>Total Avalability per Week</span>
                                <input type="number"
                                    className="form-control" defaultValue={this.state.item.total_avail_per_week}
                                    onChange={this.handleChange.bind(this, 'total_avail_per_week')} />
                            </div>
                            <div>
                                <span>Profession</span>
                                <select className="form-control" defaultValue={this.state.item.professionId} onChange={this.handleChange.bind(this, 'professionId')} >
                                    <option selected>Select a Profession</option>
                                    <option value="1">Engineer</option>
                                    <option value="2">Painter</option>
                                </select>
                            </div>
                            
                        </div>
                        <div className="col">
                        <span> {this.state.item.operations_tagged ? 'Operatios Tagged' : 'No Operatios Tagged'}</span>
                            
                            <div>
                                {this.state.item.operations_tagged && this.state.item.operations_tagged.map((operation, index) => (
                                    <span className="badge tool-badge">Operation {index + 1} - {operation}</span>
                                )
                                )}
                            </div>
                        </div>

                    </div>



                </div>


            </React.Fragment>
        );
    }
}
export default EditWorker;