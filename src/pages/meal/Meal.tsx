import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';

type Props = {
    strMeal : string,
    strMealThumb: string,
    idMeal: string
  }

export default function Meal() {

    let {category} = useParams<string>()
    let {meal_id} = useParams<string>()

    let [singleMeal, setSingleMeal] = useState<Props | null>(null)

    useEffect(() => {
        const url = "https://www.themealdb.com/api/json/v1/1/filter.php?a="+category;
        axios.get(url).then((res)=>{
            setSingleMeal(res.data.meals.filter((meal:Props)=>meal.idMeal === meal_id)[0])
            console.log('Filter meals => ', res.data.meals.filter((meal:Props)=>meal.idMeal === meal_id)[0]);
        })

    }, [category, meal_id])

  return (
    <div id='Meal'>
        <h1>Meal Category</h1>
        <h2>{category}</h2>
        <h1>{singleMeal?.strMeal}</h1>
        <img src={singleMeal?.strMealThumb} alt="Meal Thumb" /> 
    </div>
  )
}
