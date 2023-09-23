import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { toyService } from "../services/toy.service"
import { showErrorMsg } from "../services/event-bus.service.js"
import { utilService } from "../services/util.service"

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
    <section className="toy-details">
      <h1>Toy Details</h1>
      <h2>{toy.name}</h2>
      <h3>{toy.price}$</h3>
      <div className="toy-labels">
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
  )
}
