import { ToyPreview } from "./ToyPreview.jsx"

export function ToyList({ toys, onRemoveToy }) {
  return (
    <section className="toy-list">
      {toys.map((toy) => (
        <ToyPreview key={toy._id} toy={toy} onRemoveToy={onRemoveToy} />
      ))}
    </section>

  )
}
