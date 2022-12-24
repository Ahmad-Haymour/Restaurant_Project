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
  const [sortedMeals, setSortedMeals] = useState<Props[]>([])

  useEffect(() => {
    console.log('Effect Fetching Local Storage');
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
  }
  
  const sortByRAlphabet = () =>{
    let newSorting = [...ratedMeals]
    newSorting.sort((a:Props|any,b:Props|any)=>{
      if(a.strMeal > b.strMeal) return -1
      else if(a.strMeal < b.strMeal) return 1
      else return 0
    })    
    setSortedMeals(newSorting)
  }

  return (
    <div>
        <button onClick={sortByRate} className="sort-by-rating">
          Sort By Rating
        </button>
        <button onClick={sortByRAlphabet} className="sort-by-rating">
          Sort By Alphabet
        </button>
        <div>
          {
            sortedMeals?.map((meal:Props)=> (
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
