import React, { Component } from 'react';

import Dropdown from 'react-bootstrap/Dropdown';


import { Button, ButtonGroup } from 'reactstrap';
import LogoImage from '../../images/Logo.png';
import Popup from "../components/Popup";

class Header extends Component {
    state = {
        popupConfig: {},
        isPopupOpen: false,
        isListOpen: false
    }
    constructor(props) {
        super(props);
    }
    handleClose = (list) => {
        this.setState({
            isPopupOpen: false
        });
    }
    logOut() {
        this.toggleList();
        localStorage.removeItem("user");
    }
    toggleList = () => {
        this.setState(prevState => ({
            isListOpen: !prevState.isListOpen
        }))
    }

    showProfile() {
        this.toggleList();
        this.setState({
            isPopupOpen: true,
            popupConfig: {
                header: "Manage Profiile",
                body: "",
                type: "profile"
            }
        });
    }
    render() {
        return (
            <React.Fragment>
                <div className="page-header sticky-top">
                    <img className="logo-header" alt="Logo" src={LogoImage} />
                    <div className="float-right">
                        

                        
                        <div className="dd-wrapper" >
                        <span >{JSON.parse(localStorage.getItem('user')).userName}</span>

                            <div className="dd-header d-inline-block" onClick={this.toggleList}>
                                <div className="dd-header-title">{JSON.parse(localStorage.getItem('user')).userName}</div>
                            </div>
                            {this.state.isListOpen && <div className="dd-list">
                                <a className="dropdown-item" onClick={() => this.showProfile()}>Profile</a>
                                <a href="/" onClick={() => this.logOut()} className="dropdown-item">Logout</a>
                            </div>
                            }
                        </div>



                    </div>
                </div>
                <Popup popupConfig={this.state.popupConfig} openFlag={this.state.isPopupOpen} parentCloseCallback={this.handleClose}></Popup>
            </React.Fragment>
        );
    }
}
export default Header;


/**
 *
 *
 *
 <span>{JSON.parse(localStorage.getItem('user')).userName}</span>
                        <a href="/" onClick={() => this.logOut()}>dfds</a>





<Dropdown>
  <Dropdown.Toggle variant="success" id="dropdown-basic">
    {JSON.parse(localStorage.getItem('user')).userName}
  </Dropdown.Toggle>

  <Dropdown.Menu>
    <Dropdown.Item onClick={() => this.showProfile()}>Profile</Dropdown.Item>
                                <Dropdown.Item href="/" onClick={() => this.logOut()}>Logout</Dropdown.Item>
    </Dropdown.Menu>
</Dropdown>

<Dropdown as={ButtonGroup}>
                            <Button >{JSON.parse(localStorage.getItem('user')).userName}</Button>
                            <Dropdown.Toggle split variant="info" id="dropdown-split-basic" />
                            <Dropdown.Menu>
                                <Dropdown.Item onClick={() => this.showProfile()}>Profile</Dropdown.Item>
                                <Dropdown.Item href="/" onClick={() => this.logOut()}>Logout</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
 */