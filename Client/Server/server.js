const express=require('express')
const app=express();
const mongoose=require('mongoose');
const cors=require('cors');
const routesUrls=require('./routes/routes');

mongoose.connect('mongodb://127.0.0.1:27017/MFRP',{
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify:false,
    useCreateIndex:true
});
mongoose.connection.on('connected',()=>{console.log("Mongoose connected to DB")})

app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(cors());
app.use('/app',routesUrls);
app.listen(4000,()=>console.log("Server started"))