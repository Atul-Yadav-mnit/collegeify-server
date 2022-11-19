import { societiesPayload } from "./societies"
import { SOCIETIES_FAILED, SOCIETIES_LOADING, SOCIETIES_SUCCESS, SOCIETY_FAILED, SOCIETY_LOADING, SOCIETY_SUCCESS } from "./societiesActionTypes"
import axios from 'axios'
import { showToast } from "../../components/showToastComponent"

export const SocietiesLoading = () => {
    return ({
        type: SOCIETIES_LOADING
    })
}

export const SocietiesSuccess = (societies) => {
    return ({
        type: SOCIETIES_SUCCESS,
        payload: societies
    })
}

export const SocietiesFailed = (err) => {
    return ({
        type: SOCIETIES_FAILED,
        payload: err
    })
}

export const FetchSocieties = () => (dispatch) => {
    dispatch(SocietiesLoading())
    axios('/societiess')
        .then((response) => {
            // console.log(response.data)
            // alert("Hi")
            dispatch(SocietiesSuccess(response.data))
        })
        .catch((err) => {
            // alert(err)
            //console.log(err)
          showToast('error','Network error!')
            dispatch(SocietiesFailed(err.message))
        })
}

export const SocietyLoading = () => {
    return ({
        type: SOCIETY_LOADING
    })
}

export const SocietySuccess = (society) => {
    return ({
        type: SOCIETY_SUCCESS,
        payload: society
    })
}

export const SocietyFailed = (err) => {
    return ({
        type: SOCIETY_FAILED,
        payload: err
    })
}

export const FetchSociety = (sid) => (dispatch) => {
    dispatch(SocietyLoading());
    axios(`/societiess/${sid}`)
        .then((response) => {
            dispatch(SocietySuccess(response.data))
        })
        .catch((err) => {
            // alert(err)
            //console.log(err)
            showToast('error','Network error!')
            dispatch(SocietyFailed(err.message))
        })
}


