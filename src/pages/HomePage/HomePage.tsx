import React, { useEffect, useState } from 'react'
import Carousel from '../../components/Carousel/Carousel'
import ListMotos from '../../components/ListMotos/ListMotos'
import {
  Box,
  Container,
  Grid,
  Typography,
  Autocomplete,
  TextField,
  Pagination,
  useMediaQuery,
  useTheme
} from '@mui/material'
import { useQuery } from '@tanstack/react-query'

import Filters from '../../components/Filters/Filters'
import TagsFilter from '../../components/TagsFilter/TagsFilter'
import { useNavigate, useSearchParams } from 'react-router-dom'
import Loading from '../../components/Loading/Loading'
import { ToastContainer } from 'react-toastify'

import 'react-toastify/dist/ReactToastify.css'
import { formateDate, prepareFormateDate } from '../../utils/functions'

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
  quantity?: number
}

const sortOptions = [
  { key: '1', label: 'Preço: Maior para o menor' },
  { key: '2', label: 'Preço: Menor para o maior' },
  { key: '3', label: 'Data: Maior para a menor' },
  { key: '4', label: 'Data: Menor para a maior' }
]

const HomePage = (): JSX.Element | string => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

  const queryParams = new URLSearchParams()
  const navigate = useNavigate()
  const limit = 8
  const [pages, setPages] = useState(1)
  const [searchParams] = useSearchParams()
  const [fields, setFields] = useState<any>(null)
  const [filteredData, setFilteredData] = useState<any>([])

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
      uniqueDates.add(formateDate(item.createdAt))
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
  const { isPending, error, data: totalData, isFetching } = useQuery<any>({
    queryKey: ['repoData'],
    queryFn: async () => {
      const res = await fetch('https://65aad076081bd82e1d97d33d.mockapi.io/moto')
      const responseData: IMoto[] = await res.json()

      handleFields(responseData)

      return responseData
    }
  })

  const { data = [] } = useQuery<IMoto[] | null>({
    queryKey: ['repoData', {
      limit: 8,
      page: (searchParams.get('page') ?? '1'),
      search: searchParams.get('search') !== null ? searchParams.get('search') : undefined,
      from: searchParams.get('from') !== null ? searchParams.get('from') : undefined,
      to: searchParams.get('to') !== null ? searchParams.get('to') : undefined,
      brand: searchParams.get('brand') !== null ? searchParams.get('brand') : undefined,
      model: searchParams.get('model') !== null ? searchParams.get('model') : undefined,
      cc: searchParams.get('cc') !== null ? Number(searchParams.get('cc')).toString() : undefined,
      createdAt: searchParams.get('publishedDate') !== null ? prepareFormateDate(searchParams.get('publishedDate') ?? '') : undefined,
      sortBy: searchParams.get('sortBy') !== null ? searchParams.get('sortBy') : undefined,
      order: searchParams.get('order') !== null ? searchParams.get('order') : undefined
    }],
    queryFn: async () => {
      if (searchParams.get('search') !== null) {
        queryParams.set('search', searchParams.get('search') ?? '')
      }

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
        queryParams.set('createdAt', prepareFormateDate(searchParams.get('publishedDate') ?? ''))
      }

      if (searchParams.get('sortBy') !== null) {
        queryParams.set('sortBy', searchParams.get('sortBy') ?? '')
      }

      if (searchParams.get('order') !== null) {
        queryParams.set('order', searchParams.get('order') ?? '')
      }

      const res = await fetch(`https://65aad076081bd82e1d97d33d.mockapi.io/moto?limit=${limit}&page=${searchParams.get('page') ?? '1'}&${queryParams.toString()}`)
      const responseData = await res.json()

      if (queryParams.size > 0) {
        setPages(Math.ceil(responseData.length / limit))
      }

      // to filter price - mockapi doesnt permit filter in free plan
      filterPrice(responseData)

      return responseData
    }

  })

  useEffect(() => {
    if (!isFetching && (Boolean(totalData))) {
      if (queryParams.toString().length === 0) {
        setPages(Math.ceil(totalData?.length / limit))
      }
    }
  }, [isFetching, totalData])

  const filterPrice = (responseData: any): void => {
    if (Array.isArray(data)) {
      const filteredData = (searchParams.get('from') !== null || searchParams.get('to') !== null)
        ? responseData.filter((rd: any) => {
          const price = rd.price

          return (
            (searchParams.get('from') === null || price >= Number(searchParams.get('from'))) &&
            (searchParams.get('to') === null || price <= Number(searchParams.get('to')))
          )
        })
        : responseData

      if (queryParams.size > 0) {
        setPages(Math.ceil(responseData.length / limit))
      }

      setFilteredData(filteredData)
    }
  }

  if (isPending) return <Loading />
  if (error != null) return 'An error has occurred: ' + error.message

  const handleChange = (event: React.ChangeEvent<unknown>, value: number): void => {
    const searchParams = new URLSearchParams()

    searchParams.set('page', String(value))
    navigate({ search: searchParams.toString() })
  }

  const handleSort = (event: React.ChangeEvent<unknown>, value: any): void => {
    const newSearchParams = new URLSearchParams(searchParams.toString())

    if (value === '1') {
      newSearchParams.set('sortBy', 'price')
      newSearchParams.set('order', 'desc')
    } else if (value === '2') {
      newSearchParams.set('sortBy', 'price')
      newSearchParams.set('order', 'asc')
    } else if (value === '3') {
      newSearchParams.set('sortBy', 'date')
      newSearchParams.set('order', 'desc')
    } else if (value === '4') {
      newSearchParams.set('sortBy', 'date')
      newSearchParams.set('order', 'asc')
    }

    navigate({ search: newSearchParams.toString() })
  }

  const handleSelectedSortOption = (): any => {
    const sortBy = searchParams.get('sortBy')
    const order = searchParams.get('order')

    if (sortBy === 'price' && order === 'desc') {
      return {
        key: '2',
        label: 'Preço: Maior para o menor'
      }
    } else if (sortBy === 'price' && order === 'asc') {
      return {
        key: '1',
        label: 'Preço: Menor para o maior'
      }
    } else if (sortBy === 'date' && order === 'desc') {
      return {
        key: '4',
        label: 'Data: Maior para a menor'
      }
    } else if (sortBy === 'date' && order === 'asc') {
      return {
        key: '3',
        label: 'Data: Menor para a maior'
      }
    } else {
      return {
        key: '1',
        label: 'Preço: Menor para o maior'
      }
    }
  }

  const clearFilter = (): void => {
    setPages(Math.ceil(totalData?.length / limit))
  }

  return (
    <>
      <ToastContainer />
      <Carousel />
      <Container maxWidth="xl" sx={{ marginTop: 4, pb: 10 }}>
        <Grid container spacing={8}>
          <Grid item xs={12} sm={12} md={3}>
            <Box sx={{ textAlign: 'left', marginBottom: 2 }}>
              <Typography>Filtro</Typography>
            </Box>
            <Filters fields={fields} clear={() => { clearFilter() }} />
          </Grid>
          {Array.isArray(filteredData) && filteredData.length > 0
            ? <Grid item xs={12} sm={12} md={9} sx={{ mb: 8 }}>
              <Box
                sx={{
                  marginBottom: 2,
                  width: '100%',
                  display: 'flex',
                  flexDirection: isMobile ? 'column' : 'row',
                  justifyContent: 'right'
                }}
              >

                <TagsFilter />

                <Autocomplete
                  disablePortal
                  id="model-filter"
                  options={sortOptions}
                  onChange={(_, value) => { handleSort(_, value?.key) }}
                  value={handleSelectedSortOption() ?? {}}
                  sx={{
                    width: '100%',
                    mt: isMobile ? 4 : 0,
                    maxWidth: 250,
                    '@media (max-width: 600px)': {
                      width: '100%',
                      maxWidth: '100%',
                      minWidth: '100%'
                    }
                  }}
                  renderInput={(params) => (
                    <TextField {...params} label="Ordenar" />
                  )}
                />

              </Box>
              <ListMotos data={Array.isArray(filteredData) ? filteredData : []} />
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
