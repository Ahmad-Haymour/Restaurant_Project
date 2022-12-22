import {Link} from 'react-router-dom'
import './Navigation.scss'


export default function Navigation({drinks}:any) {

  return (
    <div id='Navigation'>

        <ul className='nav-list'>
            <li className='item'><Link to={'/'}>Home</Link></li>
            <li className='item'><Link to={'/drinks'}>Drinks</Link></li>
            <li className='item'><Link to={'/meals'}>Meals</Link></li>
            <li className='item'><Link to={'/contact'}>Contact</Link></li>
            <li className='item'><Link to={'/rated-drinks'}>Rated</Link></li>   
        </ul>
    </div>
  )
}
