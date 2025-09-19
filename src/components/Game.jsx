import React, { useState } from 'react'
import Board from './Board'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'

function calculateWinner(squares){
  const lines = [
    [0,1,2],[3,4,5],[6,7,8],
    [0,3,6],[1,4,7],[2,5,8],
    [0,4,8],[2,4,6]
  ]
  for (let [a,b,c] of lines){
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c])
      return squares[a]
  }
  return null
}

function calculateStatusText(squares, xIsNext){
  const winner = calculateWinner(squares)
  if (winner) return `${winner} GANHOU`
  if (!squares.includes(null)) return 'Empate'
  return `Próximo: ${xIsNext ? 'X' : 'O'}`
}

export default function Game(){
  const [history, setHistory] = useState([Array(9).fill(null)])
  const [currentMove, setCurrentMove] = useState(0)
  const xIsNext = currentMove % 2 === 0
  const currentSquares = history[currentMove]

  function handlePlay(nextSquares){
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares]
    setHistory(nextHistory)
    setCurrentMove(nextHistory.length - 1)
  }

  function jumpTo(move){
    setCurrentMove(move)
  }

  function resetGame(){
    setHistory([Array(9).fill(null)])
    setCurrentMove(0)
  }

  const moves = history
    .map((squares, move) => {
      if (move === 0) return null 
      const desc = (
        <>
          <span style={{ color: '#2ecc40', fontWeight: 'bold' }}>Δ</span> {move}
        </>
      )
      return (
        <li key={move}>
          <Button 
            size="sm" 
            variant="outline-light" 
            onClick={() => jumpTo(move)}
          >
            {desc}
          </Button>
        </li>
      )
    })
    .filter(Boolean) 

  return (
    <Card bg="transparent" text="white" className="p-3" style={{border:'none'}}>
      <Card.Body className="d-flex flex-column align-items-center">
        <div className="game-center">
          <div className="controls">
            <div className="status-pill">{calculateStatusText(currentSquares, xIsNext)}</div>
          </div>
          
          <Board 
            xIsNext={xIsNext} 
            squares={currentSquares} 
            onPlay={handlePlay} 
          />
          
          <div className="d-flex justify-content-center mt-3">
  <Button variant="light" size="lg" onClick={resetGame} className="restart-btn">
    <i className="bi bi-playstation" style={{ fontSize: '1.6rem', marginRight: 8 }}></i>
    Restart
  </Button>
</div>
          <ul className="history-list mt-3">{moves}</ul>

          {calculateWinner(currentSquares) === null && !currentSquares.includes(null) && (
            <div style={{ marginTop: 32, display: 'flex', justifyContent: 'center' }}>
              <img 
                src="/ps2-rsod.gif" 
                alt="Empate!" 
                style={{ width: 500, height: 'auto', borderRadius: 12, boxShadow: '0 0 16px #000' }} 
              />
            </div>
          )}
          {calculateWinner(currentSquares) !== null && (
            <div style={{ marginTop: 32, display: 'flex', justifyContent: 'center' }}>
              <img 
                src="/ps2-startup.gif" 
                alt="Vitória!" 
                style={{ width: 500, height: 'auto', borderRadius: 12, boxShadow: '0 0 16px #000' }} 
              />
            </div>
          )}
        </div>
      </Card.Body>
    </Card>
  )
}