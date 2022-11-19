import axios from "axios"
import { showToast } from "../../components/showToastComponent"
import { EVENTS_FAILED, EVENTS_LOADING, EVENTS_SUCCESS, EVENT_FAILED, EVENT_LOADING, EVENT_SUCCESS, POST_EVENT_FAILED, POST_EVENT_LOADING, POST_EVENT_SUCCESS } from "./eventsActionTypes"


export const EventsLoading = () => {
    return ({
        type: EVENTS_LOADING
    })
}

export const EventsSuccess = (events) => {
    return ({
        type: EVENTS_SUCCESS,
        payload: events
    })
}

export const EventsFailed = (err) => {
    return ({
        type: EVENTS_FAILED,
        payload: err
    })
}

export const FetchEvents = (sid) => (dispatch) => {
    dispatch(EventsLoading());
    axios.get('/events/society/' + sid)
        .then((response) => {
            const eves = response.data.map((eve) => {
                return ({
                    event_id: eve._id,
                    event_name: eve.name,
                    society: eve.society._id,
                    society_name:eve.society.name,
                    applyBefore: eve.applyBefore,
                    eventDate: eve.eventDate,
                    eventLocation: eve.location,
                    image: eve.image,
                    managers: [{ "name": eve.event_manager1.name, "student_id": eve.event_manager1.student_id }, { "name": eve.event_manager2.name, "student_id": eve.event_manager2.student_id }],
                    member: eve.member,
                    description: eve.description,
                })
            })

            dispatch(EventsSuccess(eves))
        })
        .catch((err) => dispatch(EventsFailed(err.message)))
}


export const EventLoading = () => {
    return ({
        type: EVENT_LOADING
    })
}

export const EventSuccess = (event) => {
    return ({
        type: EVENT_SUCCESS,
        payload: event
    })
}

export const EventFailed = (err) => {
    return ({
        type: EVENT_FAILED,
        payload: err
    })
}

export const FetchEvent = (eid) => (dispatch) => {
    dispatch(EventLoading());
    axios.get('/events/event/' + eid)
        .then((response) => {
            const eve = response.data;
            const ansques = eve.questions.filter((q) => q.answer != '');
            const eveques = ansques.map((ques) => {
                return ({
                    qid: ques._id,
                    ques: ques.question,
                    ans: ques.answer
                })
            })
            const event = {
                event_id: eve._id,
                event_name: eve.name,
                society: eve.society.name,
                applyBefore: eve.applyBefore,
                eventDate: eve.eventDate,
                eventLocation: eve.location,
                image: eve.image,
                managers: [{ "name": eve.event_manager1.name, "student_id": eve.event_manager1.student_id }, { "name": eve.event_manager2.name, "student_id": eve.event_manager2.student_id }],
                member: eve.member,
                description: eve.description,
                questions: eveques
            }
           // console.log("event is")
            //console.log(event)
            dispatch(EventSuccess(event))
        })
        .catch((err) => {
            showToast('error','Network Error!')
            dispatch(EventFailed(err.message))
        })


}


export const PostEventLoading = () => {
    return ({
        type: POST_EVENT_LOADING
    })
}

export const PostEventSuccess = (societies) => {
    return ({
        type: POST_EVENT_SUCCESS,
        payload: societies
    })
}

export const PostEventFailed = (err) => {
    return ({
        type: POST_EVENT_FAILED,
        payload: err
    })
}

export const AddEvent = (event_name ,event_location,manager1,manager2,date_of_event,last_date_to_apply,poster,member,description,token,sid) => (dispatch) => {
   dispatch(PostEventLoading())
    const body  = {
        name: event_name,
        society :sid,
        applyBefore : last_date_to_apply,
        eventDate : date_of_event.toString().substring(0,11),
        location : event_location,
        image :"assets/img/portfolio/4.jpg",
        manager1 : manager1,
        manager2 : manager2,
        member:member=="member",
        description:description
    }

    axios.post('/events/society/'+sid, body, {
        headers: {
            'Authorization': 'Bearer ' + token
        }
    })
    .then((response) => {
        if(response.data._id!='')
        {
            // alert("Event Posted successfully")
            showToast('success','Event Posted successfully!')
            dispatch(PostEventSuccess())
        }
    })
    .catch((err) => {
        // alert(err.message)
        showToast('error','Network Error!')
        dispatch(PostEventFailed())
    })
}