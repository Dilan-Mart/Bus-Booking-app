const mongoose=require('mongoose')

const BookingsTemplate=new mongoose.Schema({
    travellersData:[{
        seat:{type:String},
        name:{type:String},
        age:{type:String},
        gender:{type:String}
    }],
    travelDate:{type:String,required:true},
    boardPoint:{type:String,required:true},
    endPoint:{type:String,required:true},
    bookedBy:{type:String,required:true},
    txnId:{type:String,required:true}
});

bookingsData=mongoose.model('bookings',BookingsTemplate);
module.exports=bookingsData;