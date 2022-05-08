import React,{useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { Row, Col, Label, Button,Form,Input } from 'reactstrap'
import { AddEvent } from '../redux/events/eventsActionCreator'
import { Loading } from './LoadingComponent'



const CreateEventComponent = ({sid}) => {

    const dispatch = useDispatch()
    const user = useSelector(state => state.user)
    const society = useSelector(state => state.society)
    const postEvent = useSelector(state => state.postEvent)
    const history = useHistory()

    const handleSubmit = (event) => {
        event.preventDefault();
        const event_name = event.target.eventname.value
        const event_location = event.target.eventlocation.value;
        const manager1 = event.target.manager1.value;
        const manager2 = event.target.manager2.value;
        const date_of_event = event.target.date_of_event.value;
        const last_date_to_apply= event.target.last_date_to_apply.value;
        const poster = event.target.poster.value;
        const member = event.target.member.value;
        const description = event.target.description.value;
        event.target.reset();
        dispatch(AddEvent(event_name ,event_location,manager1,manager2,date_of_event,last_date_to_apply,poster,member,description,user.payload.token,sid))
    }

    var display = <div>

    </div>

    if(user.payload._id == '' || user.payload.student_id != society.payload.president || society.payload._id!=sid)
    {
        history.push('/home')
    }
    else
    {
        var btn = <Button style={{ "backgroundColor": "#3ec1d5" }}>
        Post Event
    </Button>
    if(postEvent.isLoading)
    {
        btn = <Loading/>
    }

        display =   <div className="container" style={{ "padding": "30px" }} >
        <div className='row' style={{ "textAlign": "center" }}>
            <h1> Post a New Event!</h1>
            <hr></hr>
            <br />
            <br />
        </div>
        <Form  onSubmit={handleSubmit}>
            <Row className="form-group">
                <Label htmlFor="eventname" md={2}><p>Event-Name:</p></Label>
                <Col md={10}>
                    <Input type="text" id="eventname" name="eventname"
                        placeholder="event-Name"
                        className="form-control"
                    />
                </Col>
            </Row>
            <Row className="form-group">
                <Label htmlFor="eventlocation" md={2}><p>Event-Location:</p></Label>
                <Col md={10}>
                    <Input  type="text" id="eventlocation" name="eventlocation"
                        placeholder="event-Location"
                        className="form-control"
                    />
                </Col>
            </Row>
             <Row className="form-group">
                <Label htmlFor="manager1" md={2}><p>Manager1:</p></Label>
                <Col md={4}>
                    <Input type="text" id="manager1" name="manager1"
                        placeholder="manager1"
                        className="form-control" 
                        />
                </Col>
                <Label htmlFor="date_of_event" md={2}><p>Date of Event:</p></Label>
                <Col md={4}>
                    <Input type="date"
                       name="date_of_event"
                       id="date_of_event"
                    />
                </Col>
            </Row>
            <Row className="form-group">
                <Label htmlFor="manager2" md={2}><p>Manager2:</p></Label>
                <Col md={4}>
                <Input type="text" id="manager2" name="manager2"
                        placeholder="manager2"
                        className="form-control" 
                        />
                </Col>
                <Label htmlFor="last_date_to_apply" md={2}><p>Last Date to Apply:</p></Label>
                <Col md={4}>
                <Input type="date"
                       name="last_date_to_apply"
                       id="last_date_to_apply"
                    />
                </Col>
            </Row>
             <Row className="form-group">
                <Col md={2}>
                    <Label><p>Upload Poster:</p></Label>
                </Col>
                <Col md={{ size: 4 }}>
                    <Input type="file" accept="image/png, image/jpeg" name="poster" id="poster" />
                </Col>
                 <Col md={2}>
                    <Label><p>Who can Participate:</p></Label>
                </Col>
                <Col md={{ size: 4 }}>
                <Input type="select" id="member" name="contactType" >
                                    <option>Members</option>
                                    <option>Non-Members</option>
                                </Input>
                </Col> 
            </Row> 
            <Row className="form-group">
                <Label htmlFor="description" md={2}><p>Description</p></Label>
                <Col md={10}>
                    <Input type="textarea"  id="description" name="description"
                        rows="5"
                        className="form-control" />
                </Col>
            </Row>
            <Row className="form-group" style={{ "marginTop": "10px" }}>
                <Col md={{ size: 10, offset: 2 }}>
                    {btn}
                </Col>
            </Row> 
        </Form>

    </div>
    }
    return (
      <div>
          {display}
      </div>
    )
}

export default CreateEventComponent