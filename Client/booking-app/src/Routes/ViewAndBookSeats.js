import axios from 'axios';
import React,{useState} from 'react';
import driverIcon from '../asserts/images/driverIcon.png';
import BookingSummary from './BookingSummary';
import {connect} from 'react-redux';

let blockedSeats=[],selectedSeats=new Set();

const ViewTickets=(props)=>{
    const [seat,setSeat]=useState(0);
    const SelectTheSeat=(event)=>{
        if(document.getElementById(event.target.id).style.backgroundColor==="skyblue"){ //un-selection event
            document.getElementById(event.target.id).style.backgroundColor="white";
            setSeat(seat-1);
            selectedSeats.delete(event.target.id)
            document.getElementById(`${event.target.id}BookTicket`).remove();
        }else if(document.getElementById(event.target.id).style.backgroundColor==="red"){
            alert(`${event.target.id} is already blocked/booked`)
        }else{                                                                          //selection event
            document.getElementById(event.target.id).style.backgroundColor="skyblue";
            setSeat(seat+1);
            selectedSeats.add(event.target.id);
            const entrytemplate=`<fieldset id="${event.target.id}BookTicket" className="mt-2"><legend>Seat no: ${event.target.id}</legend><input id="${event.target.id}Name" type="text" className="personName mr-2" placeholder="Name" required /><input id="${event.target.id}Age" type="number" min="1" max="100" className="personAge mr-2" placeholder="Age"  required /><input type="radio" name="${event.target.id}Gender" value="male" id="${event.target.id}Male"  required /><label htmlFor="${event.target.id}Male" className="mr-2">Male</label><input type="radio" name="${event.target.id}Gender" value="female" id="${event.target.id}Female"  required /><label htmlFor="${event.target.id}Female">Female</label></fieldset>`
            document.getElementById('bookingEntries').innerHTML+=entrytemplate;
        }
        
    }
    axios.post('http://localhost:4000/app/blockedSeats',{id:props.busId}).then(response=>blockedSeats=response.data.blockedSeats).catch(e=>console.log(e));
    setTimeout(() => {    
        for(let i=0;i<blockedSeats.length;i++){
            if(document.getElementById(blockedSeats[i])){
                document.getElementById(blockedSeats[i]).style.backgroundColor='red';
    }}}, 200);
    
    return(
    <div id="viewSeatsPage" className="d-md-flex">
        <div id="totalSeats">
            <div className="includeDriver d-md-flex">
                <div className="driverIconDiv"><img id="driverIcon" alt="driverSeat" src={driverIcon}/></div>
                <div id="lowerBerth">
                    <p className="text-uppercase w-100 text-center font-weight-bold text-info">Lower Berth</p>
                    <div id="LD1" onClick={SelectTheSeat} className="cot">LD1</div>
                    <div id="LD2" onClick={SelectTheSeat} className="cot">LD2</div>
                    <div id="LD3" onClick={SelectTheSeat} className="cot">LD3</div>
                    <div id="LD4" onClick={SelectTheSeat} className="cot">LD4</div>
                    <div id="LD5" onClick={SelectTheSeat} className="cot">LD5</div>
                    <div id="LD6" onClick={SelectTheSeat} className="cot">LD6</div>
                    <div id="LD7" onClick={SelectTheSeat} className="cot">LD7</div>
                    <div id="LD8" onClick={SelectTheSeat} className="cot">LD8</div>
                    <div id="LD9" onClick={SelectTheSeat} className="cot">LD9</div>
                    <div id="LD10" onClick={SelectTheSeat} className="cot">LD10</div>
                    <div id="LS11" onClick={SelectTheSeat} className="cot singleCot">LS11</div>
                    <div id="LS12" onClick={SelectTheSeat} className="cot singleCot">LS12</div>
                    <div id="LS13" onClick={SelectTheSeat} className="cot singleCot">LS13</div>
                    <div id="LS14" onClick={SelectTheSeat} className="cot singleCot">LS14</div>
                    <div id="LS15" onClick={SelectTheSeat} className="cot singleCot">LS15</div>
                </div>
            </div>
            
            <div className="includeDriver d-md-flex">
                <div className="driverIconDiv"></div>
                <div id="upperBerth">
                    <p className="text-uppercase w-100 text-center font-weight-bold text-primary">Upper Berth</p>
                    <div id="UD16" onClick={SelectTheSeat} className="cot">UD16</div>
                    <div id="UD17" onClick={SelectTheSeat} className="cot">UD17</div>
                    <div id="UD18" onClick={SelectTheSeat} className="cot">UD18</div>
                    <div id="UD19" onClick={SelectTheSeat} className="cot">UD19</div>
                    <div id="UD20" onClick={SelectTheSeat} className="cot">UD20</div>
                    <div id="UD21" onClick={SelectTheSeat} className="cot">UD21</div>
                    <div id="UD22" onClick={SelectTheSeat} className="cot">UD22</div>
                    <div id="UD23" onClick={SelectTheSeat} className="cot">UD23</div>
                    <div id="UD24" onClick={SelectTheSeat} className="cot">UD24</div>
                    <div id="UD25" onClick={SelectTheSeat} className="cot">UD25</div>
                    <div id="US26" onClick={SelectTheSeat} className="cot singleCot">US26</div>
                    <div id="US27" onClick={SelectTheSeat} className="cot singleCot">US27</div>
                    <div id="US28" onClick={SelectTheSeat} className="cot singleCot">US28</div>
                    <div id="US29" onClick={SelectTheSeat} className="cot singleCot">US29</div>
                    <div id="US30" onClick={SelectTheSeat} className="cot singleCot">US30</div>
                </div>
            </div>
        </div>
        <div id="bookingSummary">
            <fieldset id="summaryField">
                <legend className="text-capitalize">booking summary</legend>
                <BookingSummary seats={seat} selectedSeats={selectedSeats} />
            </fieldset>
        </div>
    </div>
    )
}

const mapStateToProps=state=>{
    return{
        busId:state.busId
    }
}

export default connect(mapStateToProps)(ViewTickets);