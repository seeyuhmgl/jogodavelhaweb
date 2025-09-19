import React from 'react'
import Game from './components/Game'
import { Container } from 'react-bootstrap'
import { Box, Typography } from '@mui/material'

export default function App(){
  return (
    <Container fluid className="p-0">
      <Box sx={{ minHeight: '100vh', display:'flex', alignItems:'center', justifyContent:'center', backgroundColor: '#000' }}>        <Box sx={{ width: 420 }}>
          <Typography
           variant="h5"
  align="center"
  gutterBottom
  sx={{
    color: '#fff',
    mb: 3,
    fontFamily: 'Zrnic, Arial, sans-serif',
    fontSize: '4.2rem' 
  }}
>
  Jogo da Velha
</Typography>
          <Game />
        </Box>
      </Box>
    </Container>
  )
}