import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import '../meal/Meal.scss'

export type Props = {
  strDrink : string,
  strDrinkThumb: string,
  idDrink: string,
  rateDrink?: number
  strCategory?: string
}

export type DetailsProps = {
  dateModified: string
  idDrink: string
  strAlcoholic: string
  strCategory: string
  strDrink: string
  strDrinkThumb: string
  strGlass: string
  strIngredient1: string
  strIngredient2: string
  strIngredient3:string
  strIngredient4: string
  strInstructions: string
  strInstructionsDE?: string
}

export default function Drink() {
    let {category} = useParams<string>()
    let {drink_id} = useParams<string>()
    let [drinkDetails, setDrinkDetails] = useState<DetailsProps | null>(null)

    useEffect(()=>{
      const url = "https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i="+drink_id
      axios.get(url).then((res)=>{
        setDrinkDetails(res.data.drinks[0])
    })
    }, [drink_id])

  return (
    <div id='Drink'>
        <img src={drinkDetails?.strDrinkThumb} alt="Meal Thumb"/> 
        <ul>
          <li><span className="white"> Area:&nbsp; </span> {category}</li>
          <li><span className="white">Drink:&nbsp; </span>{drinkDetails?.strAlcoholic}</li>
          <li><span className="white">Category:  </span>{drinkDetails?.strCategory}</li>
          <li><span className="white">Glass:&nbsp;  </span>{drinkDetails?.strGlass}</li>
          {drinkDetails &&<li><span className="white">Ingredients:&nbsp; </span>{drinkDetails.strIngredient1}, {drinkDetails.strIngredient2}, {drinkDetails.strIngredient3}, {drinkDetails.strIngredient4}</li>}
          <li> <span className="white"> Last Modified: &nbsp; </span>{drinkDetails?.dateModified ? drinkDetails?.dateModified : '2022-12-23 22:49:04'}</li>
          <li><span className="white">Description:&nbsp; </span>{drinkDetails?.strInstructions}</li>
        </ul>
    </div>
  )
}
