// toy edit
import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { toyService } from "../services/toy.service"
import { saveToy } from "../store/actions/toy.actions"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js"

export function ToyEdit() {
  const { toyId } = useParams()
  const [toy, setToy] = useState(null)
  const navigate = useNavigate()

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

  function handleChange(ev) {
    const { name, value, type, checked } = ev.target
    const val =
      type === "number" ? +value : type === "checkbox" ? checked : value

    if (name === "labels") {
      const labels = value.split(",")
      setToy({ ...toy, labels })
      return
    }

    setToy({ ...toy, [name]: val })
  }

  function onSaveToy(ev) {
    ev.preventDefault()
    saveToy(toy)
      .then((savedToy) => {
        showSuccessMsg(`Toy saved (id: ${savedToy._id})`)
      })
      .catch((err) => {
        console.log("Cannot save toy", err)
        showErrorMsg("Cannot save toy")
      })
  }

  if (!toy) return <div>Loading...</div>

  return (
    <section className="edit-container">
      <h1>Toy Edit</h1>
      <form onSubmit={onSaveToy}>
        <label htmlFor="id" className="input_label">Id</label>
        <input type="text" id="id" name="id" value={toy._id} disabled />
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          name="name"
          value={toy.name}
          onChange={handleChange}
        />
        <label htmlFor="price" className="input_label">Price</label>
        <input
          type="number"
          id="price"
          name="price"
          value={toy.price}
          onChange={handleChange}
        />
        <label htmlFor="labels" className="input_label">Labels</label>
        <input
          type="text"
          id="labels"
          name="labels"
          value={toy.labels}
          onChange={handleChange}
        />
        <label htmlFor="inStock" className="input_label">In Stock</label>
        <input
          type="checkbox"
          id="inStock"
          name="inStock"
          checked={toy.inStock}
          onChange={handleChange}
        />
        <button>Save</button>
      </form>
      <Link to={`/toy`}>Back</Link>
    </section>
  )
}
