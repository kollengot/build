import React, { Component } from 'react';
import { Table } from 'reactstrap';

import Checkbox from "../components/Checkbox";
import TableRow from "../components/TableRow";
import TableHeader from "../components/TableHeader";
import AdminService from "../services/admin.service";
import MyAlert from "../components/MyAlert";

class ConfigureOperation extends Component {

    constructor(props) {
        super(props);
        this.state = {
            listitems: [],
            toolList: [],
            workerList: [],
            searchValue: "",
            selectedToolList: [],
            selectedWorkerList: [],
            showAlert: false,
            alertConfig: {
                "variant": "danger"
            },
            totalCost: 0
        }    
        this.getData();
    }

    getData() {
        if(this.props.showTools) {
            this.getAllTools();
        }
        if(this.props.showWorkers) {
            this.getAllWorkers();
        }
    }

    getAllTools() {
        AdminService.getAllInventory().then(
            response => {
                this.setState({
                    toolList: response.data.rows
                });
            },
            error => {
                console.log("Error");
            }
        );
    }

    getAllWorkers() {
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
    }

    showAlertMessage(msg) {
        this.setState(prevState => ({
            alertConfig: { 
                ...prevState.alertConfig,
                message: msg
            },
            showAlert: true 
        }))
    }

    handleCheckboxChange = changeEvent => {
        const { name } = changeEvent.target;
        let obj =[]; obj["Inventories"] = this.state.toolList.find(o => o.id == name);
        obj["req_quantity"] = this.state.toolList.find(o => o.id == name).req_quantity;

        if(!this.state.toolList.find(o => o.id == name).req_quantity){
            this.showAlertMessage("Please add required quantity");
            changeEvent.target.checked = false;
        }
        else {
            
            this.setState({
                showAlert: false
            });
            if (changeEvent.target.checked) {
                this.state.selectedToolList.push(obj);
                var tmpCost = this.state.totalCost + (obj.Inventories.cost * obj.Inventories.req_quantity);
                this.setState({
                    totalCost: tmpCost
                });
            } else {
                let tmpObj = this.state.selectedToolList.filter(item => item.id !== name);
                this.state.selectedToolList = tmpObj;
                var tmpCost = this.state.totalCost - (obj.Inventories.cost * obj.Inventories.req_quantity);
                this.setState({
                    totalCost: tmpCost
                });
            }
        }
    };

    handleWorkerCheckboxChange = changeEvent => {

        const { name } = changeEvent.target;
        let obj =[]; obj["Workers"]= this.state.workerList.find(item => item.id == name);
        obj["total_hrs_req"] = this.state.workerList.find(item => item.id == name).total_hrs_req;

        if(!this.state.workerList.find(o => o.id == name).total_hrs_req){
            this.showAlertMessage("Please add required hours");
            changeEvent.target.checked = false;
        }
        else {
            this.setState({
                showAlert: false
            });

            if (changeEvent.target.checked) {
                this.state.selectedWorkerList.push(obj)
                var tmpCost = this.state.totalCost + (obj.Workers.cost_per_hr * obj.Workers.total_hrs_req);
                this.setState({
                    totalCost: tmpCost
                });

            } else {
                let tmpObj = this.state.selectedWorkerList.filter(item => item.id != name);
                this.state.selectedWorkerList = tmpObj;
                var tmpCost = this.state.totalCost - (obj.Workers.cost_per_hr * obj.Workers.total_hrs_req);
                this.setState({
                    totalCost: tmpCost
                });
            }
        }
    };

    reqQntyChange = changeEvent => {
        const { name } = changeEvent.target;
        let obj =[]; obj = this.state.toolList;
        let sObj = []; sObj = this.state.selectedToolList;
        if(obj.find(o => o.id == name)) {
            obj.find(o => o.id == name)['req_quantity'] = changeEvent.target.value;
        }
        if(sObj.find(o => o.Inventories.id == name)) {
            sObj.find(o => o.Inventories.id == name)['req_quantity'] = changeEvent.target.value;
        }
        this.setState({
            toolList: obj,
            selectedToolList: sObj
        });
    };
    reqHourChange = changeEvent => {
        const { name } = changeEvent.target;
        
        let obj =[]; obj = this.state.workerList;
        let sObj = []; sObj = this.state.selectedWorkerList;
        if(obj.find(o => o.id == name)) {
            obj.find(o => o.id == name)['total_hrs_req'] = changeEvent.target.value;
        }
        if(sObj.find(o => o.Workers.id == name)) {
            sObj.find(o => o.Workers.id == name)['total_hrs_req'] = changeEvent.target.value;
        }
        this.setState({
            workerList: obj,
            selectedWorkerList: sObj
        }); 
    };

    createToolRow = option => (
        <TableRow
            type="tool"
            listItem={option}
            onCheckboxChange={this.handleCheckboxChange}
            onreqQntyChange = {this.reqQntyChange}
        />
    );

    createWorkerCheckbox = option => (
        <TableRow
            type="worker"
            listItem={option}
            onCheckboxChange={this.handleWorkerCheckboxChange}
            onreqQntyChange = {this.reqHourChange}
        />
    );
    createTableHeader = (type) => {
        var tableHeader = [];
        if (type === "tool") {
            tableHeader = ["inputCheckbox", "Tool Name", "Available Quantity", "Required Quantity", "Cost"];
            return (
                <TableHeader
                    headerObj={tableHeader}
                    onCheckboxChange={this.handleCheckboxChange}
                />
            );
        } else if ("worker") {
            tableHeader = ["inputCheckbox", "Worker Name", "Available per Day", "Cost per Hour", "Required Hours"];
            return (
                <TableHeader
                    headerObj={tableHeader}
                    onCheckboxChange={this.handleWorkerCheckboxChange}
                />
            );
        }
    };
    createToolList = () => (
        this.state.toolList.filter(item => item.itemName.toLowerCase().includes(this.state.searchValue)).map(this.createToolRow)
    );
    createWorkerList = () => (
        this.state.workerList.filter(item => item.name.toLowerCase().includes(this.state.searchValue)).map(this.createWorkerCheckbox)
    );
    saveConfigOperation(e) {
        var selectedObj = {};
        selectedObj['tools'] = this.state.selectedToolList;
        selectedObj['workers'] = this.state.selectedWorkerList;
        selectedObj['totalCost'] = this.state.totalCost;
        this.props.popupClose(selectedObj);
    };

    render() {
        return (
            <React.Fragment>
                
                {this.props.showTools && <div>
                    <span className="underline blue">Add Tools</span>
                    <Table responsive="sm">
                        <tbody>
                            {this.createTableHeader("tool")}
                            {this.createToolList()}
                        </tbody>
                    </Table>
                    </div>
                }
                {this.props.showWorkers && 
                <div>
                    <span className="underline blue">Add Worker</span>

                    <Table responsive="sm">
                        <tbody>
                            {this.createTableHeader("worker")}
                            {this.createWorkerList()}
                        </tbody>
                    </Table>

                </div>
                }
                <button onClick={this.saveConfigOperation.bind(this)} className="btn btn-success btn-sm" > Save </button>

                {this.state.showAlert && < MyAlert alertConfig = {this.state.alertConfig} showAlert={this.state.showAlert} /> }

            </React.Fragment>
        );

    }
}
export default ConfigureOperation;