import { Link, useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import { REMOVE_TOY } from "../store/reducers/toy.reducer"
import TOY_LOGO from "../assets/img/toy-logo.png"

export function ToyPreview({ toy, onRemoveToy }) {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  // to show the toy details : name, price, labels, instock
  return (
    <section className="toy-preview-container">
      <div className="toy-preview">
      {toy.inStock ? (
        <h4 className="stock-label in">In Stock</h4>
        ) : (
          <h4 className="stock-label out">Out of Stock</h4>
          )}
        <img src={TOY_LOGO} alt={toy.name} className="toy-preview-img" />
        <h3>{toy.name}</h3>
        <h4>{toy.price}$</h4>

        <article className="labels-container">
        {toy.labels &&
          toy.labels.map((label) => {
            const className = `label ${label
              .replace(/\s+/g, "-")
              .toLowerCase()}`
            return (
              <span key={label} className={className}>
                {label}
              </span>
            )
          })}
        </article>

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
    </section>
  )
}
