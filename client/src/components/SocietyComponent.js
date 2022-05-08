import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { Button } from 'reactstrap'
import { FetchEvents } from '../redux/events/eventsActionCreator'
import { FetchSociety } from '../redux/societies/societiesActionCreater'
import { baseUrl } from '../shared/baseURL'
import { Loading } from './LoadingComponent'

const SocietyComponent = ({ sid }) => {


  const events = useSelector(state => state.events)
  const society = useSelector(state => state.society)
  const user = useSelector(state => state.user)
  const dispatch = useDispatch();


  useEffect(() => {
    dispatch(FetchSociety(sid));
    dispatch(FetchEvents(sid));
  }, [])

  var display = <div>
    gsidjbkngoihrjzdkmb;lhijrdskbmz
  </div>


  if (society.isLoading == true) {
    
    display = <div>
      <Loading />
    </div>
  }
  else if (society.payload != '') {
    // alert("hey here 2")
    
    const teamMembers = society.payload.teamMembers
   
    //alert(teamMembers)
    const members = <>
                    <SocietyMember member={society.payload.society_president} designation="President"  />
                    <SocietyMember member={society.payload.society_vice_president}  designation="Vice President"   />
                    <SocietyMember member={society.payload.society_seceratory1} designation="Seceratory1" />
                    <SocietyMember member={society.payload.society_seceratory2} designation="Seceratory2"  />
                    </>
        
      function SocietyMember({ member,designation }) {
        //console.log(member.image)
        return (
  
          <div className="col-md-3 col-sm-3 col-xs-12">
            <div className="single-team-member">
              <div className="team-img">
                <a href="#">
                  <img src={baseUrl + member.image} alt="" ></img>
                </a>
                <div className="team-social-icon text-center">
                  <ul>
                    <li>
                      <a href={member.facebook}>
                        <i className="bi bi-facebook"></i>
                      </a>
                    </li>
                    <li>
                      <a href={member.twitter}>
                        <i className="bi bi-twitter"></i>
                      </a>
                    </li>
                    <li>
                      <a href={member.instagram}>
                        <i className="bi bi-instagram"></i>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="team-content text-center">
                <h4>{member.name}</h4>
                <p>{designation}</p>
              </div>
            </div>
          </div>
        )
      }
  

    var eventsCard = <div>
      Hi
    </div>

    if(events.isLoading == true)
    {
      eventsCard = <div>
        <Loading/>
      </div>
    }
    else if(events.payload)
    {
      const EventCardComponent = ({ event }) => {
        return (
          <div className="col-md-3 col-sm-6">
            <Link to={`/societies/${sid}/events/${event.event_id}`} >
              <div className="event-card"><img src={baseUrl + event.image} className="img img-responsive" />
                <div className="event-card-name">
                  {event.event_name}
                </div>
                <div className="event-card-position">{event.society}</div>
                {/* <div className="event-card-overview">
                                        <div className="row text-center">
                                            <div className="col-md-4">
                                                <h3>1</h3>
                                                <p>Rank</p>
                                            </div>
                                            <div className="col-md-4">
                                                <h3>50</h3>
                                                <p>Matches</p>
                                            </div>
                                            <div className="col-md-4">
                                                <h3>35</h3>
                                                <p>Goals</p>
                                            </div>
                                        </div>
                  </div> */}
              </div>
            </Link>
          </div>
        )
      }
      // console.log("events.payload"+events.payload)
      eventsCard = events.payload.map((event) => <EventCardComponent key={event.event_id} event={event} />)
    }
    else{
      eventsCard = <div>
        {events.err}
      </div>
    }

    var createEvent = <></>
    if(society.payload.president == user.payload.student_id)
    {
      createEvent = <div>
        <Link to={'/societies/'+sid+"/createEvent"}>
        <Button>Create Event</Button>
        </Link>
      </div>
    }

    display = <div>
    {/* <!-- ======= Start About Section ======= --> */}
    <div>
      <div id="about" className="about-area area-padding">
        <div className="container">
          <div className="row">
            <div className="col-md-12 col-sm-12 col-xs-12">
              <div className="section-headline text-center">
                <h2>{society.payload.name}</h2>
              </div>
            </div>
          </div>
          <div className="row">
            {/* <!-- single-well start--> */}
            <div className="col-md-6 col-sm-6 col-xs-12">
              <div className="well-left">
                <div className="single-well">
                  <a href="#">
                    <img src={baseUrl + society.payload.image} alt="" />
                  </a>
                </div>
              </div>
            </div>
            {/* <!-- single-well end--> */}
            <div className="col-md-6 col-sm-6 col-xs-12">
              <div className="well-middle">
                <div className="single-well">
                  <a href="#">
                    <h4 className="sec-head">{society.payload.name}</h4>
                  </a>
                  <p>
                    {society.payload.description}
                  </p>
                  <ul>
                    <li>
                      <i className="bi bi-check"></i> Interior design Package
                    </li>
                    <li>
                      <i className="bi bi-check"></i> Building House
                    </li>
                    <li>
                      <i className="bi bi-check"></i> Reparing of Residentail Roof
                    </li>
                    <li>
                      <i className="bi bi-check"></i> Renovaion of Commercial Office
                    </li>
                    <li>
                      <i className="bi bi-check"></i> Make Quality Products
                    </li>
                    <li>
                      {createEvent}
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            {/* <!-- End col--> */}
          </div>
        </div>
      </div>
      {/* <!-- End About Section --> */}
    </div>
    {/* <!-- ======= End About Section ======= --> */}

    {/* <!-- ======= Start Teams Section ======= --> */}
    <div id="team" className="our-team-area area-padding">
      <div className="container">
        <div className="row">
          <div className="col-md-12 col-sm-12 col-xs-12">
            <div className="section-headline text-center">
              <h2>Our special Team</h2>
            </div>
          </div>
        </div>
        <div className="row">
          {members}
        </div>
      </div>
    </div>
    {/* <!-- ======= End Teams Section ======= --> */}

    {/* <!-- ======= Start Teams Section ======= --> */}
    <div id="team" className="our-team-area area-padding">
      <div className="container">
        <div className="row">
          <div className="col-md-12 col-sm-12 col-xs-12">
            <div className="section-headline text-center">
              <h2>Events</h2>
            </div>
          </div>
        </div>
        <div className="row">
          {eventsCard}
        </div>
      </div>
    </div>
    {/* <!-- ======= End Teams Section ======= --> */}

  </div>



  }
  else {
    display = <div>
      {society.err}
    </div>
  }



  return (
    <div>
    {display}
    </div>
    
  )
}

export default SocietyComponent