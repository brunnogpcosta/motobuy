import React from 'react'
import Carousel from '../../components/Carousel/Carousel'
import ListMotos from '../../components/ListMotos/ListMotos'
import { Box, Container, Grid, Typography } from '@mui/material'

const HomePage = (): JSX.Element => {
  return (
    <>
      <Carousel />

      <Container maxWidth="xl">
        <Box
          sx={{ height: 40, display: 'flex', justifyContent: 'right', alignItems: 'center', py: 2 }}
        >
          <Typography>Ordenar</Typography>
        </Box>
        <Grid container spacing={2}>
          <Grid item xs={2}>
            <Box></Box>
          </Grid>
          <Grid item xs={10}>
          <ListMotos />
          </Grid>
        </Grid>
      </Container>
    </>
  )
}

export default HomePage
