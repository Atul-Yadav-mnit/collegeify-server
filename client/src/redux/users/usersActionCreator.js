import axios from "axios"
import { LOGIN_USERS_FAILURE, LOGIN_USERS_SUCCESS, LOGIN_USERS_LOADING, SIGNUP_USERS_FAILURE, SIGNUP_USERS_LOADING, SIGNUP_USERS_SUCCESS, LOGOUT_USER, PARTICIPANT_USER_LOADING, PARTICIPANT_USER_SUCCESS, PARTICIPANT_USER_FAILURE, QUESTION_USER_LOADING, QUESTION_USER_SUCCESS, QUESTION_USER_FAILURE, EDIT_USER_FAILURE, EDIT_USER_LOADING, EDIT_USER_SUCCESS } from './usersActionTypes'
import {io} from 'socket.io-client'


export const SigninginUserLoading = () => {
    return ({
        type: LOGIN_USERS_LOADING
    })
}

export const SigninUserSuccess = (user) => {

    
let socket = io("http://localhost:8000") 

    socket.on('connect',() => {
        //alert("Hurray Connected");
    })

    user.member.map((m) => { 
        const payload = {room: m.sid.id,sid:user.student_id};
        socket.emit('join-room',payload);
        // return ({room: m.sid.id,sid:user.student_id});
    } );

    socket.on('join-room' ,(payload) => {
        //console.log("Joined and ",payload);
    })

    user.socket = socket;

    return ({
        type: LOGIN_USERS_SUCCESS,
        payload: user
    })
}


export const SigninUserFailed = (err) => {
    return ({
        type: LOGIN_USERS_FAILURE,
        payload: err
    })
}

export const loginUser = (id, password) => (dispatch) => {
    dispatch(SigninginUserLoading())
    axios.post('http://localhost:8000/users/login', {
        student_id: id,
        password: password
    })
        .then((response) => {
            //console.log(response.data)
            //console.log(response.data._id)
            const user = {
                type: "login",
                _id: response.data.user.self._id,
                student_id: response.data.user.self.student_id,
                password: response.data.user.self.password,
                name: response.data.user.self.password,
                image: response.data.user.self.image,
                twitter: response.data.user.self.twitter,
                facebook: response.data.user.self.facebook,
                instagram: response.data.user.self.instagram,
                isPresident: "",
                member: response.data.user.member,
                participant: { isLoading: false, payload: response.data.user.participant },
                question: { isLoading: false, payload: response.data.user.question },
                token: response.data.token,
                message: "Sign in successful!!!"
            }
            //console.log("user is")
            //console.log(user)
            dispatch(SigninUserSuccess(user))
            //alert(response.data.user)

        })
        .catch((err) => {

            if (err.response) {
                if (err.response.status == 401) {
                    dispatch(SigninUserFailed("Invalid Credentials"))
                }
                else {
                    dispatch(SigninUserFailed("Internal Server error ", err))
                }

            }
            else {
                dispatch(SigninUserFailed(err))
            }

        })
}


export const SignupUserLoading = () => {
    return ({
        type: SIGNUP_USERS_LOADING
    })
}

export const SignupUserSuccess = (user) => {
    return ({
        type: SIGNUP_USERS_SUCCESS,
        payload: user
    })
}

export const SignupUserFailed = (err) => {
    return ({
        type: SIGNUP_USERS_FAILURE,
        payload: err
    })
}

export const signupUser = (name, id, password) => (dispatch) => {
    dispatch(SignupUserLoading())
    axios.post('http://localhost:8000/users/signup', {
        name: name,
        student_id: id,
        password: password
    })
        .then((response) => {
            // //console.log(response)
            dispatch(SignupUserSuccess())
        })
        .catch((err) => {

            if (err.response) {
                if (err.response.status == 500) {
                    dispatch(SignupUserFailed("Duplicate user detected"))
                }
                else {
                    dispatch(SignupUserFailed("Internal Server error with status Code :", err.response.status))
                }

            }
            else {
                dispatch(SignupUserFailed(err))
            }

        })
}


export const Logoutuser = () => {
    return ({
        type: LOGOUT_USER
    })
}


export const ParticipantUserLoading = () => {
    return ({
        type: PARTICIPANT_USER_LOADING
    })
}

export const ParticipantUserSuccess = (user) => {
    return ({
        type: PARTICIPANT_USER_SUCCESS,
        payload: user
    })
}

export const ParticipantUserFailed = () => {
    return ({
        type: PARTICIPANT_USER_FAILURE
    })
}

export const AddParticipantUser = (id, eid, token, name) => (dispatch) => {
    dispatch(ParticipantUserLoading())
    axios.post('http://localhost:8000/participants/user', {
        uid: id,
        eid: eid
    }, {
        headers: {
            'Authorization': 'Bearer ' + token
        }
    })
        .then((response) => {
            dispatch(ParticipantUserSuccess(response.data))
        })
        .catch((err) => {
            alert(err.message + "\nYour application was not successful :(\nTry again")
            dispatch(ParticipantUserFailed())
        })
}



export const QuestionUserLoading = () => {
    return ({
        type: QUESTION_USER_LOADING
    })
}

export const QuestionUserSuccess = (q) => {
    //alert(JSON.stringify(q))
    return ({
        type: QUESTION_USER_SUCCESS,
        payload: q
    })
}

export const QuestionUserFailed = () => {
    return ({
        type: QUESTION_USER_FAILURE
    })
}

export const AddQuestionUser = (uid, eid, token, ques) => (dispatch) => {
    dispatch(QuestionUserLoading())
    axios.post('http://localhost:8000/questions/user/' + uid, {
        uid: uid,
        eid: eid,
        question: ques
    }, {
        headers: {
            'Authorization': 'Bearer ' + token
        }
    })
        .then((response) => {
            //console.log("ooooo", response.data)
            alert("Posted Successfully:)\nSoon an event manager will answer it ?")
            dispatch(QuestionUserSuccess(response.data))
        })
        .catch((err) => {
            alert(err.message + "\nYour post was not successful :(\nTry again")
            dispatch(QuestionUserFailed())
        })
} 


export const EditUserLoading = () => {
    return ({
        type: EDIT_USER_LOADING
    })
}


export const EditUserSuccess = (q) => {
    //alert(JSON.stringify(q))
    return ({
        type: EDIT_USER_SUCCESS,
        payload: q

    })
}

export const EditUserFailed = () => {
    return ({
        type: EDIT_USER_FAILURE
    })
}


export const EditProfile = (twitter,facebook,instagram,linkedin,token,uid) => (dispatch) => {
    dispatch(EditUserLoading())
    const body = {}
    if(twitter!='')
    {
        body.twitter = twitter
    }
    if(facebook!='')
    {
        body.facebook = facebook
    }
    if(instagram!='')
    {
        body.instagram = instagram
    }
    if(linkedin!='')
    {
        body.linkedin = linkedin
    }
    axios.put('http://localhost:8000/users/user/',body,{
        headers: {
            'Authorization': 'Bearer ' + token
        }
    })
    .then((response) => {
        // alert("Profile Updated, Kindly login again")
        const body = {
            twitter:response.data.twitter,
            instagram:response.data.instagram,
            facebook:response.data.facebook,
            linkedin:response.data.linkedin,
        }
       
            dispatch(EditUserSuccess(body))
       // //console.log(response)
    })
    .catch((err) => {
       //console.log (err)
        alert("Error: ",err.message)
        dispatch(EditUserFailed())
    })
}