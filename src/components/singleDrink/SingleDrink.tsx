import { Link, useParams } from 'react-router-dom'
import "./SingleDrink.scss"

export type Props = {
    strDrink : string,
    strDrinkThumb: string,
    idDrink: string,
    rateDrink?: number
    strCategory?: string
}

export default function SingleDrink({drink, handleRateDrink, localStorageDrinks}: Props[] | any) {

    let {category} = useParams<string>()

    let foundDrink = localStorageDrinks.find((ratedDrink:Props) => ratedDrink.idDrink === drink.idDrink)

  return (
    <div id='SingleDrink' 
         key={drink.idDrink}
    >
            <Link to={'/categories/'+category+'/'+drink.idDrink}> 
                <h2>{drink.strDrink.length > 20 ?drink.strDrink.slice(0,20)+'...' :drink.strDrink}</h2>
                <img src={drink.strDrinkThumb} alt='Drink Thumb'/>
            </Link>
            <div className='vote-wrapper'>
                {
                    Array.from(Array(10)).map(( _, i) => 
                        <button className={(foundDrink?.rateDrink && foundDrink.rateDrink === i+1 ) ? 'rate active':'rate'} 
                             key={i+1} 
                             onClick={(e)=> handleRateDrink(e, drink)}
                        >
                            {i + 1}
                        </button> 
                    )
                }
            </div>
    </div>
  )
}
