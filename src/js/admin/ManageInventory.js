import React, { Component } from 'react';

import Popup from "../components/Popup";
import { validationMessages } from '../common/Constants';

import EditInventory from './EditInventory';
import AdminService from "../services/admin.service";

class ManageInventory extends Component {
    state = {
        searchValue: "",
        listitems: [],
        selectedItem: [],
        editInventoryPage: false,
        popupConfig: {},
        isPopupOpen: false
    }
    constructor(props) {
        super(props);
        this.getAllInventoryList();
    }
    getAllInventoryList() {
        AdminService.getAllInventory().then(
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
    };

    handleModalYes = () => {
        this.setState({
            isPopupOpen: false
        });
        AdminService.deleteInventory(this.state.selectedItem.id).then(
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

    };

    editInventory() {
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
                editInventoryPage: true
            });
        }
    }
    addInventory() {
        this.setState({
            selectedItem: []
        });
        this.setState({
            editInventoryPage: true
        });
    }
    deleteInventory() {
        /* var tempList = this.state.listitems.filter(item => item.id !== this.state.selectedItem.id);
        this.setState({
            listitems: tempList
        });
        */
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
                    body:"Are you sure you want to delete "+this.state.selectedItem.itemName,
                    type: "confirmation"
                }
            });
        }
    }
    onInventorySelected(selectedItem) {
        this.setState({
            selectedItem: selectedItem
        });
    }
    parentCallback = () => {
        this.setState({
            editInventoryPage:false
          });
    }
    renderInventoryList() {
        return (<div className="col admin-list-page">
            <div className="list-group-header section-header row">
                <div className="col-4">
                    <span className="mb-1 underline">Manage</span>
                    <span className="mb-1 blue-color pl-2">Inventory</span>
                </div>
                <div className="col-8 text-right">
                    <div className="has-search">
                        <span className="fa fa-search form-control-feedback"></span>
                        <input type="text" className="form-control search-box" placeholder="Search quote requests..." onChange={this.handleSearchChange.bind(this)} />
                    </div>
                    <button className="btn delete-btn" onClick={() => this.deleteInventory()}></button>
                    <button className="btn edit-btn" onClick={() => this.editInventory()}></button>
                    <button className="btn add-btn" onClick={() => this.addInventory()}></button>
                </div>
            </div>
            <div className="quote-req-list">
                <div className="row mt-1 quote-req-header">
                    <div className="col-sm">
                        <label>Item Name</label>
                    </div>
                    <div className="col-sm">
                        <label>Description</label>
                    </div>
                    <div className="col-sm">
                        <label>Availability</label>
                    </div>
                    <div className="col-sm">
                        <label>Operations Taged</label>
                    </div>
                    <div className="col-sm">
                        <label>Cost</label>
                    </div>
                    <div className="col-sm">
                        <label>Created On</label>
                    </div>
                    <div className="col-sm">
                        <label>Modified On</label>
                    </div>
                </div>
                <div className="quote-req-table">
                {this.state.listitems && this.state.listitems.filter(item =>
                        item.itemName.toLowerCase().includes(this.state.searchValue)).map(listitem => (
                    

                        <div className="row mt-1" key={listitem.id}>
                            
                            
                            <div className="col-sm" >
                                <label className="btn btn-default blue projectname-truncate text-truncate">
                                    <input type="radio" className="toggle"
                                        name="quoteItem" value={listitem.id}
                                        onChange={() => this.onInventorySelected(listitem)} />
                                    {listitem.itemName}
                                </label>
                                            
                            </div>



                            <div className="col-sm" >
                                <label className="description-truncate text-truncate">{listitem.itemDesc}</label>
                            </div>
                            <div className="col-sm" >
                                <label>{listitem.availability}</label>
                            </div>
                            <div className="operation-div col-sm" >

                           
        <label className="operation-text-truncate">{listitem.operations_tagged}</label>
        <span className="badge badge-light float-right">{listitem.operations_tagged && listitem.operations_tagged.length}</span>
        
      

                                
                            
                                </div>
                            <div className="col-sm" >
                                <label>{listitem.cost}</label>
                            </div>
                            <div className="col-sm" >
                                <label>{(new Date(listitem.createdAt)).toLocaleDateString()}</label>
                            </div>
                            <div className="col-sm" >
                                <label>{(new Date(listitem.updatedAt)).toLocaleDateString()}</label>
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
                {this.state.editInventoryPage ? <EditInventory selectedItem={this.state.selectedItem} parentCallback= {this.parentCallback}/> : this.renderInventoryList()}
            </React.Fragment>
        );
    }
}
export default ManageInventory;