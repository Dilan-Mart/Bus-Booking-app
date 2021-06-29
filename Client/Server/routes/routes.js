const { response, request } = require('express');
const express=require('express');
const router=express.Router();
const bcrypt=require('bcrypt');
const userData=require('../models/signUpModel.js');
const busData=require('../models/searchBusModel.js');
const bookingsData=require('../models/BookingsModel.js')

router.post('/signUpData',async (request,response)=>{
    
    const saltPassword=await bcrypt.genSalt(10);
    const securePassword=await bcrypt.hash(request.body.password,saltPassword);
    
    const signedUpUser= new userData({
        fullName:request.body.fullName,
        email:request.body.email,
        password:securePassword,
        gender:request.body.gender,
        dob:request.body.dob,
        mobile:request.body.mobile
    })
    const doesExist = await userData.exists({email:signedUpUser.email});
    if(!doesExist){
        signedUpUser.save().then(response.send(`\nHi ${signedUpUser.fullName} !\nYour account has been created.\nPlease login now`)).catch(error=>console.log(error))
    }
    else{
        response.send(`\nHi ${signedUpUser.fullName} !\nThis email is already in use\nPlease sign-up with another email id`)
    }
});

router.post('/loginData',async (request,response)=>{
    const doesExist=await userData.findOne({email:request.body.loginUsername});
    if(doesExist){
        const password=request.body.loginPassword;
        const passwordCheck=await bcrypt.compareSync(request.body.loginPassword,doesExist.password)
        if(passwordCheck){
            response.send({message:'\nLogin Sucessful',fullName:doesExist.fullName})
        }else{
            response.send({message:`\nSorry ${doesExist.fullName}\nIncorrect Password`,fullName:doesExist.fullName})
        }
        response.send(passwordCheck)
    }else{response.send({message:"\nInvalid Username"})}
})

/*Bus Data routes start here*/
//This to send manually the data to db
router.post('/busDataSend',(request,response)=>{
    const enteredBusData=new busData({
        travelDate:request.body.travelDate,
        boardPoint:request.body.boardPoint,
        endPoint:request.body.endPoint,
        busType:request.body.busType,
        arrivalTime:request.body.arrivalTime,
        departureTime:request.body.departureTime,
        availability:request.body.availability,
        fare:request.body.fare
    })
    enteredBusData.save().then(response=>console.log(response)).catch(e=>console.log(e))
})

router.post('/searchBus',async(request,response)=>{
    const doesExist=await busData.exists({travelDate:request.body.travelDate,boardPoint:request.body.boardPoint,endPoint:request.body.endPoint});
    if(doesExist){
        const buses=await busData.find({travelDate:request.body.travelDate,boardPoint:request.body.boardPoint,endPoint:request.body.endPoint});
        response.send(buses);
    }else{
        response.send("No")
    }
})

router.post('/blockedSeats',async(request,response)=>{
    const blockedSeats=await busData.findById({_id:request.body.id},{blockedSeats:true});
    response.send(blockedSeats)
})

router.post('/viewSeats',async(request,response)=>{
    let chosenBus=await busData.findById({_id:request.body.id});
    response.send(chosenBus)
})

router.post('/bookings',(request,response)=>{
    let travellersData=[];
    for(let i=0;i<request.body.travellersData.length;i++){
        travellersData.push({
            seat:request.body.travellersData[i].seat,
            name:request.body.travellersData[i].name,
            age:request.body.travellersData[i].age,
            gender:request.body.travellersData[i].gender
        })
    }
    const bookedData=new bookingsData({
        travellersData:travellersData,
        travelDate:request.body.travelDate,
        boardPoint:request.body.boardPoint,
        endPoint:request.body.endPoint,
        bookedBy:request.body.bookedBy,
        txnId:request.body.txnId
    })
    bookedData.save().then(response=>console.log(response)).catch(e=>console.log(e))
})

router.post('/updateAvailabilty',async(request,response)=>{
    const availableSeats=await busData.findById({_id:request.body.id},{availability:true})
    const blockedSeats=await busData.findById({_id:request.body.id},{blockedSeats:true})
    const blocked=request.body.blocked;
    blockedSeats.blockedSeats=blockedSeats.blockedSeats.concat(blocked);
    blocked.forEach(element => {
        let index=availableSeats.availability.indexOf(element);
        if(index>-1){
            availableSeats.availability.splice(index,1)
        }        
    });
    const foundBus=await busData.findByIdAndUpdate({_id:request.body.id},{"$set":{availability:availableSeats.availability,blockedSeats:blockedSeats.blockedSeats}});
    const selectedBus=await busData.findById({_id:request.body.id})
    response.send(selectedBus)
})

module.exports=router;