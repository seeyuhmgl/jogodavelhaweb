import React from 'react'
import Button from 'react-bootstrap/Button'
import PropTypes from 'prop-types'

export default function Square({ value, onSquareClick }){
  return (
    <Button
      variant="link"
      className="square"
      onClick={onSquareClick}
      aria-label={value ? value : 'empty'}
    >
      {value === 'X' && <i className="bi bi-x-lg" aria-hidden></i>}
      {value === 'O' && <i className="bi bi-circle" aria-hidden></i>}
    </Button>
  )
}

Square.propTypes = {
  value: PropTypes.string,
  onSquareClick: PropTypes.func.isRequired
}
