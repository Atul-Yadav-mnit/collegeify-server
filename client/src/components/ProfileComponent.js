import React from 'react'
import { Link, useHistory } from 'react-router-dom'
import { baseUrl } from '../shared/baseURL'
import { events } from '../shared/events'
import { Row, Col, Button, Modal, ModalBody, ModalFooter, ModalHeader, Form, Input } from 'reactstrap'
import { questions, questionsPayLoad } from '../redux/questions/question'
import { useDispatch, useSelector } from 'react-redux'
import { EditProfile, Logoutuser } from '../redux/users/usersActionCreator'
import { useState } from 'react'
import { Loading } from './LoadingComponent'





function ProfileComponent() {

  let history = useHistory();
  const user = useSelector(state => state.user)
  const dispatch = useDispatch()
  const [modal, setmodal] = useState(false)

  const handleLogout = () => {
    dispatch(Logoutuser())
    history.push('/home')
  }

  const toggle = () => {
    setmodal((prev) => !prev)
  }

  const handleEdit = (event) => {
    const twitter = event.target[0].value
    const facebook = event.target[1].value
    const instagram = event.target[2].value
    const linkedin = event.target[3].value
    //alert(twitter, facebook, instagram, linkedin)
    dispatch(EditProfile(twitter, facebook, instagram, linkedin, user.payload.token, user.payload.student_id))
    // alert("hi")
    setmodal((prev) => !prev)
    event.preventDefault();
  }



  const EventCardComponent = ({ event }) => {
    return (
      <Col md={4}>
        <Link to={`/societies/${event.society}/events/${event._id}`} >
          <div className="event-card"><img src={baseUrl + event.image} className="img img-responsive" />
            <div className="event-card-name">
              {event.name}
            </div>
            <div className="event-card-position">{ }</div>
          </div>
        </Link>
      </Col>
    )
  }

  const eventsCard = user.payload.participant.payload.map((event) => <EventCardComponent key={event.id} event={event.eid} />)

  const Question = ({ ques }) => {

    return (
      <div className="accordion-item">
        <h2 className="accordion-header" id={ques.id + "heading"}>
          <button className="accordion-button collapsed"
            style={{ backgroundColor: "#444" }, { color: "white" }, { fontWeight: "bold" }}
            data-bs-toggle="collapse" data-bs-target={"#a" + ques.id} aria-expanded="true"
            aria-controls={"#a" + ques.id}>
            {ques.question}
          </button>
        </h2>
        <div id={"a" + ques.id} className="accordion-collapse collapse " aria-labelledby={ques.id + "heading"}
          data-bs-parent="#accordionExample">
          <div className="accordion-body accordionbodyfont">
            {ques.answer}
          </div>
        </div>
      </div>
    )
  }

  const Questions = <div>
    {user.payload.question.payload.map(ques => <Question key={ques.id} ques={ques} />)}
  </div>

  var display;
  var imgsrc = baseUrl + user.payload.image;
  if (user.payload.image == "" || user.payload.image == undefined) {
    imgsrc = "https://bootdey.com/img/Content/avatar/avatar7.png"
  }




  if (user.payload._id != '') {
    var update_btn =  <Button style={{ "backgroundColor": "#3ec1d5"}} onClick={toggle}><>Edit Profile</></Button> ;
    if (user.payload.editProfile.isLoading) {
      update_btn = <Loading />
    }

    display = <div style={{ 'marginTop': "20px" }}>
      <div className="container">
        <div className="profile-main-body">
          <div className="row profile-gutters-sm">
            <div className="col-md-4 profile-mb-3">
              <div className="profile-card">
                <div className="profile-card-body">
                  <div className="d-flex flex-column align-items-center text-center">
                    <br></br>
                    <img src={imgsrc} alt="Admin" className="rounded-circle" width="200" />

                    <br />
                    <div className="mt-3">
                      <h4>{user.payload.name}</h4>
                      <p className="text-secondary mb-1">{user.payload.student_id}</p>
                      <p className="text-muted font-size-sm"></p>
                      <br />
                      <hr />
                      <div className="gap-3 mt-3 icons d-flex flex-row justify-content-center align-items-center">
                        <a style={{ "color": "#3ec1d5"}} href={user.payload.twitter}><span><i  className="fa fa-twitter"></i></span> </a> 
                        <a style={{ "color": "#3ec1d5"}} href={user.payload.facebook}><span><i  className="fa fa-facebook-f"></i></span> </a> 
                        <a style={{ "color": "#3ec1d5"}} href={user.payload.instagram}><span><i  className="fa fa-instagram"></i></span> </a> 
                        <a style={{ "color": "#3ec1d5"}} href={user.payload.linkedin}><span><i  className="fa fa-linkedin"></i></span> </a> 
  
                       </div>
                      <hr />
                     {update_btn}
                      <Modal isOpen={modal} toggle={toggle}>
                        <ModalHeader toggle={toggle}>Edit Profile</ModalHeader>
                        <ModalBody>
                          <Form onSubmit={handleEdit}>
                            <div className="mb-3 mt-3">
                              <Input type="text" id="twitter" className="form-control" name="text" placeHolder="Twitter"></Input>
                            </div>
                            <div className="mb-3 mt-3">
                              <Input type="text" id="facebook" className="form-control" name="text" placeHolder="Facebook"></Input>
                            </div>
                            <div className="mb-3 mt-3">
                              <Input type="text" id="instagram" className="form-control" name="text" placeHolder="Instagram"></Input>
                            </div>
                            <div className="mb-3 mt-3">
                              <Input type="text" id="linkedin" className="form-control" name="text" placeHolder="Linkedin"></Input>
                            </div>

                            <hr></hr>
                            <Button style={{ "backgroundColor": "#3ec1d5", "marginRight": "auto" }} type="submit">Update</Button>
                            <br>
                            </br>
                            <br></br>
                          </Form>
                        </ModalBody>
                        {/* <ModalFooter>
                        
                          <Button color="secondary" onClick={toggle}>Cancel</Button>
                        </ModalFooter> */}
                      </Modal>
                      {/* <Button style={{"backgroundColor": "#3ec1d5"}} onClick={handleEdit}>Edit Profile</Button> */}
                      {' '}
                      <Button onClick={handleLogout}>Logout</Button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="profile-card mt-3">
              </div>
            </div>





            <div className="col-md-8">

              <div className="section pb-5 pt-5 pt-sm-2 text-center">
                <h6 className="mb-0 pb-3"><span style={{ "color": "#3ec1d5", "fontSize": "25px", "marginRight": "30px" }}>Events</span><span style={{ "color": "#3ec1d5", "fontSize": "25px", "marginLeft": "70px" }}>Questions</span></h6>
                <input className="checkbox" type="checkbox" id="reg-log" name="reg-log" />
                <label for="reg-log"></label>
                <div className="card-3d-wrap mx-auto" style={{ width: "800px" }}>
                  <div className="card-3d-wrapper" >
                    <div className="card-front" >
                      <div className="center-wrap">
                        <div className="container " style={{ "width": "730px", "height": "350px", "overflow": "auto" }}>

                          <Row>
                            {eventsCard}
                          </Row>



                        </div>
                      </div>
                    </div>
                    <div className="container card-back" style={{ "overflow": "auto" }}>
                      <div className="center-wrap">
                        <div className="container accordion" id="accordionExample" style={{ "width": "730px", "height": "350px", "overflow": "auto" }}>

                          {Questions}


                        </div>

                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>



          </div>

        </div>
      </div>
    </div>
  }
  else {
    history.push('/login')
    display = <div>
      Hi
    </div>
  }


  return (
    <div>
      {display}
    </div>

  )
}

export default ProfileComponent
