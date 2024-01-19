import React from 'react'
import Carousel from '../../components/Carousel/Carousel'
import ListMotos from '../../components/ListMotos/ListMotos'
import { Box, Container, Grid, Typography, Autocomplete, TextField } from '@mui/material'
import Filters from '../../components/Filters/Filters'

const HomePage = (): JSX.Element => {
  return (
    <>
      <Carousel />

      <Container maxWidth="xl" sx={{ marginTop: 4 }}>
        <Grid container spacing={8}>
          <Grid item xs={12} sm={12} md={3}>
            <Box sx={{ textAlign: 'left', marginBottom: 2 }}>
              <Typography>Filtro</Typography>
            </Box>
            <Filters />
          </Grid>
          <Grid item xs={12} sm={12} md={9}>
            <Box sx={{ marginBottom: 2, width: '100%', display: 'flex', justifyContent: 'right' }}>
              <Autocomplete
                disablePortal
                id="model-filter"
                options={['Preço', 'model2']}
                sx={{ marginBottom: 2, width: 200 }}
                renderInput={(params) => (
                  <TextField {...params} label="Ordenar" />
                )}
              />
            </Box>
            <ListMotos />
          </Grid>
        </Grid>
      </Container>
    </>
  )
}

export default HomePage
