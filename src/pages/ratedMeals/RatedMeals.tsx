import { useEffect, useState } from "react"

export type Props = {
    strMeal : string,
    strMealThumb: string,
    idMeal: string
    rateMeal?: number
    strCategory?: string
}
  
export function RatedMeals({localStorageMeals}:Props[] | any) {

  const [ratedMeals, setRatedMeals] = useState<Props[] >([])

  useEffect(() => {
    console.log('Effect Fetching Local Storage');
    let x = localStorage.getItem('rated-meals')
    if (x != null){
      const LocalStorageItems = JSON.parse(x)
      console.log(LocalStorageItems);
      setRatedMeals(LocalStorageItems)
    } else return
    
  }, [localStorageMeals])
    
  return (
    <div>
        <div>
          {
            ratedMeals?.map((meal:Props)=> (
              <div key={meal?.idMeal}>
                  <img src={meal?.strMealThumb} alt="Drink Thumb" style={{width:"75px", height:"75px"}} />
                  <div>
                      <h1> {meal?.strMeal}</h1>
                      <h1> {meal?.rateMeal}</h1>
                      <h1> {meal?.strCategory}</h1>

                  </div>
              </div>
            ))
          }
        </div>
    </div>
  )
}
