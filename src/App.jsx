// Import Packages
import { Provider } from "react-redux"
import { HashRouter as Router, Routes, Route } from "react-router-dom"
import { store } from "./store/store"
import "./assets/style/main.css"

// Import Pages
import { AppHeader } from "./cmps/AppHeader"
import { AppFooter } from "./cmps/AppFooter"

import { HomePage } from "./pages/HomePage"
import { ToyIndex } from "./pages/ToyIndex"
import { AboutUs } from "./pages/AboutUs"
import { ToyDetails } from "./pages/ToyDetails"
import { ToyEdit } from "./pages/ToyEdit.jsx"

export default function App() {
  return (
    <Provider store={store}>
      <Router>
        <section className="main-layout app">
          <AppHeader />
          <main>
            <Routes>
              <Route element={<HomePage />} path="/" />
              <Route element={<AboutUs />} path="/about" />
              <Route element={<ToyIndex />} path="/toy" />
              <Route element={<ToyDetails />} path="/toy/:toyId" />
              <Route element={<ToyEdit />} path="/toy/edit/:toyId" />
              <Route path="*" element={<h1>Not Found!</h1>} />
            </Routes>
          <AppFooter />
          </main>
        </section>
      </Router>
    </Provider>
  )
}
