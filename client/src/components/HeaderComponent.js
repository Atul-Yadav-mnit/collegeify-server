import React,{useEffect, useState} from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  Button} from 'reactstrap';
import {NavLink,Redirect} from 'react-router-dom'
import LoginPageComponent from './LoginPageComponent';
import { useDispatch, useSelector } from 'react-redux';


const HeaderComponent = () => {

  const user = useSelector(state => state.user)

 


  // console.log("rf3eqdwh")


  const[tog,settog] = useState(() => {
      return ({
          isOpen: false
      })
  })


  const toggle = () => {
    settog((prev) => {
        return({isOpen : !prev.isOpen})
    })
  }
  

  var Navbutton,Chatbutton;
   
    if(user.payload._id != "")
    {
      Chatbutton = <>
          <NavLink  className="nav-link"  to='/chat'><span className="fas fa-comment fa-2x" style={{ color: "#3ec1d5" }}></span></NavLink> 
          
      </>
        Navbutton =  <>
          <NavLink  className="nav-link"  to='/profile'><span className="fas fa-user fa-2x" style={{ color: "#3ec1d5" }}></span></NavLink> 
        </>  
    }
    else
    {
      Chatbutton=<></>
      Navbutton =  <NavLink className="nav-link"  to='/login'><span className=""></span> <Button style={{backgroundColor:"#3ec1d5"}}>Login</Button></NavLink>
    }
  
    return (
      <div id="navbarId">
        <Navbar style={{"overflow":"hidden"}} color="light" light expand="md" >
          <NavbarBrand  className="mr-auto" style={{fontSize:"40px"}} to="/"> <h2><span style={{ color: "#3ec1d5","fontSize":"30px"}}>C</span>ollegeify</h2></NavbarBrand>
         <NavbarToggler onClick={toggle} />
          <Collapse isOpen={tog.isOpen} navbar>
            <Nav style={{marginRight:"50px"}} className="ml-auto" navbar >
              <NavItem>
                <NavLink className="nav-link" style={{ color: "#3ec1d5","fontSize":"15px"}} to='/home'><span className=""></span>Home</NavLink>
              </NavItem>
              <NavItem>
              <NavLink className="nav-link" style={{ color: "#3ec1d5","fontSize":"15px"}} to='/societies'><span className=""></span>Societies</NavLink>
              </NavItem>
              <NavItem>
              <NavLink className="nav-link" style={{ color: "#3ec1d5","fontSize":"15px"}} to='/contactus'><span className=""></span>ContactUs</NavLink>
              </NavItem>
              <NavItem>
                {Chatbutton}
             </NavItem>
              <NavItem>
                {Navbutton}
             </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  
}

export default HeaderComponent