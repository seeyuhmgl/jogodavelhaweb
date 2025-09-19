import React from 'react'
import Square from './Square'
import PropTypes from 'prop-types'

export default function Board({ xIsNext, squares, onPlay }){
  function handleClick(i){
    if (squares[i] || calculateWinner(squares)) return
    const next = squares.slice()
    next[i] = xIsNext ? 'X' : 'O'
    onPlay(next)
  }

  function renderSquare(i){
    return <Square key={i} value={squares[i]} onSquareClick={() => handleClick(i)} />
  }

  return (
    <div className="board" role="grid" aria-label="Tic Tac Toe board">
      {Array.from({length:9}).map((_,i) => renderSquare(i))}
    </div>
  )
}

Board.propTypes = {
  xIsNext: PropTypes.bool.isRequired,
  squares: PropTypes.array.isRequired,
  onPlay: PropTypes.func.isRequired
}

function calculateWinner(squares){
  const lines = [
    [0,1,2],[3,4,5],[6,7,8],
    [0,3,6],[1,4,7],[2,5,8],
    [0,4,8],[2,4,6]
  ]
  for (let [a,b,c] of lines){
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) return squares[a]
  }
  return null
}
  