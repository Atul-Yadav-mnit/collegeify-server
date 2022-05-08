import { CARAOUSELS_FAILED,CARAOUSELS_LOADING,CARAOUSELS_SUCCESS} from './caraouselsActionTypes';

export const caraouselsReducer = (state = {
    isLoading: true,
    err: '',
    payload:''
},action) => {
    switch(action.type){
        case CARAOUSELS_LOADING:
            return {...state,isLoading:true}
        case CARAOUSELS_SUCCESS:
            return {...state,isLoading:false,payload:action.payload}
        case CARAOUSELS_FAILED:
            return {...state,isLoading:false,err:action.payload}
        default:
            return {...state}
    }
} 