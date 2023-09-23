import { useDispatch, useSelector } from 'react-redux'

export function AppFooter() {
    return (
        <footer>
            <div className='copyrights-container'>

            <h2>&copy; Copyrights 2023{' '}<span className='copyrights'>Daniel Levy</span></h2>
            </div>
            <div>

            <h3>Toys in Stock: {useSelector((state) => state.toyModule.toys.length)}</h3>
            </div>

        </footer>
    )
}
