import React from 'react'
import {
    Breadcrumb, BreadcrumbItem,
    Button, Row, Col, Label
} from 'reactstrap';
import {useDispatch} from 'react-redux'
import { Control, Form, actions} from 'react-redux-form';

const ContactusComponent = () => {

    const dispatch = useDispatch()
    const handleSubmit = (values) => {
        //console.log('Current State is: ' + JSON.stringify(values));
        //alert('Current State is: ' + JSON.stringify(values));
        dispatch(actions.reset('contactUs'))
        // event.preventDefault();
    }


    return (
        <div className='row container' style={{ "marginTop": "30px", "marginLeft": "auto", "marginRight": "auto", "marginBottom": "50px" }}>
            <div className='col-md-6'>
                <img src="https://marvelapp.com/static/illustration@2x-85cce263ddf60035c6702cc57dd1fc2a-87cc6.jpg" alt="" />
            </div>
            <div className='col-md-6'>

                <div className='container' style={{ "marginTop": "40px" }}>
                    <div className='row'>
                        <h1> Drop us a line!</h1>
                        <hr></hr>
                    </div>
                    <br />
                    <div className='container'>
                        <Form model="contactUs" onSubmit={(values) => handleSubmit(values)}>
                            <Row className="form-group">
                                <Label htmlFor="name" md={2}><p>Name</p></Label>
                                <Col md={10}>
                                    <Control.text model=".name" id="name" name="name"
                                        placeholder="Name"
                                        className="form-control"
                                    />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="email" md={2}><p>Email</p></Label>
                                <Col md={10}>
                                    <Control.text model=".email" id="email" name="email"
                                        placeholder="Email"
                                        className="form-control" />
                                </Col>
                            </Row>

                            <Row className="form-group">
                                <Label htmlFor="message" md={2}><p>Feedback</p></Label>
                                <Col md={10}>
                                    <Control.textarea model=".message" id="message" name="message"
                                        rows="12"
                                        className="form-control" />
                                </Col>
                            </Row>
                            <Row className="form-group" style={{ "marginTop": "10px" }}>
                                <Col md={{ size: 10, offset: 2 }}>
                                    <Button type="submit" style={{ "backgroundColor": "#3ec1d5" }}>
                                        Send Feedback
                                    </Button>
                                </Col>
                            </Row>
                        </Form>`
                    </div>
                </div>
            </div>
        </div>

    )
}

export default ContactusComponent
