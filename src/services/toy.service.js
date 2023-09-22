import { utilService } from "./util.service.js"
import { httpService } from "./http.service.js"

const BASE_URL = "toy/"

export const toyService = {
  query,
  getById,
  save,
  remove,
  getEmptyToy,
  getDefaultFilter,
}

function query(filterBy = {}) {
  return httpService.get(BASE_URL, filterBy)
}

function getById(toyId) {
  return httpService.get(BASE_URL + toyId)
}

function remove(toyId) {
  // return Promise.reject('Oh no!')
  return httpService.delete(BASE_URL + toyId)
}

function save(toy) {
  if (toy._id) {
    return httpService.put(BASE_URL, toy)
  } else {
    return httpService.post(BASE_URL, toy)
  }
}

function getEmptyToy() {
  return {
    name: utilService.makeLorem(3),
    price: utilService.getRandomIntInclusive(10, 100),
    labels: utilService.getRandomLabels(),
    createdAt: Date.now(),
    inStock: utilService.getRandomIntInclusive(0, 1) ? true : false,
  }
}

function getDefaultFilter() {
  return {
    txt: "",
    inStock: false,
    sortBy: "name",
    maxPrice: 0,
    labels: [],
    sortDir: "asc",
    pageIdx: 1,
  }
}