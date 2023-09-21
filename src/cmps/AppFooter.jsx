

import { UserMsg } from './UserMsg.jsx'
import { useDispatch, useSelector } from 'react-redux'

export function AppFooter() {
    return (
        <footer>
            <h2>App Footer</h2>
            <h3>Toys in Stock: {useSelector((state) => state.toyModule.toys.length)}</h3>
            <UserMsg />
        </footer>
    )
}
