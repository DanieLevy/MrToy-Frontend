import { Link, useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import { REMOVE_TOY } from "../store/reducers/toy.reducer"

export function ToyPreview({ toy, onRemoveToy }) {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  // to show the toy details : name, price, labels, instock
  return (
    <section className="toy-preview-container">
    <div className="toy-preview">
      <h3>{toy.name}</h3>
      <h4>{toy.price}$</h4>
      {toy.labels &&
        toy.labels.map((label) => <span key={label}>{label}</span>)}

      {toy.inStock ? <h4 className="stock-label in">In Stock</h4> : <h4 className="stock-label out">Out of Stock</h4>}

      <section className="toy-preview-btns">
      <button className="preview-btn" onClick={() => navigate(`/toy/${toy._id}`)}>Details</button>
      <button className="preview-btn" onClick={() => navigate(`/toy/edit/${toy._id}`)}>Edit</button>
      <button className="preview-btn" onClick={() => onRemoveToy(toy._id)}>Delete</button>
      </section>
    </div>
    </section>
  )
}
