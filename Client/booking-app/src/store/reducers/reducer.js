import * as actionTypes from '../../store/actions'

const initialState={
    name:'',
    userName:'',
    isLoggedIn:false,
    busId:'',
    booking:'',
    totalFare:'',
    travellers:'',
    txnId:'',
    bookedBus:''
}

const Reducer=(state=initialState,action)=>{
    switch (action.type) {
        case actionTypes.LOGGED_IN:
            return{
                ...state,
                isLoggedIn:action.payload.isLoggedIn,
                name:action.payload.name,
                userName:action.payload.userName
            }

        case actionTypes.BUS_ID:
            return{
                ...state,
                busId:action.payload.busId
            }
        
        case actionTypes.BOOKING:
            return{
                ...state,
                booking:action.payload.booking
            }

        case actionTypes.TOTAL_FARE:
            return{
                ...state,
                totalFare:action.payload.totalFare
            }

        case actionTypes.TRAVELLERS:
            return{
                ...state,
                travellers:action.payload.travellers
            }

        case actionTypes.TXN_ID:
            return{
                ...state,
                txnId:action.payload.txnId
            }
        
        case actionTypes.BOOKED_BUS:
            return{
                ...state,
                bookedBus:action.payload.bookedBus
            }

        default:
            break;
    }
    return state
}

export default Reducer;