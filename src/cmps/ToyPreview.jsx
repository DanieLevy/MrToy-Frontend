import { Link, useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import { REMOVE_TOY } from "../store/reducers/toy.reducer"
import TOY_LOGO from "../assets/img/toy-logo.png"
import { utilService } from "../services/util.service"


export function ToyPreview({ toy, onRemoveToy }) {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const labels = utilService.getLabels()

  // to show the toy details : name, price, labels, instock
  return (
      <div className="toy-card">
        <div className="toy-price">${toy.price}</div>

        {toy.inStock ? (
          <h4 className="stock-label in">In Stock</h4>
        ) : (
          <h4 className="stock-label out">Out of Stock</h4>
        )}

        <img src={TOY_LOGO} alt={toy.name} className="toy-img" />

        <div className="toy-name">{toy.name}</div>

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

        <article className="toy-preview-btns">
          <button
            className="preview-btn"
            onClick={() => navigate(`/toy/${toy._id}`)}
          >
            Details
          </button>
          <button
            className="preview-btn"
            onClick={() => navigate(`/toy/edit/${toy._id}`)}
          >
            Edit
          </button>
          <button className="preview-btn" onClick={() => onRemoveToy(toy._id)}>
            Delete
          </button>
        </article>
      </div>
  )
}
