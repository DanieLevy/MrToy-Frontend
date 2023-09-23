import { ToyPreview } from './ToyPreview.jsx'
import { CSSTransition, TransitionGroup } from 'react-transition-group'

export function ToyList({ toys, onRemoveToy }) {

    return (
      
<TransitionGroup component="div" className="toy-list">

{toys.map(toy => (

  <CSSTransition 
    key={toy._id} 
    timeout={150}
    classNames="toy"
    unmountOnExit
    appear
  >
    <ToyPreview toy={toy} onRemoveToy={onRemoveToy} />
  </CSSTransition>

))}

</TransitionGroup>
    )
}