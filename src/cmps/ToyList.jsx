import { ToyPreview } from "./ToyPreview.jsx"
import { CSSTransition, TransitionGroup } from "react-transition-group"

export function ToyList({ toys, onRemoveToy }) {
  return (
    <TransitionGroup component={null}>
    <section className="toy-list">
      {toys.map((toy) => (
        <CSSTransition
          key={toy._id}
          timeout={500}
        >
          <ToyPreview toy={toy} onRemoveToy={onRemoveToy} />
        </CSSTransition>
      ))}
    </section>
    </TransitionGroup>
  )
}
