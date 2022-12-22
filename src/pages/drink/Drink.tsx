import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';

type Props = {
        strDrink:string,
        strDrinkThumb: string,
        idDrink:string
    }

export default function Drink() {

    let {category} = useParams<string>()
    let {drink_id} = useParams<string>()

    let [singleDrink, setSingleDrink] = useState<Props | null>(null)

    useEffect( ()=>{
        const url = "https://www.thecocktaildb.com/api/json/v1/1/filter.php?c="+category;
        axios.get(url).then((response)=>{
          console.log('My Response => ',response);
          setSingleDrink(response?.data?.drinks?.filter((e:Props)=>e.idDrink === drink_id)[0])
        })
    
      }, [drink_id, category])

      console.log('Single  Drink => ', singleDrink);
      console.log('Params Drink id => ', drink_id );

  return (
    <div id='Drinks'>
        <h1>Drink Category</h1>
        <h2>{category}</h2>
        <h1>{singleDrink?.strDrink}</h1>
        <img src={singleDrink?.strDrinkThumb} alt="Drink Thumb" /> 
    </div>
  )
}
