import { combineReducers } from "redux"
import { eventReducer, eventsReducer, PosteventReducer } from "../events/eventsReducer";
import { societiesReducer, societyReducer } from "../societies/societiesReducer"
import { createForms } from 'react-redux-form'
import { contact_form_state } from "../forms/contactUs";
import { caraouselsReducer } from "../caraousels/caraouselsReducer";
import { UsersReducer } from "../users/usersReducer";
import { questionsReducer } from "../questions/questionReducer";

const rootReducer =  combineReducers({
    societies: societiesReducer,
    society: societyReducer,
    events: eventsReducer,
    event : eventReducer,
    questions:questionsReducer,
    caraousels:caraouselsReducer,
    user:UsersReducer,
    postEvent:PosteventReducer,
    ...createForms({
        contactUs : contact_form_state,
    })
})


export default rootReducer;