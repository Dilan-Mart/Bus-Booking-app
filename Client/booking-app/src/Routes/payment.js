import React from 'react';
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import notAvailableImage from '../asserts/images/notAvailable.jpg';
import CardPayment from './cardPayment';
import maestro from '../asserts/images/cardType/maestro.png';
import mastercard from '../asserts/images/cardType/mastercard.png';
import visa from '../asserts/images/cardType/visa.png';
import {connect} from 'react-redux';
import * as actionTypes from '../store/actions';

const txn=Math.random().toString(34).slice(-8);
const Payment=(props)=>{
    props.setTxnId()
    return(
    <div id='paymentDiv' className="mx-auto my-md-5 w-75" >
        <h1>Payment</h1>
        <h5 className="d-block text-right">Amount payable : Rs {props.totalFare}<span className="ml-5">Txn number : {props.txnId}</span></h5>
        <Accordion>
            <Card>
                <Accordion.Toggle as={Card.Header} eventKey="0" className="font-weight-bold text-white bg-success" ><div>Credit / Debit Card<img className="ml-2 my-auto float-right" src={mastercard}alt="card"/><img className="ml-2 my-auto float-right" src={maestro}alt="card"/><img className="ml-2 my-auto float-right" src={visa}alt="card"/></div></Accordion.Toggle>
                <Accordion.Collapse eventKey="0">
                    <Card.Body>
                        <CardPayment />
                    </Card.Body>
                </Accordion.Collapse>
            </Card>
            <Card>
                <Accordion.Toggle as={Card.Header} eventKey="1" className="font-weight-bold text-white bg-dark" >UPI</Accordion.Toggle>
                <Accordion.Collapse eventKey="1">
                    <Card.Body>
                        <img src={notAvailableImage} alt="notAvailableImage" />
                        <h5>Currently this facility is not available. Check it out next time you visit.</h5>
                    </Card.Body>
                </Accordion.Collapse>
            </Card>
            <Card>
                <Accordion.Toggle as={Card.Header} eventKey="2" className="font-weight-bold text-white bg-dark" >Pay on Spot</Accordion.Toggle>
                <Accordion.Collapse eventKey="2">
                    <Card.Body>
                        <img src={notAvailableImage} alt="notAvailableImage" />
                        <h5>Currently this facility is not available. Check it out next time you visit.</h5>
                    </Card.Body>
                </Accordion.Collapse>
            </Card>
        </Accordion>
        <button onClick={()=>{if(window.confirm('Are you sure you want to cancel the whole process')){props.history.push('/');}}} className="btn btn-danger close py-2 mt-5">Cancel Booking Process</button>
    </div>
    )
}

const mapStateToProps=state=>{
    return{
        totalFare:state.totalFare,
        txnId:state.txnId
    }
}
const mapDispatchToProps=dispatch=>{
    return{
        setTxnId:()=>dispatch({type:actionTypes.TXN_ID,payload:{txnId:txn}})
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Payment);