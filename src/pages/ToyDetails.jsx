import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { toyService } from "../services/toy.service"
import { showErrorMsg } from "../services/event-bus.service.js"
import { utilService } from "../services/util.service"

import TOY_LOGO from "../assets/img/toy-logo.png"
import { Margin, Padding } from "@mui/icons-material"


export function ToyDetails() {
  const { toyId } = useParams()
  const [toy, setToy] = useState(null)
  const navigate = useNavigate()

  const labels = utilService.getLabels()

  useEffect(() => {
    loadToy()
  }, [toyId])

  function loadToy() {
    toyService
      .getById(toyId)
      .then(setToy)
      .catch((err) => {
        console.log("Cannot load toy", err)
        showErrorMsg("Cannot load toy")
        navigate("/toy")
      })
  }

  if (!toy) return <div>Loading...</div>

  return (
    <section className="toy-details-container">
    <section className="toy-details">
      <h1>Toy Details</h1>
      <h2>{toy.name}</h2>
      <h3><span>Price: </span>{toy.price}$</h3>
      <div>
      <h3><span>Description: </span></h3>
      <h4>{toy.desc}</h4>
      </div>
      <div className="toy-labels">
        <h3>Labels:</h3>
        {toy.labels.map(toyLabel => {
          const label = labels.find(l => l.name === toyLabel)
          return (
            <span 
              key={toyLabel} 
              style={{backgroundColor: label.color}}
            >
              {toyLabel}
            </span>  
          )
        })}
      </div>
      <h4>{toy.inStock}</h4>
      <Link to={`/toy`}>Back</Link>
      
    </section>
    <section className="toy-img">
      <img src={TOY_LOGO} alt={toy.name} className="toy-img" />
      </section>
    </section>
  )
}
