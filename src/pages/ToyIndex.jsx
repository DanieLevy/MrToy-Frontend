import { useDispatch, useSelector } from "react-redux"
import { ToyFilter } from "../cmps/ToyFilter.jsx"
import { ToyList } from "../cmps/ToyList.jsx"
import { showSuccessMsg, showErrorMsg } from "../services/event-bus.service.js"
import { useEffect } from "react"
import { loadToys, removeToy, saveToy } from "../store/actions/toy.actions.js"
import { toyService } from "../services/toy.service.js"
import { SET_FILTER_BY } from "../store/reducers/toy.reducer.js"
import { Pagination, PaginationItem } from "@mui/material"

import ArrowBackIcon from "@mui/icons-material/ArrowBack"
import ArrowForwardIcon from "@mui/icons-material/ArrowForward"

export function ToyIndex() {
  const dispatch = useDispatch()
  const toys = useSelector((storeState) => storeState.toyModule.toys)
  const filterBy = useSelector((storeState) => storeState.toyModule.filterBy)
  const isLoading = useSelector((storeState) => storeState.toyModule.isLoading)
  const toysBeforeSlice = useSelector(
    (storeState) => storeState.toyModule.toysBeforeSlice
  )

  useEffect(() => {
    loadToys().catch((err) => {
      console.log("err:", err)
      showErrorMsg("Cannot load cars")
    })
  }, [filterBy])

  function onRemoveToy(toyId) {
    removeToy(toyId)
      .then(() => {
        showSuccessMsg(`Toy ${toyId} was removed successfully`)
      })
      .catch((err) => {
        console.log("err:", err)
        showErrorMsg("Cannot remove toy")
      })
  }

  function onAddToy() {
    const toyToSave = toyService.getEmptyToy()
    saveToy(toyToSave)
      .then((savedToy) => {
        showSuccessMsg(`Toy added (id: ${savedToy._id})`)
      })
      .catch((err) => {
        console.log("Cannot add toy", err)
        showErrorMsg("Cannot add toy")
      })
  }

  function onSetFilter(filterBy) {
    dispatch({ type: SET_FILTER_BY, filterBy })
  }

  function onPageChange(pageIdx) {
    console.log("pageIdx:", pageIdx)
    onSetFilter({ ...filterBy, pageIdx })
  }

  if (isLoading) return <div>Loading...</div>

  return (
    <section className="toy-index">
      <h3>Toy Index</h3>
      <button onClick={onAddToy}>Add Toy</button>
      <ToyFilter filterBy={filterBy} onSetFilter={onSetFilter} />
      <ToyList toys={toys} key={toys._id} onRemoveToy={onRemoveToy} />
      
      <section className="pagination-container">
        <Pagination
          count={Math.ceil(toysBeforeSlice / 6)}
          onChange={(ev, page) => onPageChange(page)}
          renderItem={(item) => (
            <PaginationItem
              slots={{ previous: ArrowBackIcon, next: ArrowForwardIcon }}
              {...item}
            />
          )}
        />
      </section>
      
    </section>
  )
}
