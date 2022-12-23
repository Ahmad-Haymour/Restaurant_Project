import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import "./SingleDrink.scss"

export type Props = {
    strDrink : string,
    strDrinkThumb: string,
    idDrink: string,
    rateDrink?: number
    strCategory?: string
  }

export default function SingleDrink({drink, handleRateDrink, localStorageDrinks}: Props[] | any) {

    let {category} = useParams<string>()

    let foundDrink = localStorageDrinks.find((ratedDrink:Props) => ratedDrink.idDrink === drink.idDrink)

  return (
    <div id='SingleDrink' 
         style={{width:'200px', border:'2px solid black', margin:'0 auto'}} 
         key={drink.idDrink}
    >
            <Link to={'/categories/'+category+'/'+drink.idDrink}> 
                <h2>{drink.strDrink}</h2>
                <img src={drink.strDrinkThumb} alt='Drink Thumb' width='100'/>
            </Link>
            <div className='vote-wrapper' style={{display:'flex', gap: '.5rem', justifyContent: 'center'}}>
                {
                    Array.from(Array(10)).map(( _, i) => (
                    
                        <div className={(foundDrink?.rateDrink && foundDrink.rateDrink == i+1 ) ? 'rated-active':'none-active'} 
                            
                             key={i+1} style={{backgroundColor:'lightgray', padding:'.1rem'}} 

                             onClick={(e)=> handleRateDrink(e, drink)}
                        >
                            {i + 1}
                        </div> 
                    ))
                }
            </div>
    </div>
  )
}
