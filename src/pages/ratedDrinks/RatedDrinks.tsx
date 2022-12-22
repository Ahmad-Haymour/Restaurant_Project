

export type Props = {
    strDrink : string,
    strDrinkThumb: string,
    idDrink: string,
    rateDrink?: number
  }
  
export function RatedDrinks({localStorageDrinks}:Props[] | any) {


    
  return (
    <div>
        <div>
            {localStorageDrinks?.map((drink:Props)=> (
                <div key={drink?.idDrink}>
                    <img src={drink?.strDrinkThumb} alt="Drink Thumb" style={{width:"75px", height:"75px"}} />
                    <div>
                        <h1> {drink?.strDrink}</h1>
                        <h1> {drink?.rateDrink}</h1>
                    </div>
                </div>
            ))}
        </div>
    </div>
  )
}
