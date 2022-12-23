import React from 'react'
import { Link, useParams } from 'react-router-dom'

export type Props = {
    strDrink : string,
    strDrinkThumb: string,
    idDrink: string,
    rateDrink?: number
    strCategory?: string
  }

export default function SingleDrink({drink, handleRateDrink}: Props[] | any) {

    let {category} = useParams<string>()

  return (
    <div>SingleDrink
         <div style={{width:'200px', border:'2px solid black', margin:'0 auto'}} key={drink.idDrink}>
              <Link to={'/categories/'+category+'/'+drink.idDrink}> 
                <h2>{drink.strDrink}</h2>
                <img src={drink.strDrinkThumb} alt='Drink Thumb' width='100'/>
              </Link>
              <div className='vote-wrapper' style={{display:'flex', gap: '.5rem', justifyContent: 'center'}}>
                {
                  Array.from(Array(10)).map(( _, i) => <button key={i} style={{backgroundColor:'lightgray', padding:'.1rem'}} 
                  onClick={(e: React.MouseEvent<HTMLElement>)=> handleRateDrink(e, drink)}
                  >{i + 1}</button> )
                }
                {/* event: React.MouseEvent<HTMLElement>, drink: Props */}
              </div>
            </div>
    </div>
  )
}
