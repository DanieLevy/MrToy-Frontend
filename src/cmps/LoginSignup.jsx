import React, { useState } from "react"
import { userService } from "../services/user.service.js"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js"

import LockOutlinedIcon from "@mui/icons-material/LockOutlined"
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined"
import { TOGGLE_MODAL } from "../store/reducers/toy.reducer.js"
import { useDispatch } from "react-redux"
import { login, logout } from "../store/actions/user.actions.js"

function getEmptyCredentials() {
  return {
    fullname: "",
    username: "",
    password: "",
  }
}

export function LoginSignup({ onSetUser }) {

  const dispatch = useDispatch()
  const [credentials, setCredentials] = useState(getEmptyCredentials())
  const [isSignupState, setIsSignupState] = useState(false)

  function handleCredentialsChange(ev) {
    const field = ev.target.name
    const value = ev.target.value
    setCredentials((credentials) => ({ ...credentials, [field]: value }))
  }

  function onSubmit(ev) {
    ev.preventDefault()
    if (isSignupState) {
      userService
        .signup(credentials)
        .then((user) => {
          onSetUser(user)
          showSuccessMsg("Signup successful")
          dispatch({ type: TOGGLE_MODAL })
        })
        .catch((err) => {
          console.log(err)
          showErrorMsg(`Error with signup: ${err}`)
        })
    } else {
      userService
        .login(credentials)
        .then((user) => {
          onSetUser(user)
          console.log("user", user);

          showSuccessMsg("Login successful")
          dispatch({ type: TOGGLE_MODAL })
        })
        .catch((err) => {
          console.log(err)
          showErrorMsg(`Error with login: ${err}`)
        })
    }
  }

  function onToggleSignupState(ev) {
    ev.preventDefault()
    setIsSignupState((isSignupState) => !isSignupState)
  }

  const { username, password, fullname } = credentials

  return (
    <section className={`login-modal ${isSignupState ? "signup" : ""}`}>
      <div className="login-modal-content">
        <div className="login-modal-header">
          <h2>{isSignupState ? "Signup" : "Login"}</h2>
          <span
            className="close"
            onClick={() => dispatch({ type: TOGGLE_MODAL })}
          >
            &times;
          </span>
        </div>
        <div className="login-modal-body">
          <form className="login-form" onSubmit={onSubmit}>
            <div className="input-container">
              <input
                type="text"
                name="username"
                value={username}
                placeholder="Username"
                onChange={handleCredentialsChange}
                required
                autoFocus
              />
              <span className="material-symbols-outlined">
                <PersonOutlineOutlinedIcon />
              </span>
            </div>
            {isSignupState && (
              <div className="input-container">
                <input
                  type="text"
                  name="fullname"
                  value={fullname}
                  placeholder="Full name"
                  onChange={handleCredentialsChange}
                  required
                />
                <span className="material-symbols-outlined">
                  <PersonOutlineOutlinedIcon />
                </span>
              </div>
            )}
            <div className="input-container">
              <input
                type="password"
                name="password"
                value={password}
                placeholder="Password"
                onChange={handleCredentialsChange}
                required
              />
              <span className="material-symbols-outlined">
                <LockOutlinedIcon />
              </span>
            </div>
            <button>{isSignupState ? "Signup" : "Login"}</button>
            <a href="#" onClick={onToggleSignupState}>
              {isSignupState
                ? "Already a member? Login"
                : "New user? Signup here"}
            </a>
          </form>
        </div>
      </div>
    </section>
  )
}
