// Hooks
import { useState, useEffect } from 'react'
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
  const [pokemonEvolutions, setPokemonEvolutions] = useState([])

  useEffect(()=>{
    getEvolutions(pokemonId);
  })

  async function getEvolutions (id) {
    const response = await fetch('https://pokeapi.co/api/v2/evolution-chain/' + id)
    const data = await response.json()

    let pokemonEvoArray = []
    let pokemonLev1 = data.chain.species.name
    let pokemonLev1Img = await getPokemonImgs(pokemonLev1)
    pokemonEvoArray.push([pokemonLev1, pokemonLev1Img])

    if(data.chain.evolves_to.length !==0){
      let pokemonLev2 = data.chain.evolves_to[0].species.name;
      let pokemonLev2Img = await getPokemonImgs(pokemonLev2)
      pokemonEvoArray.push([pokemonLev2, pokemonLev2Img])
      if(data.chain.evolves_to[0].evolves_to.length !==0){
        let pokemonLev3 = data.chain.evolves_to[0].evolves_to[0].species.name;
        let pokemonLev3Img = await getPokemonImgs(pokemonLev3)
        pokemonEvoArray.push([pokemonLev3, pokemonLev3Img])
      }
      
    }
    setPokemonEvolutions(pokemonEvoArray)
  }

  async function getPokemonImgs(name){
    const response = await fetch('https://pokeapi.co/api/v2/pokemon/' + name)
    const data = await response.json()
    return data.sprites.other['official-artwork'].front_default
  }
  
  function prevClick(){
    (pokemonId === 1)?
    setPokemonId(1):
    setPokemonId(pokemonId -1)
  }

  function nextClick(){
    setPokemonId(pokemonId +1)
  }

  return (
    <div className="app">
      
        {/* tarjetas */}
        <div className="card-container">
          {pokemonEvolutions.map(pokemon => 
          <Card 
            key={pokemon[0]}
            name={pokemon[0]}
            img={pokemon[1]}
          
          />)}
        </div>

        <div className="buttons-container">
          <Button 
            icon={<TiArrowBackOutline />} 
            handleClick={prevClick}
          />
          
          <Button 
            icon={<TiArrowForwardOutline />} 
            handleClick={nextClick}
          />
        </div>
      
      
    </div>
  )
}

export default App
