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
  const [ sortedDrinks, setSortedDrinks] = useState<Props[]>([])

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
    setSortedDrinks(ratedDrinks)
  }, [ratedDrinks])

  const sortByRate = () =>{
    let newSorting = [...ratedDrinks]
    newSorting.sort((a:Props|any,b:Props|any)=>{
      if(a.rateDrink > b.rateDrink) return -1
      else if(a.rateDrink < b.rateDrink) return 1
      else return 0
    })    
    setSortedDrinks(newSorting)
  }

  const sortByRAlphabet = () =>{
    let newSorting = [...ratedDrinks]
    newSorting.sort((a:Props|any,b:Props|any)=>{
      if(a.strDrink < b.strDrink) return -1
      else if(a.strDrink > b.strDrink) return 1
      else return 0
    })    
    setSortedDrinks(newSorting)
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
            sortedDrinks?.map((drink:Props)=> (
              <div key={drink?.idDrink} style={{border:'2px solid', width:'300px', display:'flex'}}>
                  <img src={drink?.strDrinkThumb} alt="Drink Thumb" style={{width:"100px", height:"100px"}} />
                  <ul>
                      <li>Drink:&nbsp; {drink?.strDrink}</li>
                      <li>Category: &nbsp;{drink?.strCategory}</li>
                      <li>Rate: &nbsp;{drink?.rateDrink}</li>

                  </ul>
              </div>
            ))
          }
        </div>
    </div>
  )
}
