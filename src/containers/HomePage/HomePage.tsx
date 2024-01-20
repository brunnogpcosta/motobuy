import React, { useState } from 'react'
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
import { useNavigate, useSearchParams } from 'react-router-dom'

interface IMoto {
  brand: string
  cc: number
  createdAt: string
  description: string
  id: string
  model: string
  name: string
  photo: string
  price: number

}

const HomePage = (): JSX.Element | string => {
  const navigate = useNavigate()
  const limit = 8
  const [pages, setPages] = useState(1)
  const [searchParams] = useSearchParams()
  const [fields, setFields] = useState<any>(null)

  // im do this beacouse the mockApi dont have count items in free plan
  const { isPending, error } = useQuery<any>({
    queryKey: ['repoData'],
    queryFn: async () => {
      const res = await fetch('https://65aad076081bd82e1d97d33d.mockapi.io/moto')
      const responseData = await res.json()

      // Arrays para armazenar valores únicos de cada propriedade
      const uniqueBrands = new Set<string>()
      const uniqueModels = new Set<string>()
      const uniqueCCs = new Set<string>()
      const uniqueDates = new Set<string>()

      // Varre cada objeto e adiciona as propriedades aos arrays únicos
      responseData.forEach((item: {
        brand: string
        model: string
        cc: string
        createdAt: string
      }) => {
        uniqueBrands.add(item.brand)
        uniqueModels.add(item.model)
        uniqueCCs.add(String(item.cc))
        uniqueDates.add(item.createdAt)
      })

      // Converte os sets para arrays
      const brandsArray = Array.from(uniqueBrands)
      const modelsArray = Array.from(uniqueModels)
      const ccsArray = Array.from(uniqueCCs)
      const datesArray = Array.from(uniqueDates)

      const fields = {
        brandsArray,
        modelsArray,
        ccsArray,
        datesArray
      }

      setFields(fields)

      // set Numbers Page
      setPages(Math.ceil(responseData.length / limit))

      // Retorna os dados originais e os arrays únicos
      return responseData
    }
  })

  const { data = [] } = useQuery<IMoto[]>({
    queryKey: ['repoData', {
      limit: 8,
      page: (searchParams.get('page') ?? '1'),
      brand: searchParams.get('brand') !== null ? searchParams.get('brand') : undefined,
      cc: searchParams.get('cc') !== null ? Number(searchParams.get('cc')).toString() : undefined,
      createdAt: searchParams.get('publishedDate') !== null ? searchParams.get('publishedDate') : undefined
    }],
    queryFn: async () => {
      const queryParams = new URLSearchParams()

      if (searchParams.get('brand') !== null) {
        queryParams.set('brand', searchParams.get('brand') ?? '')
      }

      if (searchParams.get('cc') !== null) {
        queryParams.set('cc', Number(searchParams.get('cc')).toString() ?? '')
      }

      if (searchParams.get('publishedDate') !== null) {
        queryParams.set('createdAt', searchParams.get('publishedDate') ?? '')
      }

      const res = await fetch(`https://65aad076081bd82e1d97d33d.mockapi.io/moto?limit=${limit}&page=${searchParams.get('page') ?? '1'}&${queryParams.toString()}`)
      const responseData = await res.json()

      if (queryParams.size > 0) setPages(Math.ceil(responseData.length / limit))

      return responseData
    }
  })

  if (isPending) return 'Loading...'
  if (error != null) return 'An error has occurred: ' + error.message

  const handleChange = (event: React.ChangeEvent<unknown>, value: number): void => {
    const searchParams = new URLSearchParams()

    searchParams.set('page', String(value))
    navigate({ search: searchParams.toString() })
  }

  return (
    <>
      <Carousel />

      <Container maxWidth="xl" sx={{ marginTop: 4 }}>
        <Grid container spacing={8}>
          <Grid item xs={12} sm={12} md={3}>
            <Box sx={{ textAlign: 'left', marginBottom: 2 }}>
              <Typography>Filtro</Typography>
            </Box>
            <Filters fields={fields} />
          </Grid>
          {data.length > 0
            ? <Grid item xs={12} sm={12} md={9} sx={{ mb: 8 }}>
              <Box
                sx={{
                  marginBottom: 2,
                  width: '100%',
                  display: 'flex',
                  justifyContent: 'right'
                }}
              >

                <TagsFilter />

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
              <ListMotos data={data} />
              <Pagination count={pages} onChange={handleChange} />
            </Grid>
            : <Grid item xs={12} sm={12} md={9} sx={{ mb: 8 }}>
              <Box sx={{ mt: 8, width: '100%' }}>
                <Typography>Nenhum item para mostrar</Typography>
              </Box>
            </Grid>
            }
        </Grid>
      </Container>
    </>
  )
}

export default HomePage
