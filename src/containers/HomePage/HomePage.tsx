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
import Loading from '../../components/Loading/Loading'

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
  const queryParams = new URLSearchParams()
  const navigate = useNavigate()
  const limit = 8
  const [pages, setPages] = useState(1)
  const [searchParams] = useSearchParams()
  const [fields, setFields] = useState<any>(null)

  const handleFields = (responseData: any): void => {
    const uniqueBrands = new Set<string>()
    const uniqueModels = new Set<string>()
    const uniqueCCs = new Set<string>()
    const uniqueDates = new Set<string>()

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
  }

  // im do this beacouse the mockApi dont have count items in free plan
  const { isPending, error } = useQuery<any>({
    queryKey: ['repoData'],
    queryFn: async () => {
      const res = await fetch('https://65aad076081bd82e1d97d33d.mockapi.io/moto')
      const responseData: IMoto[] = await res.json()

      handleFields(responseData)
      // set Numbers Page
      setPages(Math.ceil(responseData.length / limit))

      return responseData
    }
  })

  const { data = [] } = useQuery<IMoto[] | null>({
    queryKey: ['repoData', {
      limit: 8,
      page: (searchParams.get('page') ?? '1'),
      brand: searchParams.get('brand') !== null ? searchParams.get('brand') : undefined,
      model: searchParams.get('model') !== null ? searchParams.get('model') : undefined,
      cc: searchParams.get('cc') !== null ? Number(searchParams.get('cc')).toString() : undefined,
      createdAt: searchParams.get('publishedDate') !== null ? searchParams.get('publishedDate') : undefined,
      sortBy: searchParams.get('sortBy') !== null ? searchParams.get('sortBy') : undefined
    }],
    queryFn: async () => {
      if (searchParams.get('model') !== null) {
        queryParams.set('model', searchParams.get('model') ?? '')
      }

      if (searchParams.get('brand') !== null) {
        queryParams.set('brand', searchParams.get('brand') ?? '')
      }

      if (searchParams.get('cc') !== null) {
        queryParams.set('cc', Number(searchParams.get('cc')).toString() ?? '')
      }

      if (searchParams.get('publishedDate') !== null) {
        queryParams.set('createdAt', searchParams.get('publishedDate') ?? '')
      }

      if (searchParams.get('sortBy') !== null) {
        queryParams.set('sortBy', searchParams.get('sortBy') ?? '')
      }

      if (searchParams.get('order') !== null) {
        queryParams.set('order', searchParams.get('order') ?? '')
      }

      const res = await fetch(`https://65aad076081bd82e1d97d33d.mockapi.io/moto?limit=${limit}&page=${searchParams.get('page') ?? '1'}&${queryParams.toString()}`)
      const responseData = await res.json()

      if (queryParams.size > 0) setPages(Math.ceil(responseData.length / limit))

      return responseData
    }
  })

  if (isPending) return <Loading/>
  if (error != null) return 'An error has occurred: ' + error.message

  const handleChange = (event: React.ChangeEvent<unknown>, value: number): void => {
    const searchParams = new URLSearchParams()

    searchParams.set('page', String(value))
    navigate({ search: searchParams.toString() })
  }

  const handleSort = (event: React.ChangeEvent<unknown>, value: any): void => {
    const newSearchParams = new URLSearchParams(searchParams.toString())

    newSearchParams.set('sortBy', 'price')

    if (value === '2') {
      newSearchParams.set('order', 'asc')
    } else {
      newSearchParams.set('order', 'desc')
    }

    navigate({ search: newSearchParams.toString() })
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
          {Array.isArray(data) && data.length > 0
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
                  options={[{ key: '1', label: 'Preço: Maior para o menor' }, { key: '2', label: 'Preço: Menor para o Maior' }]}
                  onChange={(_, value) => { handleSort(_, value?.key) }}
                  value={{ key: searchParams.get('order') === 'desc' ? '2' : '1', label: searchParams.get('order') === 'desc' ? 'Preço: Maior para o menor' : 'Preço: Menor para o maior' }}
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
              <ListMotos data={Array.isArray(data) ? data : []} />
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
