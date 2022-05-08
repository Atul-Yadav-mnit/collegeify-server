import { societies, society } from "./societies";
import { SOCIETIES_FAILED, SOCIETIES_LOADING, SOCIETIES_SUCCESS ,SOCIETY_FAILED,SOCIETY_LOADING,SOCIETY_SUCCESS} from "./societiesActionTypes";

export const societiesReducer = (state = societies,action) => {
    switch(action.type){
        case SOCIETIES_LOADING:
            return {...state,isLoading:true}
        case SOCIETIES_SUCCESS:
            return {...state,isLoading:false,payload:action.payload}
        case SOCIETIES_FAILED:
            return {...state,isLoading:false,err:action.payload}
        default:
            return {...state}
    }
} 



export const societyReducer = (state = society,action) => {
    switch(action.type){
        case SOCIETY_LOADING:
            return {...state,isLoading:true}
        case SOCIETY_SUCCESS:
            return {...state,isLoading:false,payload:action.payload}
        case SOCIETY_FAILED:
            return {...state,isLoading:false,err:action.payload}
        default:
            return {...state}
    }
} 