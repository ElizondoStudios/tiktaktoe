import { useEffect, useRef, useState} from 'react'
import { nanoid } from 'nanoid'

function App() {
  const [Tablero, setTablero]= useState(["","","","","","","","",""])
  const [GameOver, setGameOver] = useState(false)
  const [Lang, setLang] = useState("")

  const SimboloActual= useRef("O")
  const Turno= useRef(0)

  useEffect(() => {
    setLang(navigator.language.includes("es")? "español": "english")
  },[])

  useEffect(() => {
    checkGameOver()
  },[Tablero])

  function handleClick(index){
    SimboloActual.current= SimboloActual.current=== "X"? "O": "X"
    Turno.current++
    setTablero(prevTablero => 
        prevTablero.map((e, i) => i===index && e===""? SimboloActual.current: e)
    )
  }

  function reset(){
    Turno.current=0
    SimboloActual.current="O"
    setTablero(["","","","","","","","",""])
    setGameOver(false)
  }

  function checkGameOver(){
    if(Turno.current<5)
      return

    if(Tablero[0]!=""){
      if(Tablero[0]===Tablero[1] && Tablero[1]===Tablero[2]){
        setGameOver(true)
        return
      }
      if(Tablero[0]===Tablero[3] && Tablero[3]===Tablero[6]){
        setGameOver(true)
        return
      }
      if(Tablero[0]===Tablero[4] && Tablero[4]===Tablero[8]){
        setGameOver(true)
        return
      }
    }

    if(Tablero[8]!=""){
      if(Tablero[8]===Tablero[7] && Tablero[7]===Tablero[6]){
        setGameOver(true)
        return
      }
      if(Tablero[8]===Tablero[5] && Tablero[5]===Tablero[2]){
        setGameOver(true)
        return
      }
    }

    if(Tablero[6]!="" && Tablero[6]===Tablero[4] && Tablero[4]===Tablero[2]){
      setGameOver(true)
      return
    }

    if(Tablero[3]!="" && Tablero[3]===Tablero[4] && Tablero[4]===Tablero[5]){
      setGameOver(true)
      return
    }
  }

  const casillas= Tablero.map(
    (marca, index) =>
     <div
      className={`casilla ${marca!=""? marca==="X"?"cruz": "circulo": "vacia"}`}
      key={nanoid()} 
      index={index} 
      onClick={()=>{handleClick(index)}}></div>
    )

  const reset_button= <button onClick={reset}>{Lang==="español"? "Reiniciar": "Reset"}</button>
  
  const texto_ganar= Lang==="español"?
    `Ganó el jugador ${SimboloActual.current} en ${Turno.current} turnos`:
    `Player ${SimboloActual.current} won in ${Turno.current} turns`
  
  return (
    <div className="App">
      {GameOver &&
       <div className="game-over">
        <h2>Game Over!</h2>
        <p>{texto_ganar}</p>
        {reset_button}
       </div>
      }
      <div className="container">
        <h1>Tik Tak Toe!</h1>
        <div className="tablero">
          {casillas}
        </div>
        {reset_button}
      </div>
    </div>
  )
}

export default App
