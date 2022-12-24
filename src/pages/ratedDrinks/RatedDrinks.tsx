import { useEffect, useState } from "react"

export type Props = {
    strDrink : string,
    strDrinkThumb: string,
    idDrink: string,
    rateDrink?: number
    strCategory?: string
  }
  
export function RatedDrinks({localStorageDrinks}:Props[] | any) {

  const [ratedDrinks, setRatedDrinks] = useState<Props[] >([])
  const [ sortedDrink, setSortedDrink] = useState<Props[]>([])

  useEffect(() => {
    console.log('Effect Fetching Local Storage');
    let x = localStorage.getItem('rated-drinks')
    if (x != null){
      const LocalStorageItems = JSON.parse(x)
      console.log(LocalStorageItems);
      setRatedDrinks(LocalStorageItems)

    } else return
    
  }, [localStorageDrinks])

  useEffect(()=>{
    setSortedDrink(ratedDrinks)
  }, [ratedDrinks])

  const sortByRate = () =>{
    let newSorting = [...ratedDrinks]
    newSorting.sort((a:Props|any,b:Props|any)=>{
      if(a.rateDrink > b.rateDrink) return -1
      else if(a.rateDrink < b.rateDrink) return 1
      else return 0
    })    
    setSortedDrink(newSorting)
  }
    
  return (
    <div>
      <button onClick={sortByRate} className="sort-by-rating">
          Sortierung nach Rating
        </button>
        <div>
          {
            sortedDrink?.map((drink:Props)=> (
              <div key={drink?.idDrink}>
                  <img src={drink?.strDrinkThumb} alt="Drink Thumb" style={{width:"75px", height:"75px"}} />
                  <div>
                      <h1> {drink?.strDrink}</h1>
                      <h1> {drink?.rateDrink}</h1>
                      <h1> {drink?.strCategory}</h1>

                  </div>
              </div>
            ))
          }
        </div>
          {/* <div>
            {sortedDrink?.map((drink:Props)=> (
                <div key={drink?.idDrink}>
                    <img src={drink?.strDrinkThumb} alt="Drink Thumb" style={{width:"75px", height:"75px"}} />
                    <div>
                        <h1> {drink?.strDrink}</h1>
                        <h1> {drink?.rateDrink}</h1>
                    </div>
                </div>
            ))}
        </div> */}
    </div>
  )
}
