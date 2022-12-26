import {Link} from 'react-router-dom'
import Footer from '../footer/Footer'
import './Navigation.scss'

export default function Navigation({children}: any) {

  return (
    <div className='Navigation'>
      <div className='nav'>

          <ul className='nav-list'>
              <li className='item item-fade-up'><Link to={'/'}>Home</Link></li>
              <li className='item item-fade-up'><Link to={'/drinks'}>Drinks</Link></li>
              <li className='item item-fade-up'><Link to={'/meals'}>Meals</Link></li>
              <li className='item item-fade-up'><Link to={'/rated-drinks'}>Rated Drinks</Link></li>   
              <li className='item item-fade-up'><Link to={'/rated-meals'}>Rated Meals</Link></li>
          </ul>
      </div>
      <div className="children">
        {children}
      </div>
      <Footer/>
    </div>
  )
}
