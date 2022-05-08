import { questions } from "./question";
import { QUESTIONS_FAILED, QUESTIONS_LOADING, QUESTIONS_SUCCESS } from "./questionActionTypes";

const initialState = {
    isLoading: false,
    payload:"",
    err:""
}



export const questionsReducer = (state = initialState,action) => {
    switch(action.type){
        case QUESTIONS_LOADING:
            return {...state,isLoading:true,err:''}
        case QUESTIONS_SUCCESS:
            return {...state,isLoading:false,payload:action.payload,err:''}
        case QUESTIONS_FAILED:
            return {...state,isLoading:false,err:action.payload}
        default:
            return{...state}
    }
}