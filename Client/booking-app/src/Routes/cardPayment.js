import React, { Component } from 'react';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';
import LoadingGif from '../asserts/images/cardType/paymentLoading.gif';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import * as actionTypes from '../store/actions';

class CardPayment extends Component{
    constructor(props){
        super(props)
        this.state={
            cardType:false,
            cardNo:false,
            nameOnCard:false,
            cvv:false,
            expMonth:false,
            expYear:false,
            loading:false
        }
    }
    Validator=(event)=>{
        let key = event.target.name,value = event.target.value;
        const onlyAlpha=/^[a-zA-Z ]+$/;
        switch (key) {
            case 'cardType':
                if(value!=='none'){
                    this.setState({cardType:true},function(){
                        if(this.state.cardType){
                            document.querySelector('#cardTypeDiv p').innerHTML='';
                            document.querySelector('#cardTypeDiv select').style.border='2px solid green';
                        }
                    })
                }else {this.setState({cardType:false},function(){
                    if(!this.state.cardType){
                        document.querySelector('#cardTypeDiv p').innerHTML='Please select card type';
                        document.querySelector('#cardTypeDiv select').style.border='2px solid red';
                    }
                })}
                break;
            case 'cardNo':
                if(Number(value) && value.trim().length===16){
                    this.setState({cardNo:true},function(){
                        if(this.state.cardNo){
                            document.querySelector('#cardNoDiv p').innerHTML='';
                            document.querySelector('#cardNoDiv input').style.border='2px solid green'
                        }
                    })
                }else {this.setState({cardNo:false},function(){
                    if(!this.state.cardNo){
                        document.querySelector('#cardNoDiv p').innerHTML='Card number should be 16 digits and contains number only'
                        document.querySelector('#cardNoDiv input').style.border='2px solid red'
                    }
                })}
                    break;
            case 'nameOnCard':
                if(onlyAlpha.test(value)&&value.trim().length!==0){
                    this.setState({nameOnCard:true},function(){
                        if(this.state.nameOnCard){
                            document.querySelector('#nameOnCardDiv p').innerHTML='';
                            document.querySelector('#nameOnCardDiv input').style.border='2px solid green';
                        }
                    })
                }else {this.setState({nameOnCard:false},function(){
                    if(!this.state.nameOnCard){
                        document.querySelector('#nameOnCardDiv p').innerHTML='Name should contain only alphabets';
                        document.querySelector('#nameOnCardDiv input').style.border='2px solid red';
                    }
                })}
                break;
            case 'cvv':
                if(Number(value)&&value.trim().length===3){
                    this.setState({cvv:true},function(){
                        if(this.state.cvv){
                            document.querySelector('#cvvDiv p').innerHTML='';
                            document.querySelector('#cvvDiv input').style.border='2px solid green';
                        }
                    })
                }else {this.setState({cvv:false},function(){
                    if(!this.state.cvv){
                        document.querySelector('#cvvDiv p').innerHTML='CVV should be 3 digits and contains number only'
                        document.querySelector('#cvvDiv input').style.border='2px solid red';
                    }
                })}
                break;
            case 'expMonth':
                if(value!=='none'){
                    this.setState({expMonth:true},function(){
                        if(this.state.expMonth){
                            document.querySelector('#errMonth').innerHTML='';
                            document.querySelector('#expMonth').style.border='2px solid green';
                        }
                    })
                }else {this.setState({expMonth:false},function(){
                    if(!this.state.expMonth){
                        document.querySelector('#errMonth').innerHTML='Please select month';
                        document.querySelector('#expMonth').style.border='2px solid red';
                    }
                })}
                break;
            case 'expYear':
                if(value!=='none'){
                    this.setState({expYear:true},function(){
                        if(this.state.expYear){
                            document.querySelector('#errYear').innerHTML='';
                            document.querySelector('#expYear').style.border='2px solid green';
                        }
                    })
                }else {this.setState({expYear:false},function(){
                    if(!this.state.expYear){
                        document.querySelector('#errYear').innerHTML='Please select year';
                        document.querySelector('#expYear').style.border='2px solid red';
                    }
                })}
                break;
            default:
                break;
        }
    }
    componentDidMount(){
        document.getElementById('payBtn').disabled=true;
    }
    componentDidUpdate(){
        if(this.state.cardType&&this.state.cardNo&&this.state.nameOnCard&&this.state.cvv&&this.state.expMonth&&this.state.expYear){
            document.getElementById('payBtn').disabled=false
        }else document.getElementById('payBtn').disabled=true
    }
    submitter=async(event)=>{
        event.preventDefault();
        this.handleShow()
        setTimeout(() => {
            this.props.history.push('/ticketConfirmation')
            document.getElementById('ticketConfirmationIndicator').style.backgroundColor='green';
        }, 5000);
        const travellers=this.props.travellers;
        const blocked=[];let bus='';
        travellers.forEach(item=>{blocked.push(item.seat)})
        await axios.post('http://localhost:4000/app/updateAvailabilty',{id:this.props.busId,blocked:blocked}).then(response=>{this.props.SetBookedBus(response.data);bus=response.data}).catch(e=>console.log(e))
        await axios.post('http://localhost:4000/app/bookings',{travellersData:travellers,txnId:this.props.txnId,travelDate:bus.travelDate,boardPoint:bus.boardPoint,endPoint:bus.endPoint,bookedBy:this.props.userName}).then(response=>console.log(response.data))
    }
    handleClose=()=>{this.setState({loading:false})}
    handleShow=()=>{this.setState({loading:true})}
    render(){
        return(
            <div>
                <form id="cardPaymentForm" onSubmit={this.submitter}>
                    <div id="cardTypeDiv">
                        <select id="cardType" name="cardType" onClick={this.Validator}>
                            <option value="none">Select card type</option>
                            <option value="mastercard">Mastercard</option>
                            <option value="visacard">Visa</option>
                            <option value="Maestro">Maestro</option>
                        </select>
                        <p></p>
                    </div>
                    <div id="cardNoDiv">
                        <input type="text" name="cardNo" placeholder="Enter card number (16 digits)" onChange={this.Validator} required />
                        <p></p>
                    </div>
                    <div id="nameOnCardDiv">
                        <input type="text" name="nameOnCard" placeholder="Name on the card" required onChange={this.Validator} />
                        <p></p>
                    </div>
                    <div id="cvvDiv">
                        <input type="text" name="cvv" placeholder="CVV (last 3 digits)" required onChange={this.Validator} />
                        <p></p>
                    </div>
                    <div id="expDateDiv">
                        <label>Expiry Date</label>
                        <select id="expMonth" name="expMonth" onClick={this.Validator} onChange={this.Validator}>
                            <option value="none">Month</option>
                            <option value="01">01</option>
                            <option value="02">02</option>
                            <option value="03">03</option>
                            <option value="04">04</option>
                            <option value="05">05</option>
                            <option value="06">06</option>
                            <option value="07">07</option>
                            <option value="08">08</option>
                            <option value="09">09</option>
                            <option value="10">10</option>
                            <option value="11">11</option>
                            <option value="12">12</option>
                        </select>
                        <select id="expYear" name="expYear" onClick={this.Validator} onChange={this.Validator}>
                            <option value="none">Year</option>
                            <option value="2022">2022</option>
                            <option value="2023">2023</option>
                            <option value="2024">2024</option>
                            <option value="2025">2025</option>
                            <option value="2026">2026</option>
                            <option value="2027">2027</option>
                            <option value="2028">2028</option>
                            <option value="2029">2029</option>
                            <option value="2030">2030</option>
                        </select>
                        <p id="errMonth"></p>
                        <p id="errYear"></p>
                    </div>
                    <div>
                        <input id="payBtn" type="submit" className="btn btn-success"value="Pay Now"/>
                    </div>
                </form>
                <Modal centered show={this.state.loading} onHide={this.handleClose} style={{backgroundColor: 'rgba(0, 0, 0, 0.75)'}} ><img src={LoadingGif} alt="loading" /></Modal>
            </div>
        )
    }
}

const mapStateToProps=state=>{
    return{
        travellers:state.travellers,
        busId:state.busId,
        txnId:state.txnId,
        userName:state.userName
    }
}

const mapDispatchToProps=dispatch=>{
    return{
        SetBookedBus:(bus)=>dispatch({type:actionTypes.BOOKED_BUS,payload:{bookedBus:bus}})
    }
}

const CardPaymentContainer=withRouter(CardPayment)

export default connect(mapStateToProps,mapDispatchToProps)(CardPaymentContainer) ;

