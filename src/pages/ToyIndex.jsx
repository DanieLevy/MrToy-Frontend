import { useDispatch, useSelector } from "react-redux"
import { ToyFilter } from "../cmps/ToyFilter.jsx"
import { ToyList } from "../cmps/ToyList.jsx"
import { showSuccessMsg, showErrorMsg } from "../services/event-bus.service.js"
import { useEffect } from "react"
import { loadToys, removeToy, saveToy } from "../store/actions/toy.actions.js"
import { toyService } from "../services/toy.service.js"
import { SET_FILTER_BY } from "../store/reducers/toy.reducer.js"

export function ToyIndex() {

  const dispatch = useDispatch()
  const toys = useSelector((storeState) => storeState.toyModule.toys)
  const filterBy = useSelector((storeState) => storeState.toyModule.filterBy)
  const isLoading = useSelector((storeState) => storeState.toyModule.isLoading)

  useEffect(() => {
    console.log("useEffect - loadToys");
    loadToys()
        .catch((err) => {
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

  // function onEditCar(car) {
  //     const price = +prompt('New price?', car.price)
  //     const carToSave = { ...car, price }
  //     saveCar(carToSave)
  //         .then(savedCar => {
  //             showSuccessMsg(`Car updated to price: $${savedCar.price}`)
  //         })
  //         .catch(err => {
  //             console.log('Cannot update car', err)
  //             showErrorMsg('Cannot update car')
  //         })
  // }

  // function addToCart(car) {
  //     console.log(`Adding ${car.vendor} to Cart`)
  //     dispatch({ type: ADD_CAR_TO_CART, car })
  //     showSuccessMsg('Added to Cart')
  // }

  // function onSetFilter(filterBy) {
  //     dispatch({ type: SET_FILTER_BY, filterBy })
  // }

  // TODO:
  // filterBy
  // add random toy

  if (isLoading) return <div>Loading...</div>

  return (
    <div>
      <h3>Toy Index</h3>
      <button onClick={onAddToy}>Add Toy</button>
      <ToyFilter filterBy={filterBy} onSetFilter={onSetFilter} />
      <ToyList toys={toys} key={toys._id} onRemoveToy={onRemoveToy} />
    </div>
  )
}
