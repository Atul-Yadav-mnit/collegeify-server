import { EVENTS_FAILED, EVENTS_LOADING, EVENTS_SUCCESS, EVENT_FAILED, EVENT_LOADING, EVENT_SUCCESS, POST_EVENT_FAILED, POST_EVENT_LOADING, POST_EVENT_SUCCESS} from "./eventsActionTypes";
import { events } from "./events";

export const eventsReducer = (state = events,action) => {
    switch(action.type){
        case EVENTS_LOADING:
            return {...state,isLoading:true}
        case EVENTS_SUCCESS:
            return {...state,isLoading:false,payload:action.payload}
        case EVENTS_FAILED:
            return {...state,isLoading:false,err:action.payload}
        default:
            return {...state}
    }
} 


export const eventReducer = (state = events,action) => {
    switch(action.type){
        case EVENT_LOADING:
            return {...state,isLoading:true}
        case EVENT_SUCCESS:
            return {...state,isLoading:false,payload:action.payload}
        case EVENT_FAILED:
            return {...state,isLoading:false,err:action.payload}
        default:
            return {...state}
    }
} 


export const PosteventReducer = (state = {
    isLoading:false}
,action) => {
    switch(action.type){
        case POST_EVENT_LOADING:
            return {...state,isLoading:true}
        case POST_EVENT_SUCCESS:
            return {...state,isLoading:false}
        case POST_EVENT_FAILED:
            return {...state,isLoading:false}
        default:
            return {...state}
    }
}