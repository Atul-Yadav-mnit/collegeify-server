import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { Loading } from './LoadingComponent'
import { Form, Button, Input } from 'reactstrap'
import { AnswerQuestion, FetchQuestions } from '../redux/questions/questionActionCreator'

const AnswerPageComponent = ({ eid, sid }) => {

    const questions = useSelector(state => state.questions)
    const user = useSelector(state => state.user)
    const event = useSelector(state => state.event)
    let history = useHistory();
    const dispatch = useDispatch()

    var query = '';

    useEffect(() => {
        dispatch(FetchQuestions(eid))
    }, [])

  


    const handleSubmit = (event) => {
        const ans = event.target[0].value
        const qid = event.target[0].id
        dispatch(AnswerQuestion(eid,qid,ans,user.payload.token))
        event.preventDefault();
    }

    var display = <>
        No questions available!!!
    </>

    if (user.payload.student_id == '' || (user.payload.student_id != event.payload.managers[0].student_id && user.payload.student_id != event.payload.managers[1].student_id)) {
        history.push('/home')
    }
    else if (questions.isLoading) {
        display = <>
            <Loading />
        </>
    }
    else if (questions.err != '') {
        display = <div>
            {questions.err}
        </div>
    }
    else if(questions.payload != ''){
        const Question = ({ ques }) => {
            return (<div className="accordion-item">
                <h2 className="accordion-header" id={"b" + ques._id}>
                    <button className="accordion-button collapsed"
                        style={{ backgroundColor: "#3ec1d5" }, { color: "white" }, { fontSize: "1rem" }, { fontWeight: "bold" }}
                        type="button" data-bs-toggle="collapse" data-bs-target={"#a" + ques._id} aria-expanded="false"
                        aria-controls={"a" + ques._id}>
                        {ques.question}
                    </button>
                </h2>
                <div id={"a" + ques._id} className="accordion-collapse collapse" aria-labelledby={"b" + ques._id}
                    data-bs-parent="#accordionExample">
                    <div className="accordion-body">
                        <div className="container">
                            <Form id={ques._id} onSubmit={handleSubmit}>
                                <div className="mb-3 mt-3">
                                    <label for="question">Answer the Question</label>
                                    <Input id={ques._id} innerRef={(input) => query = input} type="textarea" className="form-control" rows="5" name="text"></Input>
                                </div>
                                <Button id={ques._id} type="submit">Post</Button>
                            </Form>
                        </div>
                    </div>
                </div>
            </div>)
        }
    
        const Questions = questions.payload.map((ques) => <Question ques={ques}/>)

        display = <div>
            <div className="container">
                <br />
                <br />
                <div className="col-md-12 col-sm-12 col-xs-12">
                    <div className="section-headline text-center">
                        <h2><span style={{ color: "#3ec1d5" }}>{event.payload.event_name} </span><span
                            style={{ color: "#3ec1d5" }}></span></h2>
                        <h3><span style={{ color: "#3ec1d5" }}>Answer</span> the <span
                            style={{ color: "#3ec1d5" }}>Questions</span></h3>
                    </div>
                </div>
                <br></br>
                <br></br>
                <div className="accordion" id="accordionExample">
                    {Questions}
                    <br>
                    </br>
                    <br>
                    </br>
                </div>
            </div>
        </div>
    }
    else
    {
        display = <div>
            No Question to answer at present!
        </div>
    }

    return (
        <div>
            {display}
        </div>
    )
}

export default AnswerPageComponent
