import { useState } from "react"
import "./App.css"

function App() {
  const [player, setPlayer] = useState("X")
  const [board, setBoard] = useState(["", "", "", "", "", "", "", "", ""])
  const [gameOver, setGameOver] = useState(false)

  const statusMessage = `${player}'s turn`
  const patterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ]

  const onPlay = (buttonIndex) => {
    console.log(player, "played", buttonIndex)
    const newBoard = [...board]
    newBoard[buttonIndex] = player
    setBoard(newBoard)

    for (let i = 0; i < patterns.length; i++) {
      if (
        newBoard[patterns[i][0]] === player &&
        newBoard[patterns[i][1]] === player &&
        newBoard[patterns[i][2]] === player
      ) {
        console.log("found a pattern")
        setGameOver(true)
        return
      }
    }

    setPlayer((prevPlayer) => (prevPlayer === "X" ? "O" : "X"))
  }

  const resetGame = () => {
    setBoard(["", "", "", "", "", "", "", "", ""])
    setGameOver(false)
  }

  return (
    <div className="page-wrapper">
      <div className="ttt-container">
        <div className="ttt-status">
          {gameOver ? `${player} won!` : statusMessage}
        </div>
        <div className="ttt-grid">
          {board.map((value, index) => (
            <button
              key={index}
              className="ttt-button"
              onClick={() => onPlay(index)}
              disabled={value != "" || gameOver}
            >
              {value}
            </button>
          ))}
        </div>
        <div className="ttt-button-group">
          <button className="ttt-action-button" onClick={() => resetGame()}>
            Reset game
          </button>
          <button className="ttt-action-button">Taunt</button>
        </div>
      </div>
      <span className="ttt-infobar">
        <p>
          Playing in: <span className="ttt-badge">room-3</span>
        </p>
        <p>
          You are: <span className="ttt-badge">{player}</span>
        </p>
        <p>
          Opponent: <span className="ttt-badge">opponent-id</span>
        </p>
      </span>
    </div>
  )
}

export default App
