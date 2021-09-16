import React, { Component } from 'react';

import jsonData from "../../data/operationsData.json";
import AdminService from "../services/admin.service";

class WorkerOperations extends Component {
    state = {
        searchValue: "",
        listitems: jsonData.operationsList,
        selectedItem: [],
        editOperationPage: false
    }
    constructor(props) {
        super(props);
        //this.getAllOperationList();
    }
    getAllOperationList() {
        AdminService.getAllOperations().then(
            response => {
                this.setState({
                    listitems: response.data.operations
                });
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
   
    onOperationSelected(selectedItem) {
        this.setState({
            selectedItem: selectedItem
        });
    }
    parentCallback = () => {
        this.setState({
            selectedItem: []
        });
        this.setState({
            editOperationPage:false
          });
    }
    renderOperationsList() {
        return(
            <div className="col admin-list-page" id="operations-page">
                    <div className="list-group-header section-header row">

                        <div className="col-4">
                            <span className="mb-1 underline">Manage</span>
                            <span className="mb-1 blue-color pl-2">Operations</span>
                        </div>

                        <div className="col-8 text-right">
                            <div className="has-search">
                                <span className="fa fa-search form-control-feedback"></span>
                                <input type="text" className="form-control search-box" placeholder="Search quote requests..." onChange={this.handleSearchChange.bind(this)} />
                            </div>
                        </div>
                    </div>
                    <div className="quote-req-list">
                        <div className="row mt-1 quote-req-header">
                            <div className="col-sm">
                                <label>Operation Name</label>
                            </div>
                            <div className="col-sm">
                                <label>Description</label>
                            </div>
                            <div className="col-sm">
                                <label>Start Date</label>
                            </div>
                            <div className="col-sm">
                                <label>End Date</label>
                            </div>
                            <div className="col-sm">
                                <label>Hours Commited</label>
                            </div>
                            <div className="col-sm">
                                <label>Hours Left</label>
                            </div>
                            <div className="col-sm">
                                <label>Status</label>
                            </div>
                        </div>
                        <div className="quote-req-table">

                           {this.state.listitems.filter(item =>
                                item.o_name.toLowerCase().includes(this.state.searchValue)).map(listitem => (

                                    <div className="row mt-1" key={listitem.id}>
                                        <div className="col-sm" >
                                            <label className="btn btn-default blue projectname-truncate text-truncate">
                                                <input type="radio" className="toggle"
                                                    name="operationItem" value={listitem.id}
                                                    onChange={() => this.onOperationSelected(listitem)} />
                                                {listitem.o_name}
                                            </label>
                                            
                                        </div>
                                        <div className="col-sm" >
                                            <label className="description-truncate text-truncate">{listitem.o_desc}</label>
                                        </div>
                                        <div className="col-sm" >
                                            <label>{listitem.createdAt}</label>
                                        </div>
                                        <div className="col-sm" >
                                            <label>{listitem.updatedAt}</label>
                                        </div>
                                        <div className="col-sm" >
                                            <label>{listitem.hoursCommited}</label>
                                        </div>
                                        <div className="col-sm" >
                                            <label>{listitem.hoursLeft}</label>
                                        </div>
                                        <div className="col-sm" >
                                            <label>{listitem.status}</label>
                                        </div>
                                    </div>
                                ))}
                        </div>
                    </div>
                </div>
        );
    }
    render() {
        return (
            <React.Fragment>
                {this.renderOperationsList()}
            </React.Fragment>
        );
    }
}
export default WorkerOperations;