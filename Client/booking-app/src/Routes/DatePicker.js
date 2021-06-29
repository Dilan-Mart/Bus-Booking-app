import React,{useState} from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'

const DatePick=(props)=>{
    const [date,selectDate]=useState(null);
    return(
        <DatePicker selected={date} onChange={date=>selectDate(date)} minDate={props.minDate} maxDate={props.maxDate} className={props.className} placeholderText={props.placeholder} id={props.id} required={props.required} />
    )
}

export default DatePick;