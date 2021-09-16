import React, { Component } from 'react';

import MyAlert from "../components/MyAlert";
import AdminService from "../services/admin.service";

class EditOperations extends Component {
    constructor(props) {
        super(props);
        this.state = {
            item: [],
            toolsList: [],
            selectedTool: {},
            showAlert: false,
            alertConfig: {
                "variant": "danger"
            },
            //workerList: [],
            //selectedWorker: {}
        }
        this.getOperationById();
        this.getAllTools();
        //this.getAllWorkers();
    }
    getOperationById() {
        AdminService.getOperationById(this.props.selectedId).then(
            response => {
                this.setState({
                    item: response.data
                });
            },
            error => {
                console.log("Error");
            }
        );
    }
    getAllTools() {
        AdminService.getAllInventory().then(
            response => {
                this.setState({
                    toolsList: response.data.rows
                });
            },
            error => {
                console.log("Error");
            }
        );
    }

    /*getAllWorkers() {
        AdminService.getAllWorkers().then(
            response => {
                this.setState({
                    workerList: response.data.rows
                });
            },
            error => {
                console.log("Error");
            }
        );
    } */

    handleChange(propertyName, event) {
        var item = this.state.item;
        item[propertyName] = event.target.value;
        this.setState({ item: item });
    }
    handleToolSelection(event) {
        var selectedTool = this.state.toolsList.find(o => o.id == event.target.value);
        var newToolItem = {
            "Inventories": selectedTool,
            "req_avail": this.state.item.toolRequired
        };
        this.setState({ selectedTool: newToolItem });
    }
    /*handleWorkerSelection(event) {
        this.state.selectedWorker = this.state.workerList.find(o => o.id == event.target.value);
    }*/
    showAlertMessage(msg) {
        this.setState(prevState => ({
            alertConfig: { 
                ...prevState.alertConfig,
                message: msg
            },
            showAlert: true 
        }))
    }

    addTools(event) {
        if (!this.state.selectedTool.Inventories || !this.state.item.toolRequired) {
            this.showAlertMessage("Please select Tools / Materials and add Required quantity");
        } else {
            this.setState({ showAlert: false });

            if (this.state.item.id) {

                this.state.selectedTool['req_avail'] = this.state.item.toolRequired;
                var selectedOperation = this.state.item;
                selectedOperation.OperationInventories.push(this.state.selectedTool);
                this.setState({ item: selectedOperation });
            } else {
                var selectedOperation = this.state.item;
                if (!selectedOperation.OperationInventories) {
                    selectedOperation['OperationInventories'] = [];
                }
                var required_qty = this.state.item.toolRequired;
                this.state.selectedTool['req_avail'] = required_qty;

                selectedOperation.OperationInventories.push(this.state.selectedTool);
                this.setState({ item: selectedOperation });
            }
        }
    }
    /*addWorker(event) {
        if (this.state.item.id) {
            this.state.selectedWorker['required_hrs'] = this.state.item.workerRequired;
            this.state.selectedWorker['est_cost'] = parseInt(this.state.item.workerRequired) * parseInt(this.state.selectedWorker.cost_per_hr);
            var selectedOperation = this.state.item;
            selectedOperation.OperationWorkers.push(this.state.selectedWorker);
            this.setState({ item: selectedOperation });
        } else {
            debugger;
            var selectedOperation = this.state.item;
            if (!selectedOperation.OperationWorkers) {
                selectedOperation['OperationWorkers'] = [];
            }
            this.state.selectedWorker['required_hrs'] = this.state.item.workerRequired;
            this.state.selectedWorker['est_cost'] = parseInt(this.state.item.workerRequired) * parseInt(this.state.selectedWorker.cost_per_hr);

            selectedOperation.OperationWorkers.push(this.state.selectedWorker);
            this.setState({ item: selectedOperation });
        }

    }*/

