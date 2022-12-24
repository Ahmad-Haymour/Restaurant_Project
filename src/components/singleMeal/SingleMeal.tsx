import { Link, useParams } from 'react-router-dom'
import "./SingleMeal.scss"

export type Props = {
    strMeal : string,
    strMealThumb: string,
    idMeal: string
    rateMeal?: number
    strCategory?: string
}

export default function SingleMeal({meal, handleRateMeal, localStorageMeals}:Props[] | any) {

    let {land} = useParams()

    let foundMeal = localStorageMeals.find((ratedMeal:Props) => ratedMeal.idMeal === meal.idMeal)

  return (
    <div  id='SingleMeal'
          style={{width:'250px', margin:'0 auto'}} 
          key={meal.idMeal}
    >
            <Link to={'/meals/'+land+'/'+meal.idMeal}> 
                        <h3>{meal.strMeal.length > 20 ?meal.strMeal.slice(0,20)+'...' :meal.strMeal}</h3>
                        <img src={meal.strMealThumb} alt='Meal Thumb' width='150'/>
            </Link>
            <div className='vote-wrapper' style={{display:'flex', gap: '.5rem', justifyContent: 'center'}}>
                    {
                        Array.from(Array(10)).map(( _, i) => 
                            <div key={i} 
                            style={{padding:'.1rem', cursor:'pointer', color:'cornflowerblue'}} 
                            className={(foundMeal?.rateMeal && foundMeal.rateMeal === i + 1) ? 'rate active':'rate'}
                                onClick={(e)=> handleRateMeal(e, meal)}>
                                {i + 1}
                            </div> 
                        )
                    }
            </div>
    </div>
  )
}
