import { toyService } from "../../services/toy.service.js"

export const SET_TOYS = "SET_TOYS"
export const SET_TOYS_BEFORE_SLICE = "SET_TOYS_BEFORE_SLICE"
export const REMOVE_TOY = "REMOVE_TOY"
export const ADD_TOY = "ADD_TOY"
export const UPDATE_TOY = "UPDATE_TOY"

export const SET_FILTER_BY = "SET_FILTER_BY"
export const SET_IS_LOADING = "SET_IS_LOADING"

export const TOY_UNDO = "TOY_UNDO"
export const TOGGLE_MODAL = "TOGGLE_MODAL"

const initialState = {
  toys: [],
  toysBeforeSlice: 0,
  lastToys: [],
  filterBy: toyService.getDefaultFilter(),
  isLoading: false,
}

export function toyReducer(state = initialState, action) {
  let toys, lastToys
  switch (action.type) {
    // TOYS
    case SET_TOYS:
      lastToys = [...state.toys]
      return { ...state, toys: action.toys, lastToys }

    case SET_TOYS_BEFORE_SLICE:
      return { ...state, toysBeforeSlice: action.toysBeforeSlice }
       
    case REMOVE_TOY:
      lastToys = [...state.toys]
      toys = state.toys.filter((toy) => toy._id !== action.toyId)
      return { ...state, toys, lastToys }

    case ADD_TOY:
      toys = [...state.toys, action.toy]
      return { ...state, toys }

    case UPDATE_TOY:
      toys = state.toys.map((toy) =>
        toy._id === action.toy._id ? action.toy : toy
      )
      return { ...state, toys }

    case TOY_UNDO:
      return { ...state, toys: state.lastToys }

    // Filter
    case SET_FILTER_BY:
        return { ...state, filterBy: action.filterBy }
    // Loading
    case SET_IS_LOADING:
      return { ...state, isLoading: action.isLoading }

      case TOGGLE_MODAL:
        return { ...state, isModalShown: !state.isModalShown }
      
    // Default
    default:
      return state
  }
}