    saveOperation() {
        console.log(this.state.item);
        var tmpworkerobj = [];
        this.state.item.OperationWorkers.map((item, i) => {
            if (item.id) {
                var workerobj = {};
                workerobj["id"] = item.id;
                workerobj["required_hrs"] = item.required_hrs;
                workerobj["est_cost"] = item.est_cost;
                tmpworkerobj.push(workerobj);
            }
        });
        var tmpInvobj = [];
        this.state.item.OperationInventories.map((item, i) => {
            if (item.id) {
                var invobj = {};
                invobj["id"] = item.id;
                invobj["required_qty"] = item.required_qty;
                tmpInvobj.push(invobj);
            }
        });
        var data = {
            "name": this.state.item.name,
            "desc": this.state.item.desc,
            "items": tmpInvobj,
            "workers": tmpworkerobj
        };



        if (this.state.item.id != undefined) {
            AdminService.editOperation(this.state.item.id, data).then(
                response => {
                    console.log(response.data.message);
                    //this.showPopupMessage(response.data.message);
                },
                error => {
                    console.log("Error");
                }
            );
        } else {

            AdminService.createOperation(data).then(
                response => {
                    console.log(response.data.message);
                    //this.showPopupMessage(response.data.message);
                },
                error => {
                    console.log("Error");
                }
            );
        }
        this.props.parentCallback();
    }
    resetReq() {

    }
    handleBreadCrumb() {
        this.props.parentCallback();
    }
    renderToolsList() {
        return (
            <div className="col">
                <div className="row">
                    <div className="col-6"><span>Tools and Materials</span></div>
                    <div className="col-6"><span>Required</span></div>
                </div>
                <div className="row">
                    <div className="col-6">
                        <select className="form-control" onChange={this.handleToolSelection.bind(this)}>
                            <option>Select Tools</option>
                            {this.state.toolsList.map((toolItem) => (
                                <option key={toolItem.id} value={toolItem.id}>{toolItem.itemName}</option>
                            ))}
                        </select>
                    </div>
                    <div className="col-6">
                        <input type="number" className="form-control col-6 d-inline" onChange={this.handleChange.bind(this, 'toolRequired')} />
                        <button type="button" className="btn btn-green btn-sm ml-2 pr-4 pl-4 d-inline" onClick={this.addTools.bind(this)}>Add</button>
                    </div>
                    <div className="font-italic text-center col-8">
                    {this.state.showAlert && < MyAlert alertConfig = {this.state.alertConfig} /> }
                    </div>
                    
                </div>
                <div className="row mt-1 quote-req-header font-weight-bold">
                    <div className="col-sm">
                        <label>Tool/Material Name</label>
                    </div>
                    <div className="col-sm">
                        <label>Required</label>
                    </div>
                    <div className="col-sm">
                        <label>Availability</label>
                    </div>
                </div>

                {this.state.item.OperationInventories.map((item) => (

                    <div className="row mt-1">
                        <div className="col-sm">
                            <label>{item.Inventories && item.Inventories.itemName}</label>
                        </div>
                        <div className="col-sm">
                            <label>{item.req_avail}</label>
                        </div>
                        <div className="col-sm">
                            <label>{item.Inventories && item.Inventories.availability}</label>
                        </div>
                    </div>

                ))}
            </div>

        );
    }
    render() {
        return (
            <React.Fragment>
                {this.state.item &&
                    <div className="col edit-inventory">
                        <div className="list-group-header section-header row">
                            <div className="col-4">

                                <nav aria-label="breadcrumb">
                                    <ul className="breadcrumb">
                                        <li className="breadcrumb-item" onClick={this.handleBreadCrumb.bind(this)}>
                                            <span className="mb-1 underline">Manage</span>
                                            <span className="mb-1 blue-color pl-2">Operation</span>
                                        </li>
                                        <li className="breadcrumb-item active" aria-current="page">
                                            <span className="mb-1">{(this.state.item.length !== 0) ? 'Edit' : 'Add'}</span>
                                            <span className="mb-1 blue-color pl-2">Operation</span>
                                        </li>
                                    </ul>
                                </nav>

                            </div>
                            <div className="col-8 text-right">
                                <button type="button" className="btn btn-blue btn-sm pr-4 pl-4" onClick={() => this.resetReq()} >Reset</button>
                                <button type="button" className="btn btn-green btn-sm ml-2 pr-4 pl-4" onClick={() => this.saveOperation()}>Save</button>
                            </div>
                        </div>

                        <div className="blue-box-div row">
                            <div className="col-4 white-border-right">
                                <div>
                                    <span>Operation Name</span>
                                    <input type="text"
                                        className="form-control" defaultValue={this.state.item.name}
                                        onChange={this.handleChange.bind(this, 'name')} />
                                </div>
                                <div>
                                    <span>Description</span>
                                    <textarea className="form-control" rows="3"
                                        defaultValue={this.state.item.desc}
                                        onChange={this.handleChange.bind(this, 'desc')}></textarea>
                                </div>

                            </div>
                            {this.state.item.OperationInventories && this.renderToolsList()}


                        </div>
                    </div>
                }

            </React.Fragment>
        );
    }
}
export default EditOperations;