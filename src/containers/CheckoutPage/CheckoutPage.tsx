import React from 'react'
import ListCarShoppingMotos from '../../components/ListCarShoppingMotos/ListCarShoppingMotos'
import { Box, Button, Container, Typography, useMediaQuery, useTheme } from '@mui/material'

const Checkout = (): JSX.Element => {
  const theme = useTheme()
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'))

  return (
    <>
      <Container maxWidth="xl">
        <Box sx={{ textAlign: isSmallScreen ? 'center' : 'left', py: 4 }}>
          <Typography variant="h5">Resumo da compra</Typography>
        </Box>
        <ListCarShoppingMotos />

        <Box sx={{ display: 'flex', flexDirection: isSmallScreen ? 'column' : 'row', justifyContent: 'space-between', alignItems: 'center', py: 6 }}>
          <Box sx={{ marginBottom: isSmallScreen ? 2 : 0 }}>
            <Typography variant="h5">Quantidade de Items</Typography>
            <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
              2
            </Typography>
          </Box>

          <Box sx={{ marginBottom: isSmallScreen ? 4 : 0 }}>
            <Typography variant="h5">Valor total</Typography>
            <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
              R$ 44.000,00
            </Typography>
          </Box>

          <Button
            variant="contained"
            sx={{
              backgroundColor: '#1A1A1A',
              ':hover': { backgroundColor: '#000' },
              width: isSmallScreen ? '100%' : 200,
              height: 50
            }}
          >
            Finalizar compra
          </Button>
        </Box>
      </Container>
    </>
  )
}

export default Checkout
