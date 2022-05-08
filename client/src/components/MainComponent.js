import React, { useEffect } from 'react'
import FooterComponent from './FooterComponent'
import HeaderComponent from './HeaderComponent'
import HomeComponent from './HomeComponent'
import {Route,Switch,Link,NavLink,Redirect,component} from 'react-router-dom'
import SocietiesComponent from './SocietiesComponent'
import SocietyComponent from './SocietyComponent'
import EventPageComponent from './EventPageComponent'
import ScrollToTop from './ScrollToTop'
import LoginPageComponent from './LoginPageComponent'
import ContactusComponent from './ContactusComponent'
import CreateEventComponent from './CreateEventComponent'
import ProfileComponent from './ProfileComponent'
import AnswerPageComponent from './AnswerPageComponent'
import ChatComponent from './ChatComponent'


function MainComponent() {

    // useEffect(() => {
    //     alert("User")
    //     socket.on('connect',() => {
    //         // alert("Hello")
    //         console.log("connected")
    //     })
    // }, [])


    // const user = useSelector(state => state.user)

    // useEffect(() => {
    //     if(user.payload._id!='')
    //     {
    //       // alert("Hmmmm"+user.payload.id+" dsev")
    //     //   alert("Member")
    //     //   alert(user.payload.member)
    //     console.log("Hereeeeeeee")
          
    //     }
    //   }, [user])


    // useEffect(() => {
    //     // alert("User")
    //     socket.on('connect',() => {
    //         // alert("Hello")
    //         console.log("connected")
    //     })
    // }, [])


   

    // if(user.payload._id!='')
    // {
    //     alert("Hmmaiaidnxi")
    // }


    const homepage = () => {
        // alert("Called")
        return (<HomeComponent/>);
    }
    
    const societiespage = () => {
        return (<SocietiesComponent/>);
    }
    
    const contactuspage = () => {
        return <ContactusComponent/>
    }
    
    const Societypage = ({match}) => {
        return (<SocietyComponent sid={match.params.sid} />);
    }
    
    const eventpage = ({match}) =>{
        //console.log(match.params)
        return (
            <EventPageComponent eid={match.params.eid} sid={match.params.sid}/>
        )
    }

    const chatpage = () => {
        return(
            <ChatComponent/>
        )
    }

    const answerpage = ({match}) =>{
       // console.log(match.params)
        return (
            <AnswerPageComponent eid={match.params.eid} sid={match.params.sid}/>
        )
    }
    
    const loginpage = () => {
        return <LoginPageComponent/>
    }
    
    const profilepage = () => {
        return <ProfileComponent/>
    }



    return (
        <div>
            <HeaderComponent/>
            <ScrollToTop/>
             <Switch>
                    <Route path='/home' exact component={() => homepage()}/>
                    <Route path='/societies' exact component={() => societiespage()} />
                    <Route path='/contactus' exact component={() => contactuspage()}/>
                    <Route path="/societies/:sid" exact component={(props) => Societypage(props)}/>
                    <Route path="/societies/:sid/events/:eid" exact component={(props) => eventpage(props)}/>
                    <Route path="/societies/:sid/events/:eid/answer" component={(props) => answerpage(props)}/>
                    <Route path='/login' exact component={() => loginpage()}/>
                    <Route path='/profile' exact component={() => profilepage()}/>
                    <Route path='/chat' exact component={() => chatpage()}/>
                    <Route path='/societies/:sid/createEvent' component={(props) => { return(<CreateEventComponent sid={props.match.params.sid}/>)}}/>
                    <Redirect to='/home'/>
                </Switch>
            <FooterComponent/>
        </div>
    )
}

export default MainComponent
