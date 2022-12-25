import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import './Meal.scss'

export type Props = {
  strMeal : string,
  strMealThumb: string,
  idMeal: string
  rateMeal?: number
  strCategory?: string
}

export type DetailsProps = {
  dateModified: string
  idMeal: string
  strCategory: string
  strMeal: string
  strMealThumb: string
  strTags: string
  strIngredient1: string
  strIngredient2: string
  strIngredient3:string
  strIngredient4: string
  strInstructions: string
  strInstructionsDE?: string
}

export default function Meal() {
    let {land} = useParams<string>()
    let {meal_id} = useParams<string>()
    let [singleMeal, setSingleMeal] = useState<Props | null>(null)
    let [mealDetails, setMealDetails] = useState<DetailsProps | null>(null)

    useEffect(() => {
        const url = "https://www.themealdb.com/api/json/v1/1/filter.php?a="+land;
        axios.get(url).then((res)=>{
            setSingleMeal(res.data.meals.filter((meal:Props)=>meal.idMeal === meal_id)[0])
            console.log('Filter meals => ', res.data.meals.filter((meal:Props)=>meal.idMeal === meal_id)[0]);
        })
    }, [land, meal_id])

    useEffect(()=>{
      const url = "https://www.themealdb.com/api/json/v1/1/lookup.php?i="+meal_id
      axios.get(url).then((res)=>{
        console.log('Meal Details: ', res.data)
        setMealDetails(res.data.meals[0])
    })
    }, [meal_id])

  return (
    <div id='Meal'>
        <img src={singleMeal?.strMealThumb} alt="Meal Thumb"/>
        <ul>
          <li><span className="white"> Area:&nbsp; </span> {land}</li>
          <li><span className="white">Meal:&nbsp; </span>{mealDetails?.strMeal}</li>
          <li><span className="white">Category:  </span>{mealDetails?.strCategory}</li>
          <li><span className="white">Tags:&nbsp;  </span>{mealDetails?.strTags}</li>
          {mealDetails &&<li><span className="white">Ingredients:&nbsp; </span>{mealDetails.strIngredient1}, {mealDetails.strIngredient2}, {mealDetails.strIngredient3}, {mealDetails.strIngredient4}</li>}
          <li> <span className="white"> Date: &nbsp; </span>{mealDetails?.dateModified ? mealDetails?.dateModified : '2022-12-25 22:49:04'}</li>
          <li><span className="white">Description:&nbsp; </span>{mealDetails?.strInstructions}</li>
        </ul>
    </div>
  )
}
