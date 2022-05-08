import axios from "axios"
import { CARAOUSELS_FAILED,CARAOUSELS_LOADING,CARAOUSELS_SUCCESS} from "./caraouselsActionTypes"
import {caraouselItems} from '../../shared/caraousel'


export const CaraouselsLoading = () => {
    return({
        type: CARAOUSELS_LOADING
    })
}

export const CaraouselsSuccess = (societies) => {
    return({
        type: CARAOUSELS_SUCCESS,
        payload: societies
    })
}

export const CaraouselsFailed = (err) => {
    return({
        type: CARAOUSELS_FAILED,
        payload: err
    })
}

export const FetchCaraousels = () => (dispatch) => {
        dispatch(CaraouselsLoading())
        axios('http://localhost:8000/caraousels')
        .then((response) => {
            // console.log(response.data)
            // alert("Hi")
            dispatch(CaraouselsSuccess(response.data))
        })
        .catch((err) => { 
            alert(err)
           // console.log(err) 
        dispatch(CaraouselsFailed(err.message)) } )
        // dispatch(CaraouselsLoading());
        // dispatch(CaraouselsSuccess(caraouselItems))
}
