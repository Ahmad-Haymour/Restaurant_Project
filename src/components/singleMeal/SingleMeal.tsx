import React from 'react'
import { Link, useParams } from 'react-router-dom'

export type Props = {
    strMeal : string,
    strMealThumb: string,
    idMeal: string
    rateMeal?: number
    strCategory?: string
}

export default function SingleMeal({meal, handleRateMeal}:Props[] | any) {

    let {land} = useParams()
  return (
    <div>SingleMeal
         <div style={{width:'200px'}} key={meal.idMeal}>
                <Link to={'/meals/'+land+'/'+meal.idMeal}> 
                        <h2>{meal.strMeal}</h2>
                        <img src={meal.strMealThumb} alt='Meal Thumb' width='100'/>
                </Link>
                <div className='vote-wrapper' style={{display:'flex', gap: '.5rem', justifyContent: 'center'}}>
                        {
                        Array.from(Array(10)).map(( _, i) => <button key={i} style={{backgroundColor:'lightgray', padding:'.1rem'}} 

                        onClick={(e)=> handleRateMeal(e, meal)}
                        >{i + 1}</button> )
                                }
                </div>
        </div>
    </div>
  )
}
