// import { carService } from "../../services/car.service.js";
// import { ADD_CAR, CAR_UNDO, REMOVE_CAR, SET_CARS, SET_IS_LOADING, UPDATE_CAR } from "../reducers/toy.reducer.js";
import { store } from "../store.js"
import { toyService } from "../../services/toy.service.js"
import {
  ADD_TOY,
  REMOVE_TOY,
  SET_IS_LOADING,
  SET_TOYS,
  SET_TOYS_BEFORE_SLICE,
  TOY_UNDO,
  UPDATE_TOY,
} from "../reducers/toy.reducer.js"

// LOAD
export function loadToys() {
  const { filterBy } = store.getState().toyModule
  //   store.dispatch({ type: SET_IS_LOADING, isLoading: true })
  return toyService
    .query(filterBy)
    .then((toys) => {
      const toysBeforeSlice = toys.toysBeforeSlice
      toys = toys.toys
      store.dispatch({ type: SET_TOYS_BEFORE_SLICE, toysBeforeSlice })
      store.dispatch({ type: SET_TOYS, toys })
      return toys
    })
    .catch((err) => {
      console.log("TOY ACTION -> Cannot load toys", err)
      throw err
    })
    .finally(() => {
      //   store.dispatch({ type: SET_IS_LOADING, isLoading: false })
    })
}

// REMOVE
export function removeToy(toyId) {
  store.dispatch({ type: REMOVE_TOY, toyId })
  return toyService.remove(toyId).catch((err) => {
    store.dispatch({ type: TOY_UNDO })
    console.log("TOY ACTION -> Cannot remove toy", err)
    throw err
  })
}

// SAVE
export function saveToy(toy) {
  const type = toy._id ? UPDATE_TOY : ADD_TOY
  return toyService
    .save(toy)
    .then((toyToSave) => {
      store.dispatch({ type, toy: toyToSave })
      // render the updated list
      loadToys()
      return toyToSave
    })
    .catch((err) => {
      console.log("TOY ACTION -> Cannot save toy", err)
      throw err
    })
}
