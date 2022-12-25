import { useEffect, useState } from "react"
import './RatedMeals.scss'

export type Props = {
    strMeal : string,
    strMealThumb: string,
    idMeal: string
    rateMeal?: number
    strCategory?: string
}
  
export function RatedMeals({localStorageMeals}:Props[] | any) {

  const [ratedMeals, setRatedMeals] = useState<Props[] >([])
  const [sortedMeals, setSortedMeals] = useState<Props[]>([])
  const [sortedAlpha, setSortedAlpha] = useState<boolean | null>(null) 
  const [sortedRate, setSortedRate] = useState<boolean | null>(null) 


  useEffect(() => {
    let x = localStorage.getItem('rated-meals')
    if (x != null){
      const LocalStorageItems = JSON.parse(x)
      console.log(LocalStorageItems);
      setRatedMeals(LocalStorageItems)
    } else return
  }, [localStorageMeals])

  useEffect(()=>{
    setSortedMeals(ratedMeals)
  }, [ratedMeals])

  const sortByRate = () =>{
    let newSorting = [...ratedMeals]
    newSorting.sort((a:Props|any,b:Props|any)=>{
      if(a.rateMeal > b.rateMeal) return -1
      else if(a.rateMeal < b.rateMeal) return 1
      else return 0
    })    
    setSortedMeals(newSorting)
    setSortedAlpha(false)
    setSortedRate(true)
  }
  
  const sortByRAlphabet = () =>{
    let newSorting = [...ratedMeals]
    newSorting.sort((a:Props|any,b:Props|any)=>{
      if(a.strMeal > b.strMeal) return -1
      else if(a.strMeal < b.strMeal) return 1
      else return 0
    })    
    setSortedMeals(newSorting)
    setSortedRate(false)
    setSortedAlpha(true)
  }

  return (
    <div id='RatedMeals'>
         <div className="sort-container">
          <div onClick={sortByRate} className="sort-by-rating">
            Sort By Rating
          </div>
          <h2>{
            sortedAlpha && 'Sorted By Alphabet'}{ sortedRate && 'Sorted By Rating'}</h2>
          <div onClick={sortByRAlphabet} className="sort-by-rating">
            Sort By Alphabet
          </div>
      </div>
        <div className='rated-items'>
          {
            sortedMeals?.map((meal:Props)=> (
              <div className="item" key={meal?.idMeal}>
              <img src={meal?.strMealThumb} alt="Drink Thumb" />
              <ul>
                  <li>Drink:&nbsp;<span style={{color:'whitesmoke'}}> {meal?.strMeal}</span></li>
                  <li>Category:&nbsp;<span style={{color:'whitesmoke'}}> {meal?.strCategory}</span></li>
                  <li>Rate: &nbsp;<span style={{color:'orangered'}}>{meal?.rateMeal}</span></li>
              </ul>
          </div>
            ))
          }
        </div>
    </div>
  )
}
