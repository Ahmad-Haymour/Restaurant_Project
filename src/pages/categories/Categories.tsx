import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import SingleDrink from '../../components/singleDrink/SingleDrink';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import './Categories.scss'

export type Props = {
  strDrink : string,
  strDrinkThumb: string,
  idDrink: string,
  rateDrink?: number
  strCategory?: string
}

export default function Categories({localStorageDrinks, setLocalStorageDrinks}:Props[] | any) {
  
  let {category} = useParams<string>()
  let [drinks, setDrinks] = useState<Props[] | null>(null)

  const [ratingStorage, setRatingStorage] = useLocalStorage<Props[]>('rated-drinks', [])

  useEffect( () => {
    const url = "https://www.thecocktaildb.com/api/json/v1/1/filter.php?c="+category;

    axios.get(url).then((response)=>{
      setDrinks(response.data.drinks)
    })
  }, [category])

  const handleRateDrink = (event: React.MouseEvent<HTMLElement>, drink: Props) =>{

    event.preventDefault()
    const target = event.target as HTMLElement

    setRatingStorage( (currentItems) =>{                    
      let ratedDrinksCopy = [...currentItems]
      let selected_drink = ratingStorage.find((drinkObject: Props)=> drinkObject?.idDrink === drink?.idDrink)

      if (selected_drink == null){
          drink.rateDrink = parseInt(target.innerHTML)
          drink.strCategory = category
          ratedDrinksCopy.push(drink)
      } else {
          drink.rateDrink = parseInt(target.innerHTML)
          drink.strCategory = category
          selected_drink.rateDrink = drink.rateDrink
      }
      setLocalStorageDrinks(ratedDrinksCopy)
      return ratedDrinksCopy
    })
  }

  return (
    <div className='Categories'> 
      <h1>{category}</h1>
      <div className='container' >
        {
          drinks?.map((drink)=>(
            <SingleDrink key={drink.idDrink} drink={drink} handleRateDrink={handleRateDrink} localStorageDrinks={localStorageDrinks} />
          ))
        }
      </div>
    </div>
  )
}
