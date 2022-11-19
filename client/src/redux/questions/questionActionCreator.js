import { QUESTIONS_FAILED, QUESTIONS_LOADING, QUESTIONS_SUCCESS } from "./questionActionTypes"
import axios from 'axios'
import { questions } from "./question"
import { showToast } from "../../components/showToastComponent"


export const QuestionsLoading = () => {
    return({
        type: QUESTIONS_LOADING
    })
}

export const QuestionsSuccess = (societies) => {
    return({
        type: QUESTIONS_SUCCESS,
        payload: societies
    })
}

export const QuestionsFailed = (err) => {
    return({
        type: QUESTIONS_FAILED,
        payload: err
    })
}

export const FetchQuestions = (eid) => (dispatch) => {
    
        dispatch(QuestionsLoading());
        axios.get('/questions/events/'+eid)
        .then((response) => {
           // console.log("Questions is "+response)
            const qs = response.data.filter((res) => res.answer=='')
            dispatch(QuestionsSuccess(qs))
        })
        .catch((err) => {
            showToast('error','Network error!')
            dispatch(QuestionsFailed(err.message))
        })
}


export const AnswerQuestion = (eid,qid,ans,token) => (dispatch) => {
    
    dispatch(QuestionsLoading());
    axios.put('/questions/question/'+qid,{
        answer : ans
    },{
        headers: {
            'Authorization': 'Bearer ' + token
        }
    })
    .then((response) => {
        // alert("MmY")
        // console.log(response)
        // alert("Answer Submitted successfully")
        showToast('success','Answer Submitted successfully!')
        dispatch(FetchQuestions(eid))
    })
    .catch((err) => {
        showToast('error',`Network error!`)
        dispatch(QuestionsFailed(err.message))
    })
} 
