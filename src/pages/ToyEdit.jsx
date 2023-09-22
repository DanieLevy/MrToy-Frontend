// toy edit
import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { toyService } from "../services/toy.service"
import { saveToy } from "../store/actions/toy.actions"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js"

// import MUI cmps
import { Button, Checkbox, FormControlLabel, TextField } from '@mui/material';
import { Box, Typography } from '@mui/material';
import { Select } from '@mui/material';
import { MenuItem } from '@mui/material';

export function ToyEdit() {
  const { toyId } = useParams()
  const [toy, setToy] = useState(null)
  const navigate = useNavigate()

  const labels = [
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
    const { name, value } = ev.target
  
    if (name === 'labels') {
      setToy(prevToy => ({
        ...prevToy,  
        labels: value
      }))
      return
    }
  
    setToy(prevToy => ({
      ...prevToy,
      [name]: value      
    }))
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

  // build this cmp using MUI (Material UI)
  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h4" gutterBottom>
        Toy Edit
      </Typography>

      <Box
        component="form"
        onSubmit={onSaveToy}
        sx={{
          '& .MuiTextField-root': { m: 1, width: '25ch' },
        }}
        noValidate
        autoComplete="off"
        className="edit-container"
      >
        <TextField
          label="Id"
          id="id"
          name="id" 
          value={toy._id}
          inputProps={{ readOnly: true }}
          disabled
        />

        <TextField
          label="Name"
          id="name"
          name="name"
          value={toy.name}
          onChange={handleChange}
        />

        <TextField 
          label="Price"
          id="price"
          name="price"
          type="number"
          value={toy.price}
          onChange={handleChange}
        />

        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={toy.labels}
          onChange={handleChange}
          name="labels"
          multiple
        >
          {labels.map((label) => (
            <MenuItem key={label} value={label}>
              {label}
            </MenuItem>
          ))}
        </Select>


        <FormControlLabel
          control={
            <Checkbox
              checked={toy.inStock}
              onChange={handleChange}
              name="inStock"
            />
          }
          label="In Stock"
        />

        <Button type="submit" variant="contained">
          Save
        </Button>
      </Box>

      <Button component={Link} to="/toy">
        Back
      </Button>
    </Box>
  )
}


{/* <section className="edit-container">
<h1>Toy Edit</h1>
<form onSubmit={onSaveToy}>
  <label htmlFor="id" className="input_label">
    Id
  </label>
  <input type="text" id="id" name="id" value={toy._id} disabled />
  <div>

  <label htmlFor="name" className="input_label">
    Name
  </label>

  <input
    type="text"
    id="name"
    name="name"
    value={toy.name}
    onChange={handleChange}
    />
  <label htmlFor="price" className="input_label">
    Price
  </label>
  <input
    type="number"
    id="price"
    name="price"
    value={toy.price}
    onChange={handleChange}
    />
    </div>
    <div>

  <label htmlFor="labels" className="input_label">
    Labels
  </label>
  <input
    type="text"
    id="labels"
    name="labels"
    value={toy.labels}
    onChange={handleChange}
    />
    <label htmlFor="inStock" className="input_label">
    In Stock
  </label>
  <input
    type="checkbox"
    id="inStock"
    name="inStock"
    checked={toy.inStock}
    onChange={handleChange}
    />
    
    </div>
  <button>Save</button>
</form>
<Link to={`/toy`}>Back</Link>
</section> */}