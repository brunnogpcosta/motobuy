import React from 'react'
import { Box, Typography } from '@mui/material'

const Footer = (): JSX.Element => {
  const year = new Date().getFullYear()

  return (
    <Box sx={{ backgroundColor: '#000', padding: 2, mt: 6 }}>
      <Typography variant="body2" sx={{ color: '#fff' }}>
        {`© ${year} - Motobuy`}
      </Typography>
    </Box>
  )
}

export default Footer
