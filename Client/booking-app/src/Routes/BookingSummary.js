import React, { Component } from 'react';
import axios from "axios";
import {connect} from 'react-redux';
import * as actionTypes from '../store/actions';

let busInfo={};
class BookingSummary extends Component{
    constructor(props){
        super(props)
        this.state={
            fare:0,
            servicetax:75,
            persons:{},
        }
    }
    componentDidMount(){
        axios.post('http://localhost:4000/app/viewSeats',{id:this.props.busId}).then(response=>{
            busInfo=response.data;
            document.getElementById('boardPointSummary').innerHTML=`From      : ${busInfo.boardPoint}`;
            document.getElementById('endPointSummary').innerHTML= `To    : ${busInfo.endPoint}`;
            document.getElementById('DateSummary').innerHTML= `Date     : ${busInfo.travelDate}`;
            document.getElementById('busTypeSummary').innerHTML= `Bus Type  :${busInfo.busType}`;
        }).catch(e=>console.log(e));
        
        setTimeout(()=>{
            this.setState({fare:busInfo.fare})
        },200)
        if(this.props.seats===0){
            document.getElementById('bookingForm').style.display="none"
        }
    }
    componentDidUpdate(){
        if(this.props.seats===0){
            document.getElementById('bookingForm').style.display="none";

        }else{
            document.getElementById('bookingForm').style.display="block"
        }     
    }
    
    submitSeats=(event)=>{
        event.preventDefault();
        const onlyAlpha=/^[a-zA-Z ]+$/;
        const travellersName=[],travellersAge=[],travellersGender=[],travellersSeats=[],status=[];
        let travellers=[]
        this.props.selectedSeats.forEach(item => {
            travellersName.push(`${item}Name`)            
            travellersAge.push(`${item}Age`)            
            travellersGender.push(`${item}Gender`)
            travellersSeats.push(item)
        });
        travellersName.forEach((item)=>{
            if(document.getElementById(item).value.length >= 5 && onlyAlpha.test(document.getElementById(item).value)){
                status.push('ok')
            }
            else{
                alert(`${item} must be of alphabets and min 5 characters`);
            status.pop()
            }
        })
        if(this.props.seats===status.length){ //Ready to upload            
            for(let i=0;i<travellersName.length;i++){
                let genders=document.getElementsByName(`${travellersGender[i]}`),gender;
                for(let j=0;j<genders.length;j++){
                    if(genders[j].checked){
                        gender=genders[j].value
                    }
                }
                travellers.push({
                    seat:travellersSeats[i],
                    name:document.getElementById(travellersName[i]).value,
                    age:document.getElementById(travellersAge[i]).value,
                    gender:gender
                })
            }
            this.props.setTravellers(travellers);
            this.props.setTotalFare((this.state.fare*this.props.seats)+this.state.servicetax);
            this.props.setBooking('started')
            document.getElementById('myAccTab').click();
            setTimeout(()=>{
                document.getElementById('signUpBtn').click();
            },100)
            
        }
        
    }
    render(){
        return(
            <div>
                <h5 id="boardPointSummary" className="ml-5 mt-3">boardPoint Summary</h5>
                <h5 id="endPointSummary" className="ml-5">endPoint Summary</h5>
                <h5 id="DateSummary" className="ml-5">Date Summary</h5>
                <h5 id="busTypeSummary" className="ml-5">Bus Type Summary</h5>
                <form id="bookingForm" onSubmit={this.submitSeats} >
                    <div id="bookingEntries"></div>
                    <h5 id="totalSeatsSummary" className="ml-4">Total Seats <span className="ml-4">: {this.props.seats}</span></h5>
                    <h5 id="fareSummary" className="ml-4">Fare per seat <span className="ml-2">: Rs {this.state.fare}</span></h5>
                    <h5 id="serviceTax" className="ml-4">Service Tax <span className="ml-4">: Rs {this.state.servicetax}</span></h5>
                    <h5 id="totalfareSummary" className="ml-4">Total Amount <span className="">: Rs {(this.state.fare*this.props.seats)+this.state.servicetax}</span></h5>
                    <input id="bookSubmitBtn" type="submit" className="btn btn-success text-capitalize ml-4" value="proceed to payment" />
                </form>
            </div>
        )
    }
}

const mapStateToProps=state=>{
    return{
        busId:state.busId
    }
}

const mapDispatchToProps=dispatch=>{
    return{
        setTravellers:(travellers)=>dispatch({type:actionTypes.TRAVELLERS,payload:{travellers:travellers}}),
        setTotalFare:(totalFare)=>dispatch({type:actionTypes.TOTAL_FARE,payload:{totalFare:totalFare}}),
        setBooking:(booking)=>dispatch({type:actionTypes.BOOKING,payload:{booking:booking}})
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(BookingSummary);