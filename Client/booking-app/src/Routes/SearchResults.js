import React from 'react';
import {NavLink} from 'react-router-dom';
import {connect} from 'react-redux';
import * as actionTypes from '../store/actions'

const Buses=(props)=>{
    const busDatum=props.results.availableBuses;
    let data='',dataArray=[];
    for(let i=0;i<busDatum.length;i++){
        dataArray.push(<tr key={`row${i+1}`}><td id={`Sno${i+1}`} key={`Sno${i+1}`}>{i+1}</td>
                            <td id={`busType${i+1}`} key={`busType${i+1}`}>{busDatum[i].busType}</td>
                            <td id={`arrival${i+1}`} key={`arrival${i+1}`}>{busDatum[i].arrivalTime}</td>
                            <td id={`departure${i+1}`} key={`departure${i+1}`}>{busDatum[i].departureTime}</td>
                            <td id={`travelDate${i+1}`} key={`travelDate${i+1}`}>{props.results.travelDetails.travelDate}</td>
                            <td id={`availSeats${i+1}`} key={`availSeats${i+1}`}>{busDatum[i].availability.length}</td>
                            <td id={`fare${i+1}`} key={`fare${i+1}`}>{busDatum[i].fare}</td>
                            <td id={`viewSeats${i+1}`} key={`viewSeatsBtn${i+1}`}>
                                <NavLink to="/bookTickets" ><button id={`viewSeatsBtn${i+1}`} className="btn btn-block btn-success" onClick={()=>{
                                    props.setBusId(busDatum[i]._id);
                                    document.getElementById('viewSeatsIndicator').style.backgroundColor='green';
                                }}>View seats</button></NavLink>
                            </td>
                        </tr>);
        
    }
    data=dataArray.map((item)=>item)
    return(
    <table>
        <thead>
            <tr>
                <th>#</th>
                <th>bus type</th>
                <th>arrival</th>
                <th>departure</th>
                <th>date</th>
                <th>availablility</th>
                <th>fare</th>
                <th>Book tickets</th>
            </tr> 
        </thead>
        <tbody>{data}</tbody>
    </table>)
}

const mapStateToProps=state=>{
    return{
        busId:state.busId
    }
}

const mapDispatchToProps=dispatch=>{
    return{
        setBusId:(busId)=>dispatch({type:actionTypes.BUS_ID,payload:{busId:busId}})
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Buses);