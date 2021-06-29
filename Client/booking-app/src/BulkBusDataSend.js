const axios =require('axios');

const locations=["Bangalore","Chennai","Coimbatore","Mangalore","Mumbai","Pune","Noida","Hyderabad","Kochi","Kolkata"];
const BUSTYPE=['Luxura A/C Sleeper(2+1)','Volvo Multi-Axle(2+1)','Capella A/C Sleeper(2+1)','Bharat Benz A/C Sleeper(2+1)','Scania A/C Sleeper(2+1)'];
const arrTime=['06:00 AM','07:00 AM','08:00 AM','04:00 AM','05:00 AM'];
const deptTime=['09:00 PM','07:00 PM','08:00 PM','10:00 PM','11:00 PM'];
const fareList=[700,900,1100,1300];

let date,seats=[];
for(let a=1;a<=10;a++){seats.push(`LD${a}`)}
for(let a=11;a<=15;a++){seats.push(`LS${a}`)}
for(let a=16;a<=25;a++){seats.push(`UD${a}`)}
for(let a=26;a<=30;a++){seats.push(`US${a}`)}

for(let d=12;d<=31;d++){
    date=`03/${d}/2021`;
    for(let i=0;i<locations.length;i++){
        for (let j=0;j<locations.length;j++){
            if(i!==j){
                axios.post("http://localhost:4000/app/busDataSend",{
                    travelDate:date,
                    boardPoint:locations[i],
                    endPoint:locations[j],
                    busType: BUSTYPE[Math.floor(Math.random()*BUSTYPE.length)],
                    arrivalTime: arrTime[Math.floor(Math.random()*arrTime.length)],
                    departureTime: deptTime[Math.floor(Math.random()*deptTime.length)],
                    availability:seats,
                    fare: fareList[Math.floor(Math.random()*fareList.length)]
                });
            }
        }
        
    }
}
console.log("completed");