import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Redirect, useHistory } from 'react-router-dom'
import { Input, Form, Button, UncontrolledCarousel } from 'reactstrap'
import { loginUser, Logoutuser, signupUser } from '../redux/users/usersActionCreator'
import { Loading } from './LoadingComponent'



function LoginPageComponent() {

    let history = useHistory();
    const user = useSelector(state => state.user)
    const dispatch = useDispatch()

    const [loginForm, setloginForm] = useState({
        id: "",
        password: ""
    })

    const [signupForm, setsignupForm] = useState({
        name: "",
        id: "",
        password: ""
    })

    const handleSignUpChange = (event) => {
        const target = event.target;
        const name = target.name;
        setsignupForm({
            ...signupForm,
            [name]: target.value
        });
    }

    const handleLoginChange = (event) => {
        const target = event.target;
        const name = target.name;
        setloginForm({
            ...loginForm,
            [name]: target.value
        });
    }

    const handleSignUp = (event) => {
       // console.log('Current State is: ' + JSON.stringify(signupForm));
        dispatch(signupUser(signupForm.name, signupForm.id, signupForm.password))
        setsignupForm((prev) => {
            const s = {
                ...prev,
                name: "",
                id: "",
                password: ""
            };
            return s;
        })
        event.preventDefault();
    }


    const handleLogin = (event) => {
       // console.log('Current State is: ' + JSON.stringify(loginForm));
        dispatch(loginUser(loginForm.id, loginForm.password))
        setloginForm((prev) => {
            const s = {
                ...prev,
                id: "",
                password: ""
            };
            return s;
        })
        event.preventDefault();
    }


    var loginbtn = <Button style={{ backgroundColor: "#3ec1d5" }} className='btn btn-4'>Submit</Button>;
    var signupbtn = <Button style={{ backgroundColor: "#3ec1d5" }} className='btn btn-4'>Submit</Button>;

    if (user.payload.type == "login") {
        if (user.isLoading === true) {
            loginbtn = <Loading />
        }
        else if (user.err != '') {
            alert(user.err)
            dispatch(Logoutuser());
            loginbtn = <Button style={{ backgroundColor: "#3ec1d5" }} className='btn btn-4'>Submit</Button>;
        }
        else if (user.payload._id != "") {
         //   alert("mmmmmmmmmmmmmmmmmmmmmmm")
            alert(user.payload.message)
            history.push('/home')
            loginbtn = <Button style={{ backgroundColor: "#3ec1d5" }} className='btn btn-4'>Submit</Button>;
        }
        else {
            loginbtn = <Button style={{ backgroundColor: "#3ec1d5" }} className='btn btn-4'>Submit</Button>;
        }
    }
    else {
        if (user.isLoading === true) {
            signupbtn = <Loading />
        }
        else if (user.err != '') {
            alert(user.err)
            dispatch(Logoutuser());
            history.push('/login')
            signupbtn = <Button style={{ backgroundColor: "#3ec1d5" }} className='btn btn-4'>Submit</Button>;
        }
        else if (user.payload.message != "") {
            alert(user.payload.message)
            dispatch(Logoutuser());
            history.push('/login')
            signupbtn = <Redirect to="/login" />;
        }
        else {
            signupbtn = <Button style={{ backgroundColor: "#3ec1d5" }} className='btn btn-4'>Submit</Button>;
        }
    }
    return (
        <div className="login-page">
            <div className="section">
                <div className="container">
                    <div className="row full-height justify-content-center">
                        <div className="col-12 text-center align-self-center py-5">
                            <div className="section pb-5 pt-5 pt-sm-2 text-center">
                                <h6 className="mb-0 pb-3"><span style={{ color: "#3ec1d5" }}>Log In </span>{' '}<span style={{ color: "#3ec1d5" }}>Sign Up</span></h6>
                                <Input className="checkbox" type="checkbox" id="reg-log" name="reg-log" >
                                </Input>
                                <label for="reg-log"> </label>
                                <div className="card-3d-wrap mx-auto">
                                    <div className="card-3d-wrapper">
                                        <div className="card-front">
                                            <div className="center-wrap">
                                                <div className="section text-center">
                                                    <h4 className="mb-4 pb-3">Log In</h4>
                                                    <Form onSubmit={handleLogin}>
                                                        <div className="form-group">
                                                            <Input type="text" onChange={handleLoginChange} value={loginForm.id} name="id" className="form-style" style={{
                                                                padding: "13px 20px",
                                                                paddingLeft: "55px",
                                                                height: "48px",
                                                                width: "100%",
                                                                fontWeight: "500",
                                                                borderRadius: "4px",
                                                                fontSize: "14px",
                                                                lineHeight: "22px",
                                                                letterSpacing: "0.5px",
                                                                outline: "none",
                                                                color: "#c4c3ca",
                                                                backgroundColor: "#1f2029",
                                                                border: "none",
                                                                webkitTransition: "all 200ms linear",
                                                                transition: "all 200ms linear",
                                                                boxShadow: "0 4px 8px 0 rgba(21,21,21,.2)"
                                                            }}
                                                                placeholder="Student ID" id="id" autocomplete="off" />
                                                            <i className="input-icon">
                                                                <i class="fa fa-id-badge" aria-hidden="true"></i>
                                                            </i>

                                                        </div>
                                                        <div className="form-group mt-2">
                                                            <Input type="password" onChange={handleLoginChange} value={loginForm.password} name="password" className="form-style"
                                                                style={{
                                                                    padding: "13px 20px",
                                                                    paddingLeft: "55px",
                                                                    height: "48px",
                                                                    width: "100%",
                                                                    fontWeight: "500",
                                                                    borderRadius: "4px",
                                                                    fontSize: "14px",
                                                                    lineHeight: "22px",
                                                                    letterSpacing: "0.5px",
                                                                    outline: "none",
                                                                    color: "#c4c3ca",
                                                                    backgroundColor: "#1f2029",
                                                                    border: "none",
                                                                    webkitTransition: "all 200ms linear",
                                                                    transition: "all 200ms linear",
                                                                    boxShadow: "0 4px 8px 0 rgba(21,21,21,.2)"
                                                                }}
                                                                placeholder="Password" id="password" autocomplete="off" />
                                                            <i className="input-icon">
                                                                <i class="fa fa-key" aria-hidden="true"></i>
                                                            </i>
                                                        </div>
                                                        <br></br>
                                                        {loginbtn}
                                                        <p className="mb-0 mt-4 text-center"><a href="#0" className="link">Forgot your
                                                            password?</a></p>
                                                    </Form>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="card-back">
                                            <div className="center-wrap">
                                                <div className="section text-center">
                                                    <h4 className="mb-4 pb-3">Sign Up</h4>
                                                    <Form onSubmit={handleSignUp}>
                                                        <div className="form-group mt-2">
                                                            <Input type="text" name="name" onChange={handleSignUpChange} value={signupForm.name} className="form-style" style={{
                                                                padding: "13px 20px",
                                                                paddingLeft: "55px",
                                                                height: "48px",
                                                                width: "100%",
                                                                fontWeight: "500",
                                                                borderRadius: "4px",
                                                                fontSize: "14px",
                                                                lineHeight: "22px",
                                                                letterSpacing: "0.5px",
                                                                outline: "none",
                                                                color: "#c4c3ca",
                                                                backgroundColor: "#1f2029",
                                                                border: "none",
                                                                webkitTransition: "all 200ms linear",
                                                                transition: "all 200ms linear",
                                                                boxShadow: "0 4px 8px 0 rgba(21,21,21,.2)"
                                                            }}
                                                                placeholder="Your Full Name" id="name" autocomplete="off" />
                                                            <i className="input-icon">
                                                                <i class="fa fa-user" aria-hidden="true"></i>
                                                            </i>
                                                        </div>
                                                        <div className="form-group mt-2">
                                                            <Input type="text" name="id" onChange={handleSignUpChange} value={signupForm.id} className="form-style" style={{
                                                                padding: "13px 20px",
                                                                paddingLeft: "55px",
                                                                height: "48px",
                                                                width: "100%",
                                                                fontWeight: "500",
                                                                borderRadius: "4px",
                                                                fontSize: "14px",
                                                                lineHeight: "22px",
                                                                letterSpacing: "0.5px",
                                                                outline: "none",
                                                                color: "#c4c3ca",
                                                                backgroundColor: "#1f2029",
                                                                border: "none",
                                                                webkitTransition: "all 200ms linear",
                                                                transition: "all 200ms linear",
                                                                boxShadow: "0 4px 8px 0 rgba(21,21,21,.2)"
                                                            }}
                                                                placeholder="Student ID" id="id" autocomplete="off" />
                                                            <i className="input-icon">
                                                                <i class="fa fa-id-badge" aria-hidden="true"></i>
                                                            </i>

                                                        </div>
                                                        <div className="form-group mt-2">
                                                            <Input type="password" onChange={handleSignUpChange} value={signupForm.password} name="password" className="form-style" style={{
                                                                padding: "13px 20px",
                                                                paddingLeft: "55px",
                                                                height: "48px",
                                                                width: "100%",
                                                                fontWeight: "500",
                                                                borderRadius: "4px",
                                                                fontSize: "14px",
                                                                lineHeight: "22px",
                                                                letterSpacing: "0.5px",
                                                                outline: "none",
                                                                color: "#c4c3ca",
                                                                backgroundColor: "#1f2029",
                                                                border: "none",
                                                                webkitTransition: "all 200ms linear",
                                                                transition: "all 200ms linear",
                                                                boxShadow: "0 4px 8px 0 rgba(21,21,21,.2)"
                                                            }}
                                                                placeholder="Password" id="password" autocomplete="off" />
                                                            <i className="input-icon">
                                                                <i class="fa fa-key" aria-hidden="true"></i>
                                                            </i>
                                                        </div>
                                                        <br></br>
                                                        {signupbtn}
                                                    </Form>
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
    )
}

export default LoginPageComponent
