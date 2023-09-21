import PropTypes from 'prop-types'

import { ToyPreview } from './ToyPreview.jsx'

export function ToyList({ toys, onRemoveToy }) {

    return (
        <div className="toy-list">
        {toys.map(toy => (
          <ToyPreview 
            toy={toy}
            key={toy._id} 
            onRemoveToy={onRemoveToy}
          />
        ))}
      </div>
        // <ul className="car-list">
        //     {cars.map(car =>
        //         <li className="car-preview" key={car._id}>
        //             <CarPreview car={car} />
        //             <div>
        //                 <button onClick={() => onRemoveCar(car._id)}>x</button>
        //                 <button onClick={() => onEditCar(car)}>Edit</button>
        //             </div>
        //             <button className="buy" onClick={() => addToCart(car)}>Add to Cart</button>
        //         </li>
        //     )}
        // </ul>
    )
}