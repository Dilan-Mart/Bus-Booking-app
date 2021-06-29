import axios from 'axios';
import React, { Component } from 'react';
import DatePick from './DatePicker';
import Buses from './SearchResults.js'
import interArrow from '../asserts/images/interchangeArrow.png'


let options;
class PlanJourney extends Component{
    constructor(){
        super()
        this.state={
            locations:["Bangalore","Chennai","Coimbatore","Mangalore","Mumbai","Pune","Noida","Hyderabad","Kochi","Kolkata"],
            travelDetails:{travelDate:'',boardPoint:'',endPoint:'',returnDate:''},
            availableBuses:''
        }
    }
    chooseLocation=()=>{
        let locations=this.state.locations;
        options=locations.map((item)=><option value={item} key={item}>{item}</option>);
        return options       
    }
    locationValid=(event)=>{
        if(document.getElementById('sourceSelect').value === document.getElementById('destinationSelect').value){
            alert("\nSource and Destination can't be same.\nTry another location");
            document.getElementById(event.target.id).value=event.target.id==='sourceSelect'?'from':'to'
        }
    }
    planJourneyData=()=>{
        const travelData={
            travelDate:document.getElementById('startDatePicker').value,
            boardPoint:document.getElementById('sourceSelect').value,
            endPoint:document.getElementById('destinationSelect').value,
            // returnDate:document.getElementById('returnDatePicker').value
        }
        this.setState({travelDetails:{
            travelDate:travelData.travelDate,boardPoint:travelData.boardPoint,endPoint:travelData.endPoint,returnDate:travelData.returnDate
        }})
        if(travelData.boardPoint==="from" || travelData.endPoint==='to' || travelData.travelDate.length===0){
            alert("Please fill the mandatory fields");console.log(travelData.returnDate==='')
        }else {
            axios.post('http://localhost:4000/app/searchBus',travelData)
        .then(response=>{
            this.setState({availableBuses:response.data})
            if(response.data==='No'){
                alert(`Sorry there are no buses available from ${this.state.travelDetails.boardPoint} to ${this.state.travelDetails.endPoint}`);
                document.getElementById('resultsWindow').style.display="none";
                document.getElementById('planJourneyIndicator').style.backgroundColor="black";
            }else {
                document.getElementById('resultsWindow').style.display="block";
                document.getElementById('planJourneyIndicator').style.backgroundColor="green";
            }
            
        }).catch(e=>console.log(e));
        
    };
        
    }

    render(){
        return(
            <div id="planJourney">
                <div id="journeyInputs" className="d-md-flex">
                    <div id="sourceLocationDiv" className="">
                        <select className="rounded text-capitalize" id="sourceSelect" name="sourceLocation" onClick={this.check} onChange={this.locationValid}>
                            <option value="from">from*</option>
                            {this.chooseLocation()}
                        </select>
                    </div>
                    <img src={interArrow} alt="interchanger" onClick={()=>{
                        if(document.getElementById('sourceSelect').value!=='from'&&document.getElementById('destinationSelect').value!=='to'){
                            const newSource=document.getElementById('destinationSelect').value;
                            document.getElementById('destinationSelect').value=document.getElementById('sourceSelect').value;
                            document.getElementById('sourceSelect').value=newSource;
                        }
                    }}/>
                    <div id="destinationLocationDiv" className="">
                        <select className="rounded text-capitalize" id="destinationSelect" name="destinationLocation" onClick={this.check} onChange={this.locationValid}>
                            <option value="to">to*</option>
                            {this.chooseLocation()}
                        </select>
                    </div>
                    <div id="startDateDiv" className="">
                        <DatePick placeholder={'start date*'} id={'startDatePicker'} className="rounded text-capitalize" minDate={new Date()} maxDate={new Date("03/31/2021")} />
                    </div>
                    {/* <div id="returnDateDiv" className="" >
                        <DatePick placeholder={'return date(optional)'} id={'returnDatePicker'} className="rounded text-capitalize" minDate={new Date()} maxDate={new Date("03/31/2021")} />
                    </div> */}
                    <div>
                        <button id="planBtn" className="btn btn-info text-capitalize rounded" onClick={this.planJourneyData}>plan journey</button>
                    </div>
                </div>
                <div id="resultsWindow" className="text-capitalize">
                    <h3 className="text-primary p-2">select bus</h3>
                    <Buses results={this.state} />
                </div>
            </div>
        )}
        }
export default PlanJourney;