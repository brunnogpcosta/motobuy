import React from 'react'
import Carousel from '../../components/Carousel/Carousel'
import ListMotos from '../../components/ListMotos/ListMotos'
import {
  Box,
  Container,
  Grid,
  Typography,
  Autocomplete,
  TextField,
  Pagination
} from '@mui/material'
import { useQuery } from '@tanstack/react-query'

import Filters from '../../components/Filters/Filters'
import TagsFilter from '../../components/TagsFilter/TagsFilter'

const HomePage = (): JSX.Element | string => {
  const { isPending, error, data } = useQuery({
    queryKey: ['repoData'],
    queryFn: async () =>
      await fetch('https://65aad076081bd82e1d97d33d.mockapi.io/moto').then(async (res) =>
        await res.json()
      )
  })

  if (isPending) return 'Loading...'
  if (error != null) return 'An error has occurred: ' + error.message

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
          <Grid item xs={12} sm={12} md={9} sx={{ mb: 8 }}>
            <Box
              sx={{
                marginBottom: 2,
                width: '100%',
                display: 'flex',
                justifyContent: 'right'
              }}
            >

              <TagsFilter/>

              <Autocomplete
                disablePortal
                id="model-filter"
                options={['Preço', 'Modelo']}
                sx={{
                  width: '100%',
                  maxWidth: 250,
                  '@media (max-width: 600px)': {
                    width: '100%',
                    maxWidth: '100%'
                  }
                }}
                renderInput={(params) => (
                  <TextField {...params} label="Ordenar" />
                )}
              />
            </Box>
            <ListMotos data={data}/>
            <Pagination count={10} />
          </Grid>
        </Grid>
      </Container>
    </>
  )
}

export default HomePage
