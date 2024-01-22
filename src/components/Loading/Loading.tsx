import React from 'react'
import CircularProgress from '@mui/material/CircularProgress'
import Box from '@mui/material/Box'

const Loading = (): JSX.Element => {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#d9d9d9' }}>
    <CircularProgress size={40}
      value={100}
     thickness={4} sx={{ color: '#000' }} />
  </Box>
  )
}

export default Loading
