import React, { Component } from 'react';
import {NavLink} from 'react-router-dom';
import logo from '../asserts/images/logo.jpg';
import * as actionTypes from '../store/actions';
import {connect} from 'react-redux';


class BasePage extends Component{

    render(){
        return(
            <div id="headerContent" className="container-fluid text-light">
                <div className="pt-2">
                    <div className="logoDiv d-flex mb-2">
                        <img id="logo" src={logo} className="rounded-circle" alt="logo"/>
                        <h2 className="appName text-warning ml-2 pt-1">i<b className="text-danger">GOT</b>it</h2>
                    </div>
                    <p className="font-italic ml-2">Online bus reservation app<span className="text-success font-weight-bold ml-1">made for you</span></p>
                    <div>
                        <NavLink activeClassName="selected" id="homeTab" className="headerNavLink mr-2 mr-sm-5" exact to="/">Home</NavLink>
                        <NavLink activeClassName="selected" id="myAccTab" className="headerNavLink mr-2 mr-sm-5" to="/account">{this.props.isLoggedIn?this.props.name:'My Account'}</NavLink>
                        <NavLink activeClassName="selected" id="contactTab" className="headerNavLink" to="/contact" >Contact Us</NavLink>
                    </div>
                    <div className="row mt-2">
                        <div id="planJourneyIndicator" className="col-sm-3">Plan Journey</div>
                        <div id="viewSeatsIndicator" className="col-sm-3">View Seats</div>
                        <div id="paymentIndicator" className="col-sm-3">Payment</div>
                        <div id="ticketConfirmationIndicator" className="col-sm-3">Ticket Confirmation</div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps=state=>{
    return{
        name:state.name,
        isLoggedIn:state.isLoggedIn
    }
}

const mapDispatchToProps=dispatch=>{
    return{
        loginStatus:()=>dispatch({type:actionTypes.LOGGED_IN,payload:{isLoggedIn:true,name:'Jesus'}}),
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(BasePage);