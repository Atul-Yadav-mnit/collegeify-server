import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { FetchEvent } from '../redux/events/eventsActionCreator.js';
import {  Link} from 'react-router-dom'
import { baseUrl } from '../shared/baseURL.js'
import { Loading } from './LoadingComponent.js';
import {AddParticipantUser, AddQuestionUser} from '../redux/users/usersActionCreator'
import {Form,Input,Button} from 'reactstrap'




const EventPageComponent = ({ sid, eid }) => {


  const event = useSelector(state => state.event)
  const user = useSelector(state => state.user)
  const dispatch = useDispatch()

  var query = '';

  const handlePost = (event) => {
   //alert(query.value)
   dispatch(AddQuestionUser(user.payload.student_id,eid,user.payload.token,query.value))
   event.preventDefault();

}

  useEffect(() => {
    dispatch(FetchEvent(eid))
  }, [])


  const handleApply = () => {
    dispatch(AddParticipantUser(user.payload.student_id,event.payload.event_id,user.payload.token))
  }

  var display = "Hi"

  if (event.isLoading == true) {
    display = <div>
      <Loading />
    </div>
  }
  else if (event.payload != '') {



    const apply = () => {
      const a = user.payload.participant.payload.filter((e) => e.eid._id === event.payload.event_id).length
      if (a != 0) {
        return (<button type="button" class="btn btn-info btn-rounded " style={{ "color": "white" }} disabled >Applied!</button>);
      }
      if (user.payload._id != '') {
        const x = event.payload.member;
    const y = user.payload.member.filter((s) => s.sid === event.payload.society).length
    var btn =   <button type="button" class="btn btn-info btn-rounded "  onClick= {handleApply} style={{ "color": "white" }}>One click apply</button>;
        if(user.payload.participant.isLoading)
        {
          btn = <Loading/>
        }
        if (x == false) {
          if (y == 0) {
            return (btn);
          }
          else {
            return (<button type="button" class="btn btn-info btn-rounded " style={{ "color": "white" }} disabled>Sorry the event is not for members!</button>);
          }
        }
        else {
         
          if (y == 1) {
            return (btn);
          }
          else {
            return <button type="button" class="btn btn-info btn-rounded " style={{ "color": "white" }} disabled>Sorry the event is for members only!</button>
          }
        }
      }
      else {
        return (<button type="button" class="btn btn-info btn-rounded " style={{ "color": "white" }} disabled>Login to apply!</button>);
      }
    }

    

    

    const Event = <div>
      <div id="about" className="about-area area-padding">
        <div className="container">
          <div className="row">
            <div className="col-md-12 col-sm-12 col-xs-12">
              <div className="section-headline text-center">
                <h2>{event.payload.event_name}</h2>
              </div>
            </div>
          </div>
          <div className="row">
            {/* <!-- single-well start--> */}
            <div className="col-md-6 col-sm-6 col-xs-12">
              <div className="well-left">
                <div className="single-well">
                  <a href="#">
                    <img src={baseUrl + event.payload.image} alt="" />
                  </a>
                </div>
              </div>
            </div>
            {/* <!-- single-well end--> */}
            <div className="col-md-6 col-sm-6 col-xs-12">
              <div className="well-middle">
                <div className="single-well">
                  <h4 className="sec-head">{event.payload.event_name}</h4>
                  <p>
                    {event.payload.description}
                  </p>
                  <ul>
                    <li>
                      <i className="bi bi-check sec-head"></i> Apply Before: {event.payload.applyBefore}
                    </li>
                    <li>
                      <i className="bi bi-check sec-head"></i> Event Date: {event.payload.eventDate}
                    </li>
                    <li>
                      <i className="bi bi-check sec-head"></i> Event Loaction: {event.payload.eventLocation}
                    </li>
                    <li>
                      <i className="bi bi-check sec-head"></i> Event Managers: {event.payload.managers[0].name} ( {event.payload.managers[0].student_id} ){" , "}{event.payload.managers[1].name}  ( {event.payload.managers[1].student_id} )
                    </li>
                    <br></br>
                    <hr/>
                    <br></br>
                    <li>
                      {apply()}
                    </li>
                    
                  </ul>
                </div>
              </div>
            </div>
            {/* <!-- End col--> */}
          </div>
        </div>
      </div>
    </div>


    const Question = ({ ques }) => {
      return (
        <div className="accordion-item">
          <h2 className="accordion-header" id={ques.qid + "heading"}>
            <button className="accordion-button collapsed"
              style={{ backgroundColor: "#444" }, { color: "white" }, { fontWeight: "bold" }}
              data-bs-toggle="collapse" data-bs-target={"#a" + ques.qid} aria-expanded="true"
              aria-controls={"#a" + ques.qid}>
              {ques.ques}
            </button>
          </h2>
          <div id={"a" + ques.qid} className="accordion-collapse collapse " aria-labelledby={ques.qid + "heading"}
            data-bs-parent="#accordionExample">
            <div className="accordion-body accordionbodyfont">
              {ques.ans}
            </div>
          </div>
        </div>
      )
    }

    var Questions = <div>
    {event.payload.questions.map(ques => <Question key={ques.qid} ques={ques} />)}
  </div>

    const PostQuestion = ({ eid }) => {
      if (user.payload._id == '') {
        return (<button type="button" class="btn btn-info btn-rounded " style={{ "color": "white" }} disabled>Login to post a question!</button>);
      }
      else if(user.payload.question.isLoading == true)
      {
        return <Loading/>
      }

      return (
        <div className="accordion-item">
          <h2 className="accordion-header" id="headingFour">
            <button className="accordion-button collapsed"
              style={{ backgroundColor: "#3ec1d5" }, { color: "white" }, { fontSize: "1rem" }, { fontWeight: "bold" }}
              type="button" data-bs-toggle="collapse" data-bs-target="#collapseFour" aria-expanded="false"
              aria-controls="collapseFour">
              Post a question
            </button>
          </h2>
          <div id="collapseFour" className="accordion-collapse collapse" aria-labelledby="headingFour"
            data-bs-parent="#accordionExample">
            <div className="accordion-body">
              <div className="container">
                <Form onSubmit={handlePost}>
                  <div className="mb-3 mt-3">
                    <label for="question">Ask a quesion</label>
                    <Input  innerRef={(input) => query= input} type="textarea" className="form-control" rows="5" id="question" name="text"></Input>
                  </div>
                  <Button type="submit">Post</Button>
                </Form>
              </div>
            </div>
          </div>
        </div>
      )
    }

    
    const AnswerQuestion = () => {
      return(      <Link to={`/societies/${sid}/events/${eid}/answer`} > 
      <Button>Answer Questions</Button>
      </Link>   )
    }

    var QuestionAnswer = <>
    </>
    if(event.payload.managers[0].student_id == user.payload.student_id || event.payload.managers[1].student_id == user.payload.student_id)
    {
      QuestionAnswer = <AnswerQuestion/>
    }
    else
    {
      QuestionAnswer = <PostQuestion eid={eid}/>
    }

   


   

    display = <div>
      <div>
        {Event}
    
        <div className="container">
          <br />
          <br />
          <div className="col-md-12 col-sm-12 col-xs-12">
            <div className="section-headline text-center">
              <h2><span style={{ color: "#3ec1d5" }}>Question</span> And <span
                style={{ color: "#3ec1d5" }}>Anwers</span></h2>
            </div>
          </div>
          <div className="accordion" id="accordionExample">
            {Questions}
            <br />
            <br />
            <br />
            {QuestionAnswer}
            <br />
            <br />
          </div>
        </div>
      </div>
    </div>
  }
  else {
    display = <div>
      {event.err}
    </div>
  }

  return (
    <div>
      {display}
    </div>
  )
}

export default EventPageComponent
