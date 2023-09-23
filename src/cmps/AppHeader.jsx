import { useDispatch, useSelector } from "react-redux"
import { NavLink } from "react-router-dom"

import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js"

export function AppHeader() {
  const dispatch = useDispatch()

  return (
    <header className="app-header">
      <h1>Toys SHOP</h1>
      <nav>
        <NavLink to="/">Home</NavLink> |
        <NavLink to="/toy">Toys</NavLink> |
        <NavLink to="/about">About</NavLink>
      </nav>
    </header>
  )
}
