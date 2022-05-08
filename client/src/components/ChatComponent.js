import React,{useState,useEffect} from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { Row,Col,Input,Button,Form} from 'reactstrap'

function ChatComponent() {
    const user = useSelector(state => state.user)
    const history = useHistory()
    let initialState = 0;
    if(user.payload._id!='' && user.payload.member[0].sid._id)
    {
        initialState = user.payload.member[0].sid._id;
    }
    const [curRoom, setcurRoom] = useState(initialState)
    const [messages, setmessages] = useState([])

    useEffect(() => {
        socket.on('message',payload => {
            setmessages((p) => [...p,payload])
        })
    }, [])

    let display = <></>
   


        
    /* Related to rooms*/

    const socket = user.payload.socket

    const handleRoomchange = (id) => {
        //  console.log("Hmm clicked room with ",id)
        setcurRoom(id)
    }


    const DisplayRoom = ({ r }) => {
        return (
            <div className="chat_list">
                <div className="chat_people">
                    {/* <div className="chat_img"> <img width="100px" height="100px" src={r.image} alt="image" /> </div> */}
                    <div className="chat_ib">
                        <h5>{r.name} <span className="chat_date">{/*Dec 25*/}</span></h5>
                        {/* <p>Test, which is a new approach to have all solutions
                        astrology under one roof.</p> */}
                    </div>
                </div>
            </div>
        )
    }

    const DisplayActiveRoom = ({ r }) => {
        return (
            <div className="chat_list active_chat" >
                <div className="chat_people">
                    {/* <div className="chat_img"> <img src={r.image} alt="image" /> </div> */}
                    <div className="chat_ib">
                        <h5>{r.name} <span className="chat_date">{/*Dec 25*/}</span></h5>
                        {/* <p>Test, which is a new approach to have all solutions
                        astrology under one roof.</p> */}
                    </div>
                </div>
            </div>
        );
    }

    



    /* end */


    /* Messages  */

    

   

    const incomingMessage = (payload) => {
        return (<div className="incoming_msg">
            <div className="incoming_msg_img"> <img src="https://ptetutorials.com/images/user-profile.png" alt="sunil" /> </div>
            <div className="received_msg">
                <div className="received_withd_msg">
                    <p>{payload.data}</p>
                    <span className="time_date"> {payload.time}    |    {payload.date}    |    {payload.sender} </span></div>
            </div>
        </div>);
    }


    const outgoingMessage = (payload) => {
        return (<div className="outgoing_msg">
            <div className="sent_msg">
                <p>{payload.data}</p>
                <span className="time_date"> {payload.time}    |    {payload.date}  </span> </div>
        </div>);
    }


    const sendMessage = (e) => {
        //alert(e.target.msg.value)
        const payload = {
            "data": e.target.msg.value,
            "sender": user.payload.student_id,
            "time": "11:01 AM",
            "date": "14-01-22",
            "room": curRoom
        }
        // setmessages((p) => [...p, payload])
        // console.log("I am launching my message")
        socket.emit('message', payload)
        e.target.reset()
        e.preventDefault();
    }

    const chatform = () => {
        return (
            <div className="type_msg">
                <div className="input_msg_write">
                    <Form onSubmit={sendMessage}>
                        <Row>
                            <Col md={11}>
                                <Input type="text" name="msg" id="msg" placeholder="Type a message" />
                            </Col>
                            <Col md={1} style={{ "padding": "0px" }}>
                                <Button type='submit' style={{ "backgroundColor": "white", "borderColor": "white" }}><img src="https://img.icons8.com/external-kmg-design-flat-kmg-design/32/000000/external-send-user-interface-kmg-design-flat-kmg-design.png" /></Button>
                            </Col>
                        </Row>
                    </Form>
                </div>
            </div>
        )
    } 


     /*end messages */



    if(user.payload._id!='')
    {
        const displayMessage = messages.filter((m) => {  return (m.room === curRoom);} ).map((msg) => {
            if (msg.sender == user.payload.student_id) {
                return (outgoingMessage(msg));
            }
            else {
                return (incomingMessage(msg));
            }
        })
    
    
       
    
    
        const displayrooms =  user.payload.member.map((r) => {
            //  console.log(r.id)
              
              if (r.sid._id === curRoom) {
                  return (
                      <DisplayActiveRoom key={r.sid._id} r={r.sid} />);
              }
              else {
                  return (<div onClick={() => handleRoomchange(r.sid._id)}>
                      <DisplayRoom key={r.sid._id} r={r.sid} />
                  </div>);
              }
      
          })
    
    
    
        display =  <div className="container">
        <h3 className=" text-center"><img src="logo.png" width="300px" height="150px" alt="chatty" /></h3>
        <div className="messaging">
            <div className="inbox_msg">
                <div className="inbox_people">
                    <div className="headind_srch">
                        <div className="recent_heading">
                            <h4> Rooms </h4>
                        </div>
    
                    </div>
                    <div className="inbox_chat">
                        {/* <div className="chat_list active_chat">
                            <div className="chat_people">
                                <div className="chat_img"> <img src="https://ptetutorials.com/images/user-profile.png" alt="sunil" /> </div>
                                <div className="chat_ib">
                                    <h5>Sunil Rajput <span className="chat_date">Dec 25</span></h5>
                                    <p>Test, which is a new approach to have all solutions
                                        astrology under one roof.</p>
                                </div>
                            </div>
                        </div> */}
                        {displayrooms}
                    </div>
                </div>
    
    
    
    
    
    
    
    
    
    
    
    
    
    
                <div className="mesgs">
                    <div className="msg_history">
                        {displayMessage}
    
                    </div>
                    {chatform()}
                </div>
    
    
    
    
    
    
    
    
    
    
    
    
    
            </div>
    
    
    
        </div></div>

    }
    else
    {
        history.push('/login')
    }
    
     
    
    return (
        <div>
           {display}
        </div>
    )
}

export default ChatComponent
