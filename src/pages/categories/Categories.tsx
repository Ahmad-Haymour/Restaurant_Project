import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import SingleDrink from '../../components/singleDrink/SingleDrink';
import SingleMeal from '../../components/singleMeal/SingleMeal';
import { useLocalStorage } from '../../hooks/useLocalStorage';

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
  const [drinkID, setDrinkID] = useState<number | null>(null)

  const [ratingStorage, setRatingStorage] = useLocalStorage<Props[]>('rated-drinks', [])

  useEffect( () => {
    const url = "https://www.thecocktaildb.com/api/json/v1/1/filter.php?c="+category;

    axios.get(url).then((response)=>{
      setDrinks(response.data.drinks)
      console.log('ALL FETCHED DRINKS=> ', response.data.drinks);
    })
  }, [category])

  useEffect( ()=>{
      console.log('Rated Drink ID => ', drinkID);
  }, [drinkID])

  const handleRateDrink = (event: React.MouseEvent<HTMLElement>, drink: Props) =>{

    event.preventDefault()
    const target = event.target as HTMLElement
    setDrinkID(parseInt(target.innerHTML));
    console.log('Drink Object: ', drink);

    setRatingStorage( (currentItems) =>{                    
      let ratedDrinksCopy = [...currentItems]

      let selected_drink = ratingStorage.find((drinkObject: Props)=> drinkObject?.idDrink === drink?.idDrink)

      console.log('Find Selected Drink in Storage: ',selected_drink);

      if (selected_drink == null){
          drink.rateDrink = parseInt(target.innerHTML)
          drink.strCategory = category
          ratedDrinksCopy.push(drink)
          console.log('If Not Found RD (push): ', ratedDrinksCopy);
      } else {
          drink.rateDrink = parseInt(target.innerHTML)
          drink.strCategory = category
          selected_drink.rateDrink = drink.rateDrink
          console.log('If Found RD (rate): ',selected_drink);
      }

      console.log('Storage Before: ', currentItems);
      console.log('Storage After: ', ratedDrinksCopy);

      setLocalStorageDrinks(ratedDrinksCopy)
      
      return ratedDrinksCopy
    })
  }

  return (
    <div id='Categories'> 
      <h1>{category}</h1>
      <div style={{display: 'flex', flexWrap: 'wrap'}} >
        {
          drinks?.map((drink)=>(
            <SingleDrink key={drink.idDrink} drink={drink} handleRateDrink={handleRateDrink} localStorageDrinks={localStorageDrinks} />
          ))
        }
      </div>
    </div>
  )
}
