import React, { useState, useEffect } from 'react'
import { Autocomplete, Box, TextField, Button } from '@mui/material'
import { useNavigate, useLocation } from 'react-router-dom'

interface IFields {
  brandsArray: string[]
  modelsArray: string[]
  ccsArray: string[]
  datesArray: string[]
}

interface IFilters {
  fields: IFields
  clear: () => void
}

const Filters: React.FC<IFilters> = ({ fields, clear }): JSX.Element => {
  const navigate = useNavigate()
  const location = useLocation()
  const searchParams = new URLSearchParams(location.search)
  const [searchValue, setSearchValue] = useState<string>('')
  const [brandValue, setBrandValue] = useState<string | null>(null)
  const [fromValue, setFromValue] = useState<string | null>(null)
  const [toValue, setToValue] = useState<string | null>(null)
  const [modelValue, setModelValue] = useState<string | null>(null)
  const [CCValue, setCCValue] = useState<string | null>(null)
  const [publishedDate, setPublishedDate] = useState<string | null>(null)

  useEffect(() => {
    setSearchValue(searchParams.get('search') ?? '')
    setFromValue(searchParams.get('from') ?? null)
    setToValue(searchParams.get('to') ?? null)
    setBrandValue(searchParams.get('brand') ?? null)
    setModelValue(searchParams.get('model') ?? null)
    setCCValue(searchParams.get('cc') ?? null)
    setPublishedDate(searchParams.get('publishedDate') ?? null)
  }, [location.search])

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setSearchValue(event.target.value)
  }

  const handleKeyPress = (event: React.KeyboardEvent): void => {
    if (event.key === 'Enter') {
      handleNavigation()
    }
  }

  const handleNavigation = (): void => {
    searchParams.delete('page')
    if (searchValue.trim() !== '') searchParams.set('search', searchValue.trim())
    if (fromValue !== null && fromValue.trim() !== '') searchParams.set('from', fromValue.trim())
    if (toValue !== null && toValue.trim() !== '') searchParams.set('to', toValue.trim())
    if (modelValue !== null && modelValue.trim() !== '') searchParams.set('model', modelValue.trim())
    if (brandValue !== null && brandValue.trim() !== '') searchParams.set('brand', brandValue.trim())
    if (CCValue !== null && CCValue.trim() !== '') searchParams.set('cc', CCValue.trim())
    if (publishedDate !== null && publishedDate.trim() !== '') searchParams.set('publishedDate', publishedDate.trim())

    navigate({ search: searchParams.toString() })
  }

  const handleSearch = (): void => {
    handleNavigation()
  }

  const handleClearFilters = (): void => {
    setSearchValue('')
    setFromValue('')
    setToValue('')
    setBrandValue(null)
    setModelValue(null)
    setCCValue(null)
    setPublishedDate(null)
    navigate({ search: '' })
    clear()
  }

  return (
    <Box>
      <TextField
        id="search-input"
        label="Pesquisar"
        variant="outlined"
        sx={{ width: '100%', marginBottom: 2 }}
        value={searchValue}
        onChange={handleSearchChange}
        onKeyPress={handleKeyPress}
      />

      <Autocomplete
        disablePortal
        id="model-filter"
        options={fields?.modelsArray }
        sx={{ marginBottom: 2 }}
        renderInput={(params) => <TextField {...params} label="Modelo" />}
        value={modelValue}
        onChange={(_, value) => { setModelValue(value) }}
      />

      <Autocomplete
        disablePortal
        id="brand-filter"
        options={fields?.brandsArray}
        sx={{ marginBottom: 2 }}
        renderInput={(params) => <TextField {...params} label="Marca" />}
        value={brandValue}
        onChange={(_, value) => { setBrandValue(value) }}
      />

      <Autocomplete
        disablePortal
        id="cc-filter"
        options={fields?.ccsArray}
        sx={{ marginBottom: 2 }}
        renderInput={(params) => <TextField {...params} label="Cilindradas" />}
        value={CCValue}
        onChange={(_, value) => { setCCValue(value) }}
      />

      <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: 2 }}>

        <TextField
          type='number'
          id="from-input"
          label="Preço mínimo"
          variant="outlined"
          sx={{ width: '100%', marginRight: 2 }}
          value={fromValue}
          inputProps={{ minLength: 0 }}
          onChange={(event) => { setFromValue(event.target.value) }}
        />
        <TextField
          type='number'
          id="to-input"
          label="Preço máximo"
          variant="outlined"
          sx={{ width: '100%' }}
          value={toValue}
          onChange={(event) => { setToValue(event.target.value) }}
        />
      </Box>

      <Autocomplete
        disablePortal
        id="date-filter"
        options={fields?.datesArray}
        sx={{ marginBottom: 2 }}
        renderInput={(params) => <TextField {...params} label="Data de publicação" />}
        value={publishedDate}
        onChange={(_, value) => { setPublishedDate(value) }}
      />

      <Button
        variant="contained"
        sx={{ backgroundColor: '#1A1A1A', ':hover': { backgroundColor: '#000' }, width: '100%' }}
        onClick={handleSearch}
      >
        Buscar
      </Button>
      <Button
        variant="contained"
        sx={{ backgroundColor: '#454545', ':hover': { backgroundColor: '#000' }, width: '100%', mt: 1 }}
        onClick={handleClearFilters}
      >
        Limpar filtros
      </Button>
    </Box>
  )
}

export default Filters
