import React, { Component } from 'react';

import Header from '../common/Header';
import Footer from '../common/Footer';

import Popup from "../components/Popup";

import QuoteList from './QuoteList';
import Quote from './Quote';
import QuoteDetail from './QuoteDetail' ;

import UserService from "../services/user.service";

class Dashboard extends Component {
    state = {
        isQuoteDetailActive:false,
        quoteItem : null,
        selectedQuoteId: null,
        popupConfig: {},
        isPopupOpen: false
     }
     selectedOuoteItem = (childData) =>{
        if(childData !== undefined){
            this.getSingleQuote(childData.id);
        } else {
            this.setState({
                isQuoteDetailActive:false,
                isQuoteEditActive: false
              });
        }
        
    }

    handleClose = () => {
      this.setState({
          isPopupOpen: false
      });
    }

    getSingleQuote = (id) => {
      UserService.getSingleQuote(id).then(
            response => {
              if(response) {
                  this.setState({
                    isQuoteDetailActive:true,
                    isQuoteEditActive: false,
                    quoteItem: response.data
                    
                  });


                }
            },
            error => {
              console.log("Error");
            }
          );   
    };

    quoteEdit = () => {
        this.setState({
            isQuoteEditActive:true
          });
    }
    quoteCreateCallBack = (response) => {
      var quoteItem = response.data;
      quoteItem['Measures'] = quoteItem.measures;
      this.setState({
          isQuoteDetailActive:true,
          isQuoteEditActive: false,
          quoteItem: quoteItem
      });


      this.setState({
        isPopupOpen: true,
        popupConfig : {
            header: "Message",
            body:response.message,
            type: "message"
        }
      });

    }
    render() {
        return (  
            <React.Fragment>
                <Popup popupConfig = {this.state.popupConfig} openFlag = {this.state.isPopupOpen} parentCloseCallback={this.handleClose.bind(this)}></Popup>
                 <Header/>
                 <div className="page-body row">
                    <div className="col">
                        <QuoteList parentCallback = {this.selectedOuoteItem}/>
                    </div>
                    <div className="col">
                        {!this.state.isQuoteDetailActive ? <Quote parentCreateCallBack = {this.quoteCreateCallBack}/> : null }  
                        {this.state.isQuoteDetailActive ? <QuoteDetail isQuoteEditActive = {this.state.isQuoteEditActive} parentEditCallBack = {this.quoteEdit} dataFromParent = {this.state.quoteItem} parentCallback = {this.selectedOuoteItem}/> : null }
                    </div>
                </div>
                <Footer></Footer>
            </React.Fragment>
        );
    }
}
export default Dashboard;