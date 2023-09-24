import { useDispatch, useSelector } from "react-redux"
import { NavLink, useNavigate } from "react-router-dom"
import Hamburger from 'hamburger-react'
import USER_IMG from "../assets/img/user.png"

import { LoginSignup } from "./LoginSignup.jsx"
import { logout } from "../store/actions/user.actions.js"
import { SET_USER } from "../store/reducers/user.reducer.js"
import { TOGGLE_MODAL } from "../store/reducers/toy.reducer.js"
import React, { useEffect, useState } from "react"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js"
import SCORE_LOGO from "../assets/img/score.png"
import { UserMsg } from "./UserMsg.jsx"

export function AppHeader() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const isModalShown = useSelector(
    (storeState) => storeState.toyModule.isModalShown
  )
  const user = useSelector((storeState) => storeState.userModule.user)
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768)
  const [isOpen, setOpen] = useState(false)

  useEffect(() => {
    isModalShown
      ? document.querySelector(".app-main").classList.add("blur")
      : document.querySelector(".app-main").classList.remove("blur")
  }, [isModalShown])

  useEffect(() => {
    window.addEventListener("resize", () => {
      window.innerWidth < 768 ? setIsMobile(true) : setIsMobile(false)
    })
    return () => {
      window.removeEventListener("resize", () => {
        window.innerWidth < 768 ? setIsMobile(true) : setIsMobile(false)
      })
    }
  }, [])

  const handleOutsideClick = (ev) => {
    if (isModalShown && !ev.target.closest(".login-modal")) {
      console.log("outside click")
      dispatch({ type: TOGGLE_MODAL })
    }
  }

  useEffect(() => {
    document.addEventListener("click", handleOutsideClick)
    return () => {
      document.removeEventListener("click", handleOutsideClick)
    }
  }, [isModalShown])

  function onSetUser(user) {
    dispatch({ type: SET_USER, user })
  }

  function onLogout() {
    logout()
      .then(() => {
        showSuccessMsg("Logged out successfully")
      })
      .catch((err) => {
        console.log(err)
        showErrorMsg("Error logging out")
      })
  }

  return (
    <React.Fragment>
      <header className="app-header">
        <h1>Toys SHOP</h1>
        {!isMobile && (
        <nav>
          <NavLink to="/">Home</NavLink> |<NavLink to="/toy">Toys</NavLink> |
          <NavLink to="/about">About</NavLink> |
          <NavLink to="/dashboard">Dashboard</NavLink>
        </nav>
        )}
        <div className="user-info">
          {!user && (
            <button
              onClick={(ev) => {
                ev.stopPropagation()
                dispatch({ type: TOGGLE_MODAL })
                console.log("user", user)
              }}
            >
              Login / Signup
            </button>
          )}
          {user && !isMobile && (
            <div className="user-info">
              <img src={USER_IMG} alt="user" className="user-img" />
              <span>Hello {user.fullname}</span>
              <span className="sep"> | </span>
              <span className="user-score" title="Score">
                {user.score}
              </span>
              <img src={SCORE_LOGO} alt="score" className="score-logo" />
              <span className="sep"> | </span>

              <button onClick={onLogout} title="Logout">
                Logout
              </button>
            </div>
          )}
          {user && isMobile && (
            <div className="user-info">
              <img src={USER_IMG} alt="user" className="user-img" />
              <span>Hello {user.fullname}</span>
              <span className="sep"> | </span>
              <button onClick={onLogout} title="Logout">
                Logout
              </button>
            </div>
          )}
        </div>
        {isModalShown && <LoginSignup onSetUser={onSetUser} />}
        {isMobile && 
        <Hamburger toggled={isOpen} toggle={setOpen} />
        }
        {isMobile && isOpen && (
          <aside className="mobile-nav" onClick={() => setOpen(false)} >
            <NavLink to="/">Home</NavLink>
            <NavLink to="/toy">Toys</NavLink> 
            <NavLink to="/about">About</NavLink> 
            <NavLink to="/dashboard">Dashboard</NavLink>
          </aside>
        )}
      </header>
      <UserMsg />
    </React.Fragment>
  )
}
