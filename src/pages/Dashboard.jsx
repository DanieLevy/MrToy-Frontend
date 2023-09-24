import React, { useEffect } from "react"
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js"
import { Doughnut } from "react-chartjs-2"
import { useSelector } from "react-redux"
import { loadToys } from "../store/actions/toy.actions"
import { showErrorMsg } from "../services/event-bus.service"

ChartJS.register(ArcElement, Tooltip, Legend)

export function Dashboard() {
  const toys = useSelector((storeState) => storeState.toyModule.toysBeforeSlice)

  useEffect(() => {
    loadToys().catch((err) => {
      console.log("err:", err)
      showErrorMsg("Cannot load toys")
    })
  }, [])

  const labelsCount = []

  toys.forEach((toy) => {
    toy.labels.forEach((label) => {
      const labelIdx = labelsCount.findIndex((labelCount) => {
        return labelCount.label === label
      })
      if (labelIdx === -1) {
        labelsCount.push({ label, count: 1 })
      } else {
        labelsCount[labelIdx].count++
      }
    })
  })

  const countsArray = labelsCount.map((item) => item.count)

  const data = {
    labels: [
      "Doll",
      "Outdoor",
      "Baby",
      "Art",
      "Puzzle",
      "Battery Powered",
      "Box Game",
      "On Wheels",
    ],
    datasets: [
      {
        label: "Toys per label",
        data: countsArray,
        backgroundColor: [
          "rgba(255, 99, 132, 0.7)",
          "rgba(54, 162, 235, 0.7)", 
          "rgba(255, 206, 86, 0.7)", 
          "rgba(75, 192, 192, 0.7)", 
          "rgba(153, 102, 255, 0.7)",
          "rgba(255, 159, 64, 0.7)", 
          "rgba(100, 200, 100, 0.7)",
          "rgba(200, 100, 200, 0.7)", 
        ],
        hoverBackgroundColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)", 
          "rgba(75, 192, 192, 1)", 
          "rgba(153, 102, 255, 1)", 
          "rgba(255, 159, 64, 1)", 
          "rgba(100, 200, 100, 1)",
          "rgba(200, 100, 200, 1)", 
        ],
        borderWidth: 1,
      },
    ],
  }

  if (!toys) return <div>Loading...</div>

  return (
    <div className="dashboard-container">
      <h1>Dashboard</h1>
      <h2>Number of toys per label</h2>
      <h3>Here you can see how many toys we have per label</h3>
      <article className="toy-labels-dashboard">
        <Doughnut data={data} 
        className="doughnut"/>
      </article>
    </div>
  )
}
