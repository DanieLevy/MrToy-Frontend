import { debounce } from "lodash"
import { useEffect, useRef, useState } from "react"

import {
  TextField,
  Checkbox,
  FormControlLabel,
  Button,
  InputLabel,
  FormControl,
} from "@mui/material"
import { Box, Typography } from "@mui/material"
import { Select, MenuItem } from "@mui/material"
import { Label } from "@mui/icons-material"

export function ToyFilter({ filterBy, onSetFilter }) {
  const [filterByToEdit, setFilterByToEdit] = useState({ ...filterBy })
  const debouncedSetFilter = useRef(debounce(onSetFilter, 500)).current

  const labelOptions = [
    "On wheels",
    "Box game",
    "Art",
    "Baby",
    "Doll",
    "Puzzle",
    "Outdoor",
    "Battery Powered",
  ]

  useEffect(() => {
    debouncedSetFilter(filterByToEdit)
  }, [filterByToEdit])

  function handleChange(ev) {
    const { name, value } = ev.target

    if (name === "inStock") {
      setFilterByToEdit((prevFilters) => ({
        ...prevFilters,
        inStock: !prevFilters.inStock,
      }))
      return
    }

    if (name === "labels") {
      setFilterByToEdit((prevFilters) => ({
        ...prevFilters,
        labels: value,
      }))
      return
    }

    setFilterByToEdit((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }))
  }

  return (
    // BUILD WITH MUI COMPONENTS
    <Box sx={{ p: 2 }}>
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

      <Typography variant="h6">Filters</Typography>

      <Box component="form" sx={{ display: "flex", gap: 2 }}>
        <FormControlLabel
          control={
            <Checkbox
              checked={filterByToEdit.inStock}
              onChange={handleChange}
              name="inStock"
            />
          }
          label="In Stock"
        />

        <FormControl>
          <InputLabel id="sortBy-label">Sort By</InputLabel>
          <Select
            labelId="sortBy-label"
            label="Sort By"
            id="sortBy"
            name="sortBy"
            value={filterByToEdit.sortBy}
            onChange={handleChange}
          >
            <MenuItem value="name">Name</MenuItem>
            <MenuItem value="price">Price</MenuItem>
            <MenuItem value="createdAt">Date</MenuItem>
          </Select>
        </FormControl>

        <Button
          onClick={() =>
            setFilterByToEdit((prevFilter) => ({
              ...prevFilter,
              sortDir: prevFilter.sortDir === "asc" ? "desc" : "asc",
            }))
          }
        >
          {filterByToEdit.sortDir === "asc" ? "asc" : "desc"}
        </Button>

        <TextField
          label="Max Price"
          name="maxPrice"
          type="number"
          value={filterByToEdit.maxPrice}
          onChange={handleChange}
        />

        <FormControl>
          <InputLabel id="labels-label">Labels</InputLabel>
          <Select
            labelId="labels-label"
            label="Labels"
            id="labels"
            name="labels"
            value={filterByToEdit.labels}
            onChange={handleChange}
            multiple
          >
            {labelOptions.map((label) => (
              <MenuItem key={label} value={label}>
                {label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
    </Box>
  )
}

{
  /* <section className="toy-filter">
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
  <article className="filter-by">
    <div>
      <label htmlFor="inStock">In Stock</label>
      <input
        type="checkbox"
        id="inStock"
        name="inStock"
        checked={filterByToEdit.inStock}
        onChange={handleChange}
      />
    </div>
    <h1>|</h1>
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
    <h1>|</h1>
    <label htmlFor="maxPrice">Min Price</label>
    <input
      type="number"
      id="maxPrice"
      name="maxPrice"
      value={filterByToEdit.maxPrice}
      onChange={handleChange}
    />
    <h1>|</h1>
    <label htmlFor="labels">Labels</label>
    <input
      type="text"
      id="labels"
      name="labels"
      placeholder="Doll, Funny.."
      value={filterByToEdit.labels}
      onChange={handleChange}
    />
    <h1>|</h1>
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
  </article>
</form>
</section> */
}
