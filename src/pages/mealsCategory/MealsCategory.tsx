import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

export type Props = {
    strMeal : string,
    strMealThumb: string,
    idMeal: string
  }

export default function Meals() {

    let {category} = useParams()

    let [meals, setMeals] = useState<Props[] | null>(null)

    useEffect(() => {
        const url = "https://www.themealdb.com/api/json/v1/1/filter.php?a="+category;
        axios.get(url).then((res)=>{
            console.log(res);
            setMeals(res.data.meals)
        })
    }, [category])

  return (
    <div id='Meals'>
        <h2>Meals Categories</h2>
        {<h1>{category}</h1>}
        <div style={{display: 'flex', flexWrap: 'wrap'}} >
                { meals?.map((meal)=>(
                        <div style={{width:'200px'}} key={meal.idMeal}>
                            <Link to={'/meals/'+category+'/'+meal.idMeal}> 
                                <h2>{meal.strMeal}</h2>
                                <img src={meal.strMealThumb} alt='Meal Thumb' width='100'/>
                            </Link>
                        </div>
                ))}
        </div>
    </div>
  )
}
