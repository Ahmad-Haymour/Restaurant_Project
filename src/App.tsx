import React, { useEffect, useState } from 'react';
import './App.scss';
import {BrowserRouter, Routes, Route, Link} from 'react-router-dom'
import axios from 'axios'

import Navigation from './components/navigation/Navigation';
import Categories from './pages/categories/Categories';
import Drink from './pages/drink/Drink';
import MealsCategory from './pages/mealsCategory/MealsCategory';
import Meal from './pages/meal/Meal';
import { RatedDrinks } from './pages/ratedDrinks/RatedDrinks';
import { RatedMeals } from './pages/ratedMeals/RatedMeals';

export type DrinksCategory = {
  strCategory : string
}

export type MealsArea = {
  strArea: string
}

export type DrinkT = {
  strDrink:string,
  strDrinkThumb: string,
  idDrink:string
}

export type Props = {
  strDrink : string,
  strDrinkThumb: string,
  idDrink: string,
  rateDrink?: number
}

export function App() {

  let [drinks, setDrinks] = useState<DrinksCategory[] | null>(null)
  let [meals, setMeals] = useState<MealsArea[] | null >(null)

  const [localStorageDrinks, setLocalStorageDrinks] = useState<Props[]>([])
  const [localStorageMeals, setLocalStorageMeals] = useState<Props[]>([])


  useEffect( ()=> {
    const url = "https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list";
    axios.get(url).then((response) =>{
      console.log('All categories => ',response.data.drinks);
      setDrinks(response.data.drinks.map((drink: string) => drink))
    })
  }, [])

  useEffect(() => {
    const url = "https://www.themealdb.com/api/json/v1/1/list.php?a=list";
    axios.get(url).then(res=>{
      console.log('Fetched Meals => ', res.data.meals);
      setMeals(res.data.meals.map((meal: string)=> meal))
    })
  }, [])
  
  return (
    <div id="App">
      <BrowserRouter>
        <Navigation >
          <Routes>
            <Route path='/' element={<div className='Bon-Appetit' />} />
            <Route path='/drinks' element={ 
              <ul className='categories-list'>
                  {drinks?.map((drink, ind) => (
                  <li key={ind}><Link to={'/categories/'+drink.strCategory}>{drink?.strCategory}</Link></li>
                  ))}
              </ul>
            } />
            <Route path='/categories/:category' element={<Categories localStorageDrinks={localStorageDrinks} setLocalStorageDrinks={setLocalStorageDrinks} />} />
            <Route path='/categories/:category/:drink_id' element={<Drink/>} />
            <Route path='/rated-drinks' element={<RatedDrinks localStorageDrinks={localStorageDrinks}/>} />

            <Route path='/meals' element={
              <ul className='categories-list'>
                { meals?.map((meal, ind)=>(
                  <li key={ind}><Link to={meal.strArea}>{meal.strArea}</Link></li>
                ))}
              </ul>
            }/>
            <Route path='/meals/:land/' element={<MealsCategory localStorageMeals={localStorageMeals} setLocalStorageMeals={setLocalStorageMeals}/>} />
            <Route path='/meals/:land/:meal_id' element={<Meal/>} />
            <Route path='/rated-meals' element={<RatedMeals localStorageMeals={localStorageMeals}/>} />

          </Routes>
        </Navigation >
      </BrowserRouter>
    </div>
  );
}

export default App;
