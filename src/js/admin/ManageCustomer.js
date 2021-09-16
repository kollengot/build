import React, { Component } from 'react';
import Popup from "../components/Popup";
import { validationMessages } from '../common/Constants';
import EditCustomer from './EditCustomer';
import AdminService from "../services/admin.service";


class ManageCustomer extends Component {
    state = {
        searchValue: "",
        listitems: [],
        selectedItem: [],
        editCustomerPage: false,
        popupConfig: {},
        isPopupOpen: false
    }
    constructor(props) {
        super(props);
        this.getAllCustomerList();
    }
    getAllCustomerList() {
        AdminService.getAllCustomers().then(
            response => {
                if(response){
                    this.setState({
                        listitems: response.data.rows
                    });
                }
            },
            error => {
              console.log("Error");
            }
          );
    }
    handleSearchChange(e) {
        this.setState({
            searchValue: e.target.value.toLowerCase()
        });
    }
    handleClose = () => {
        this.setState({
            isPopupOpen: false
        });
    }

    handleModalYes = () => {
        this.setState({
            isPopupOpen: false
        });

        AdminService.deleteCustomer(this.state.selectedItem.id).then(
            response => {
                var tempList = this.state.listitems.filter(item => item.id !== this.state.selectedItem.id);
                this.setState({
                    listitems: tempList,
                    selectedItem: []
                });
            },
            error => {
              console.log("Error");
            }
          );

    }

    editCustomer() {
        if (this.state.selectedItem && this.state.selectedItem.length === 0) {
            this.setState({
                isPopupOpen: true,
                popupConfig : {
                    header: "Message",
                    body:validationMessages.NO_ITEM,
                    type: "message"
                }
            });
        } else {
            this.setState({
                editCustomerPage: true
            });
        }
    }

    /*addCustomer() {
        this.setState({
            selectedItem: []
        });
        this.setState({
            editCustomerPage: true
        });
    }*/
    
    deleteCustomer() {
        if (this.state.selectedItem && this.state.selectedItem.length === 0) {
            this.setState({
                isPopupOpen: true,
                popupConfig : {
                    header: "Message",
                    body:validationMessages.NO_ITEM,
                    type: "message"
                }
            });
        } else {
            this.setState({
                isPopupOpen: true,
                popupConfig : {
                    header: "Confirm to Delete",
                    body:"Are you sure you want to delete "+this.state.selectedItem.name,
                    type: "confirmation"
                }
            });
        }
    }
    onCustomerSelected(selectedItem) {
        this.setState({
            selectedItem: selectedItem
        });
    }
    parentCallback = () => {
        this.setState({
            editCustomerPage: false
        });
    }
    renderCustomerList() {
        return (<div className="col admin-list-page">
            <div className="list-group-header section-header row">
                <div className="col-4">
                    <span className="mb-1 underline">Manage</span>
                    <span className="mb-1 blue-color pl-2">Customer</span>
                </div>
                <div className="col-8 text-right">
                    <div className="has-search">
                        <span className="fa fa-search form-control-feedback"></span>
                        <input type="text" className="form-control search-box" placeholder="Search Customer..." onChange={this.handleSearchChange.bind(this)} />
                    </div>
                    <button className="btn delete-btn" onClick={() => this.deleteCustomer()}></button>
                    <button className="btn edit-btn" onClick={() => this.editCustomer()}></button>
                </div>
            </div>
            <div className="quote-req-list">
                <div className="row mt-1 quote-req-header">
                    <div className="col-sm">
                        <label>Customer Name</label>
                    </div>
                    <div className="col-sm">
                        <label>Phone</label>
                    </div>
                    <div className="col-sm">
                        <label>Address</label>
                    </div>
                    <div className="col-sm">
                        <label>Email</label>
                    </div>
                    <div className="col-sm">
                        <label>No of Request</label>
                    </div>
                </div>
                <div className="quote-req-table">
                    {this.state.listitems.filter(item =>
                        item.name.toLowerCase().includes(this.state.searchValue)).map(listitem => (


                            <div className="row mt-1" key={listitem.id}>


                                <div className="col-sm" >
                                    <label className="btn btn-default blue projectname-truncate text-truncate">
                                        <input type="radio" className="toggle"
                                            name="quoteItem" value={listitem.id}
                                            onChange={() => this.onCustomerSelected(listitem)} />
                                        {listitem.name}
                                    </label>

                                </div>

                                <div className="col-sm" >
                                    <label className="description-truncate text-truncate">{listitem.phone}</label>
                                </div>

                                <div className="col-sm" >
                                    <label>{listitem.address}</label>
                                </div>

                                <div className="col-sm" >
                                    <label>{listitem.email}</label>
                                </div>
                                
                                <div className="col-sm" >
                                    <label>{listitem.Quotes}</label>
                                </div>

                            </div>
                        ))}
                </div>
            </div>
        </div>);
    }
    render() {
        return (
            <React.Fragment>
                <Popup popupConfig = {this.state.popupConfig} openFlag = {this.state.isPopupOpen} parentCloseCallback={this.handleClose.bind(this)} parentConfirmCallback = {this.handleModalYes.bind(this)}></Popup>
                {this.state.editCustomerPage ? <EditCustomer selectedItem={this.state.selectedItem} parentCallback={this.parentCallback} /> : this.renderCustomerList()}
            </React.Fragment>
        );
    }
}
export default ManageCustomer;