const mongoose=require('mongoose');

const BusTemplate=new mongoose.Schema({
    travelDate:{type:String},
    boardPoint:{type:String},
    endPoint:{type:String},
    busType:{type:String},
    arrivalTime:{type:String},
    departureTime:{type:String},
    availability:{type:Array},
    blockedSeats:{type:Array},
    fare:{type:Number}
});

busData=mongoose.model('bus',BusTemplate);
module.exports=busData;