import {
    LOGIN_USERS_FAILURE, LOGIN_USERS_SUCCESS, LOGIN_USERS_LOADING, SIGNUP_USERS_FAILURE, SIGNUP_USERS_LOADING, SIGNUP_USERS_SUCCESS, LOGOUT_USER,
    PARTICIPANT_USER_LOADING, PARTICIPANT_USER_SUCCESS, PARTICIPANT_USER_FAILURE, QUESTION_USER_FAILURE, QUESTION_USER_SUCCESS
    , QUESTION_USER_LOADING,
    EDIT_USER_LOADING,
    EDIT_USER_FAILURE,
    EDIT_USER_SUCCESS
} from './usersActionTypes'


const initialState = {
    isLoading: false,
    err: "",
    payload: {
        type: "",
        _id: "",
        student_id: "",
        password: "",
        name: "",
        twitter: "",
        facebook: "",
        instagram: "",
        linkedin:"",
        editProfile:{isLoading:false,err:''},
        isPresident: "",
        member: [],
        participant: { isLoading:false,payload:[]},
        question: { isLoading:false,err:'',payload:[]},
        token: "",
        message: ""
    }
}


export const UsersReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_USERS_LOADING:
            return { ...state, isLoading: true, payload: { ...state.payload, type: "login" } }
        case LOGIN_USERS_FAILURE:
            return { ...state, isLoading: false, err: action.payload, payload: { ...state.payload, type: "" } }
        case LOGIN_USERS_SUCCESS:
            action.payload.editProfile = {isLoading:false,err:''};
            return { ...state, isLoading: false, err: "", payload: action.payload }
        case SIGNUP_USERS_LOADING:
            return { ...state, isLoading: true, payload: { ...state.payload, type: "signup" } }
        case SIGNUP_USERS_FAILURE:
            return { ...state, isLoading: false, err: action.payload, payload: { ...state.payload, type: "", message: "" } }
        case SIGNUP_USERS_SUCCESS:
            return { ...state, isLoading: false, err: "", payload: { ...state.payload, message: "Sign Up successful,Now Login..." } }
        case LOGOUT_USER:
            return { ...initialState }
        case PARTICIPANT_USER_LOADING:
            return { ...state, payload:{...state.payload,participant:{...state.payload.participant,isLoading:true}} }
        case PARTICIPANT_USER_FAILURE:
            return { ...state, payload:{...state.payload,participant:{...state.payload.participant,isLoading:false}} }
        case PARTICIPANT_USER_SUCCESS:
            var p = state.payload.participant.payload;
            p.push(action.payload)
            return { ...state, payload:{...state.payload,participant: { ...state.payload.participant,isLoading:false,payload: p }} }
        case QUESTION_USER_LOADING:
            return { ...state, payload:{...state.payload,question:{...state.payload.question,isLoading:true}} }
        case QUESTION_USER_FAILURE:
            return { ...state, payload:{...state.payload,question:{...state.payload.question,isLoading:false}} }
        case QUESTION_USER_SUCCESS:
            var qs = state.payload.question.payload;
            qs.push(action.payload)
            return { ...state, payload:{...state.payload,question: { ...state.payload.question,isLoading:false,payload: qs }} }
        case EDIT_USER_LOADING:
            return {...state,payload:{...state.payload,editProfile:{...state.payload.editProfile, isLoading:true}}}
        case EDIT_USER_FAILURE:
            return {...state,payload:{...state.payload,editProfile:{...state.payload.editProfile, isLoading:false}}}
        case EDIT_USER_SUCCESS:
            return {...state,payload:{...state.payload,editProfile:{...state.payload.editProfile, isLoading:false, linkedin:action.payload.linkedin ,facebook:action.payload.facebook ,twitter:action.payload.twitter ,instagram:action.payload.instagram }}}
        default:
            return { ...state }
    }
}
