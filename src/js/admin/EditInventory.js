import React, { Component } from 'react';
import Popup from "../components/Popup";

import AdminService from "../services/admin.service";

class EditInventory extends Component {
    state = {
        item: this.props.selectedItem,
        editInventoryPage: this.props.editInventoryPage,
        popupConfig: {},
        isPopupOpen: false,
    }
    handleChange(propertyName, event) {
        var item = this.state.item;
        item[propertyName] = event.target.value;
        this.setState({ item: item });
    }
    saveInventory() {
        if (this.state.item.id !== undefined) {
            this.updateInventory();
        } else {
            this.createInventory();
        }
    }
    updateInventory() {
        var data = {
            "itemName": this.state.item.itemName,
            "itemDesc": this.state.item.itemDesc,
            "availability": this.state.item.availability,
            "cost": this.state.item.cost,
            "supplier_email": this.state.item.supplierInfo,
            "operations": []
        };

        AdminService.editInventory(this.state.item.id, data).then(
            response => {
                this.showPopupMessage(response.data.message);
            },
            error => {
                console.log("Error");
            }
        );
    }
    createInventory() {
        var data = {
            "itemName": this.state.item.itemName,
            "itemDesc": this.state.item.itemDesc,
            "availability": this.state.item.availability,
            "cost": this.state.item.cost,
            "supplier_email": this.state.item.supplierInfo,
            "operations": []
        };

        AdminService.createInventory(data).then(
            response => {
                this.showPopupMessage(response.data.message);
            },
            error => {
                console.log("Error");
            }
        );
    }
    showPopupMessage(message) {
        this.setState({
          isPopupOpen: true,
          popupConfig: {
            header: "Message",
            body: message,
            type: "message"
          }
        });
    }
    resetReq() {

    }
    handleBreadCrumb() {
        this.props.parentCallback();
    }

    handleClose= () => {
        this.setState({
            isPopupOpen: false
        });
    }
    render() {
        return (
            <React.Fragment>
                <Popup popupConfig={this.state.popupConfig} openFlag={this.state.isPopupOpen} parentCloseCallback={this.handleClose}></Popup>

                <div className="col edit-inventory">
                    <div className="list-group-header section-header row">
                        <div className="col-4">

                            <nav aria-label="breadcrumb">
                                <ul className="breadcrumb">
                                    <li className="breadcrumb-item" onClick={this.handleBreadCrumb.bind(this)}>
                                        <span className="mb-1 underline">Manage</span>
                                        <span className="mb-1 blue-color pl-2">Inventory</span>
                                    </li>
                                    <li className="breadcrumb-item active" aria-current="page">
                                        <span className="mb-1">{(this.state.item.length !== 0) ? 'Edit' : 'Add'}</span>
                                        <span className="mb-1 blue-color pl-2">Inventory</span>
                                    </li>
                                </ul>
                            </nav>

                        </div>
                        <div className="col-8 text-right">
                            <button type="button" className="btn btn-blue btn-sm pr-4 pl-4" onClick={() => this.resetReq()} >Reset</button>
                            <button type="button" className="btn btn-green btn-sm ml-2 pr-4 pl-4" onClick={() => this.saveInventory()}>Save</button>
                        </div>
                    </div>

                    <div className="blue-box-div row">
                        <div className="col white-border-right">
                            <div>
                                <span>Item Name</span>
                                <input type="text"
                                    className="form-control" defaultValue={this.state.item.itemName}
                                    onChange={this.handleChange.bind(this, 'itemName')} />
                            </div>
                            <div>
                                <span>Description</span>
                                <textarea className="form-control" rows="3"
                                    defaultValue={this.state.item.itemDesc}
                                    onChange={this.handleChange.bind(this, 'itemDesc')}></textarea>
                            </div>



                            <div className="col row">
                                <div className="col-xs-2">
                                    <span>Availability</span>
                                    <input type="number"
                                        className="form-control" defaultValue={this.state.item.availability}
                                        onChange={this.handleChange.bind(this, 'availability')} />
                                </div>
                                <div className="col-xs-3 ml-4">
                                    <span>Supplier Email</span>
                                    <input type="text"
                                        className="form-control d-inline" defaultValue={this.state.item.supplierInfo}
                                        onChange={this.handleChange.bind(this, 'supplierInfo')} />
                                </div>
                                <div className="col-xs-4">
                                    <a className="btn btn-sm btn-blue m-4 p-2" href="mailto:someone@yoursite.com">Contact Supplier</a>
                                </div>
                            </div>

                            <div>
                                <span>Cost</span>
                                <input type="number"
                                    className="form-control" defaultValue={this.state.item.cost}
                                    onChange={this.handleChange.bind(this, 'cost')} />
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
export default EditInventory;