import { useEffect, useState } from "react"
import './RatedDrinks.scss'

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
  const [sortedAlpha, setSortedAlpha] = useState<boolean | null>(null) 
  const [sortedRate, setSortedRate] = useState<boolean | null>(null) 

  useEffect(() => {
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
    setSortedAlpha(false)
    setSortedRate(true)
  }

  const sortByRAlphabet = () =>{
    let newSorting = [...ratedDrinks]
    newSorting.sort((a:Props|any,b:Props|any)=>{
      if(a.strDrink < b.strDrink) return -1
      else if(a.strDrink > b.strDrink) return 1
      else return 0
    })    
    setSortedDrinks(newSorting)
    setSortedRate(false)
    setSortedAlpha(true)
  }
    
  return (
    <div id="RatedDrinks">
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
      <div className="rated-items">
          {
            sortedDrinks?.map((drink:Props)=> (
              <div className="item" key={drink?.idDrink}>
                  <img src={drink?.strDrinkThumb} alt="Drink Thumb" />
                  <ul>
                      <li>Drink:&nbsp;<span style={{color:'whitesmoke'}}> {drink?.strDrink}</span></li>
                      <li>Category:&nbsp;<span style={{color:'whitesmoke'}}> {drink?.strCategory}</span></li>
                      <li>Rate: &nbsp;<span style={{color:'orangered'}}>{drink?.rateDrink}</span></li>
                  </ul>
              </div>
            ))
          }
      </div>
    </div>
  )
}
