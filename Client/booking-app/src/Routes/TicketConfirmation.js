import React from 'react';
import {connect} from 'react-redux';

const TicketConfirmation=(props)=>{
    const bus=props.bookedBus;
    const totalFare=props.totalFare;
    let travellersData=[],tickets;
    const travellers=props.travellers;
    for(let i=0;i<travellers.length;i++){
        travellersData.push(
                <tr key={`row${i+1}`}>
                    <td key={`sno${i+1}`}>{i+1}</td>
                    <td key={travellers[i].seat}>{travellers[i].seat}</td>
                    <td key={travellers[i].name}>{travellers[i].name}</td>
                    <td key={travellers[i].age}>{travellers[i].age}</td>
                    <td key={travellers[i].gender}>{travellers[i].gender}</td>
                </tr>
        )
        tickets=travellersData.map((item)=>item)
    }

    return(
        <div>
            <div id="ticketConfirmDiv">
                <table id="ticketTable">
                    <thead>
                        <tr>
                            <th className="text-primary" colSpan="4">Your Ticket has been booked successfully. Please find your ticket details below</th>
                            <th className="text-center" colSpan="3">Txn id:<span className="text-info"> {props.txnId}</span> </th>
                        </tr>
                        <tr>
                            <th>Bus type</th>
                            <th>Place of boarding</th>
                            <th>Place of Destination</th>
                            <th>Date of travel</th>
                            <th>Departure time</th>
                            <th>Arrival time</th>
                            <th>Amount paid</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{bus.busType}</td>
                            <td>{bus.boardPoint}</td>
                            <td>{bus.endPoint}</td>
                            <td>{bus.travelDate}</td>
                            <td>{bus.departureTime}</td>
                            <td>{bus.arrivalTime}</td>
                            <td>&#8377; {totalFare}</td>
                        </tr>
                    </tbody>
                </table>
                <table id="passengerTable">
                    <thead>
                        <tr>
                            <th>S.No</th>
                            <th>Seat</th>
                            <th>Passenger name</th>
                            <th>Passenger age</th>
                            <th>Passenger gender</th>
                        </tr>
                    </thead>
                    <tbody>{tickets}</tbody>
                </table>
            </div>
            <div id="backHomeDiv"><button id="backHomeBtn" onClick={()=>{props.history.push('/')}} className="btn btn-warning btn-block">Back to home</button></div>
        </div>
        )
}

const mapStateToProps=state=>{
    return{
        bookedBus:state.bookedBus,
        totalFare:state.totalFare,
        txnId:state.txnId,
        travellers:state.travellers
    }
}

export default connect(mapStateToProps)(TicketConfirmation);