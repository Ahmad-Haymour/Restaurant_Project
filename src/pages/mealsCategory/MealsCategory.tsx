import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import SingleMeal from '../../components/singleMeal/SingleMeal';
import { useLocalStorage } from '../../hooks/useLocalStorage';

export type Props = {
    strMeal : string,
    strMealThumb: string,
    idMeal: string
    rateMeal?: number
    strCategory?: string
}

export default function MealsCategory({localStorageMeals, setLocalStorageMeals}: Props[] | any) {

    let {land} = useParams()

    let [meals, setMeals] = useState<Props[] | null>(null)

    const [mealID, setMealID] = useState<number | null>(null)

    const [ratingStorage, setRatingStorage] = useLocalStorage<Props[]>('rated-meals', [])

  useEffect( ()=>{
    console.log('Rated Meal ID => ', mealID);
}, [mealID])

    useEffect(() => {
        const url = "https://www.themealdb.com/api/json/v1/1/filter.php?a="+land;
        axios.get(url).then((res)=>{
            console.log(res);
            setMeals(res.data.meals)
        })
    }, [land])


  const handleRateMeal = (event: React.MouseEvent<HTMLElement>, meal: Props) =>{

    event.preventDefault()
    const target = event.target as HTMLElement
    setMealID(parseInt(target.innerHTML));
    console.log('Meal Object: ', meal);

    setRatingStorage( (currentItems) =>{                    
      let ratedMealsCopy = [...currentItems]

      let selected_meal = ratingStorage.find((mealObject: Props)=> mealObject?.idMeal === meal?.idMeal)

      console.log('Find Selected Meal in Storage: ',selected_meal);

      if (selected_meal == null){
          meal.rateMeal = parseInt(target.innerHTML)
          meal.strCategory = land
          ratedMealsCopy.push(meal)
          console.log('If Not Found RM (push): ', ratedMealsCopy);
      } else {
        meal.rateMeal = parseInt(target.innerHTML)
        meal.strCategory = land
        selected_meal.rateMeal = meal.rateMeal
          console.log('If Found RM (rate): ',selected_meal);
      }

      console.log('Storage Before: ', currentItems);
      console.log('Storage After: ', ratedMealsCopy);

      setLocalStorageMeals(ratedMealsCopy)
      
      return ratedMealsCopy
    })
  }

  return (
    <div id='MealsCategory'>
        {<h1>{land}</h1>}
        <div style={{display: 'flex', flexWrap: 'wrap'}} >
                { meals?.map((meal)=>(
                        <SingleMeal key={meal.idMeal} meal={meal} handleRateMeal={handleRateMeal} localStorageMeals={localStorageMeals} />
                    ))
                }   
        </div>
    </div>
  )
}
