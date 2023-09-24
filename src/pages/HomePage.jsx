import BG_IMG from "../assets/img/hero-store.png"

import { useDispatch, useSelector } from "react-redux"
import { NavLink, useNavigate } from "react-router-dom"

export function HomePage() {
  const dispatch = useDispatch()

  return (
    <section className="home-page-container">
      <img src={BG_IMG} alt="toys" />
      <div className="home-page">
        <h1>Welcome to the Toys Shop</h1>
        <p>Our shop is the best, visit us and you will be happy</p>
        {/* button to go into the store - navigate */}
        <button className="home-page-btn">
          <NavLink to="/toy">Go to Store</NavLink>
        </button>
      </div>
    </section>
  )
}
