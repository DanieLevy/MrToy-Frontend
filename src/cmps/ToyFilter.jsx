import { debounce } from "lodash"
import { useEffect, useRef, useState } from "react"

export function ToyFilter({ filterBy, onSetFilter }) {
  const [filterByToEdit, setFilterByToEdit] = useState({ ...filterBy })

  const debouncedSetFilter = useRef(debounce(onSetFilter, 500)).current

  useEffect(() => {
    debouncedSetFilter(filterByToEdit)
  }, [filterByToEdit])

  function handleChange(ev) {
    const { name, value, type, checked } = ev.target
    const val =
      type === "number" ? +value : type === "checkbox" ? checked : value

    if (name === "labels") {
      const labels = value.split(",")
      setFilterByToEdit({ ...filterByToEdit, labels })
      console.log("labels", filterByToEdit)
      return
    }

    setFilterByToEdit({ ...filterByToEdit, [name]: val })
    console.log(filterByToEdit)
  }

  return (
    <section className="toy-filter">
      <h2>Filter</h2>
      <form>
        <div className="search">
          <input
            type="text"
            id="txt"
            name="txt"
            className="search__input"
            placeholder="Search toys"
            value={filterByToEdit.txt}
            onChange={handleChange}
          />
          <svg className="search__icon" aria-hidden="true" viewBox="0 0 24 24">
            <g>
              <path d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z"></path>
            </g>
          </svg>
        </div>
        <label htmlFor="inStock">In Stock</label>
        <input
          type="checkbox"
          id="inStock"
          name="inStock"
          checked={filterByToEdit.inStock}
          onChange={handleChange}
        />
        <label htmlFor="sortBy">Sort By</label>
        <select
          id="sortBy"
          name="sortBy"
          value={filterByToEdit.sortBy}
          onChange={handleChange}
        >
          <option value="name">Name</option>
          <option value="price">Price</option>
          <option value="createdAt">Date</option>
        </select>
        <label htmlFor="maxPrice">Min Price</label>
        <input
          type="number"
          id="maxPrice"
          name="maxPrice"
          value={filterByToEdit.maxPrice}
          onChange={handleChange}
        />

        <label htmlFor="labels">Labels</label>
        <input
          type="text"
          id="labels"
          name="labels"
          value={filterByToEdit.labels}
          onChange={handleChange}
        />
        {/* // support sortDir asc/desc toggle - click changes state */}
        <button
          onClick={(ev) => {
            ev.preventDefault()
            setFilterByToEdit({
              ...filterByToEdit,
              sortDir: filterByToEdit.sortDir === "asc" ? "desc" : "asc",
            })
          }}
        >
          {filterByToEdit.sortDir === "asc" ? "⬇" : "⬆"}
        </button>
      </form>
    </section>
  )
}
