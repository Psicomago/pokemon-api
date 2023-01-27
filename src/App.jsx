// Hooks
import { useState } from 'react'
// Components
import { Button } from './components/Button'
import { Card } from './components/Card'
//Styles
import './sass/App.scss';
// Icons
import { TiArrowBackOutline } from "react-icons/ti";
import { TiArrowForwardOutline } from "react-icons/ti";




const App = ()=>{
  const [pokemonId, setPokemonId] = useState(1);

  
  
  function prevClick(){
    (pokemonId === 1)?
    setPokemonId(1):
    setPokemonId(pokemonId -1)
  }

  function nextClick(){
    setPokemonId(pokemonId +1)
  }

  return (
    <div className="App">
      <h1>hola mundos</h1>
      <>
        {/* tarjetas */}
        <div className="card-container">
          <Card />
        </div>

        <div className="buttons-container">
          <Button 
            icon={<TiArrowBackOutline />} 
            handleClick={prevClick}
          />
          {pokemonId}
          <Button 
            icon={<TiArrowForwardOutline />} 
            handleClick={nextClick}
          />
        </div>
      </>
      
    </div>
  )
}

export default App
