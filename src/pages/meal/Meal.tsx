import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';


export type Props = {
  strMeal : string,
  strMealThumb: string,
  idMeal: string
  rateMeal?: number
  strCategory?: string
}

export default function Meal() {

    let {land} = useParams<string>()
    let {meal_id} = useParams<string>()

    let [singleMeal, setSingleMeal] = useState<Props | null>(null)

    useEffect(() => {
        const url = "https://www.themealdb.com/api/json/v1/1/filter.php?a="+land;
        axios.get(url).then((res)=>{
            setSingleMeal(res.data.meals.filter((meal:Props)=>meal.idMeal === meal_id)[0])
            console.log('Filter meals => ', res.data.meals.filter((meal:Props)=>meal.idMeal === meal_id)[0]);
        })
    }, [land, meal_id])

  return (
    <div id='Meal'>
        <h1>Meal Category</h1>
        <h2>{land}</h2>
        <h1>{singleMeal?.strMeal}</h1>
        <img src={singleMeal?.strMealThumb} alt="Meal Thumb" /> 
    </div>
  )
}
