import {Link} from 'react-router-dom'
import './Navigation.scss'

export default function Navigation() {

  return (
    <div id='Navigation'>

        <ul className='nav-list'>
            <li className='item'><Link to={'/'}>Home</Link></li>
            <li className='item'><Link to={'/drinks'}>Drinks</Link></li>
            <li className='item'><Link to={'/meals'}>Meals</Link></li>
            <li className='item'><Link to={'/rated-drinks'}>Rated Drinks</Link></li>   
            <li className='item'><Link to={'/rated-meals'}>Rated Meals</Link></li>
        </ul>
    </div>
  )
}
