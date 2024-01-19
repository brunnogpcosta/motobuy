import React from 'react'
import motos from '../../utils/getMotos'
import { Box, Button, Grid, Typography } from '@mui/material'

const ListMotos = (): JSX.Element => {
  return (
    <Box sx={{ flexGrow: 1, pb: 8 }}>
      <Grid container spacing={2}>
        {motos.map((moto, index) => (
          <Grid item key={index} xs={12} sm={6} md={3} lg={3} xl={3}>
            <Box
              sx={{
                backgroundColor: '#f3f3f3',
                padding: 2,
                borderRadius: 2
              }}
            >
              <img src={moto.image} width="100%" alt={moto.name} />
            </Box>
            <Box sx={{ textAlign: 'left', p: 1 }}>
              <Typography>{moto.name}</Typography>
              <Typography sx={{ fontWeight: 'light' }}>
                {moto.description}
              </Typography>
              <Typography sx={{ fontWeight: 'bold', fontSize: 20 }}>
                R$ {moto.price}
              </Typography>
              <Button
                variant="contained"
                sx={{
                  backgroundColor: '#1A1A1A',
                  ':hover': { backgroundColor: '#000' },
                  width: '100%',
                  marginTop: 1
                }}
              >
                Adicionar ao carrinho
              </Button>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  )
}

export default ListMotos
