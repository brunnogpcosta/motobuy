import React, { useState, type ChangeEvent, type KeyboardEvent } from 'react'
import { Autocomplete, Box, TextField, Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'

const Filters = (): JSX.Element => {
  const navigate = useNavigate()

  const [searchValue, setSearchValue] = useState<string>('')
  const [fromValue, setFromValue] = useState<string>('')
  const [toValue, setToValue] = useState<string>('')
  const [brandValue, setBrandValue] = useState<string | null>(null)
  const [CCValue, setCCValue] = useState<string | null>(null)
  const [publishedDate, setPublishedDate] = useState<string | null>(null)

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setSearchValue(event.target.value)
  }

  const handleKeyPress = (event: KeyboardEvent): void => {
    if (event.key === 'Enter') {
      handleNavigation()
    }
  }

  const handleNavigation = (): void => {
    const searchParams = new URLSearchParams()

    if (searchValue.trim() !== '') searchParams.set('search', searchValue.trim())
    if (fromValue.trim() !== '') searchParams.set('from', fromValue.trim())
    if (toValue.trim() !== '') searchParams.set('to', toValue.trim())
    if (brandValue !== null && brandValue.trim() !== '') searchParams.set('brand', brandValue.trim())
    if (CCValue !== null && CCValue.trim() !== '') searchParams.set('model', CCValue.trim())
    if (publishedDate !== null && publishedDate.trim() !== '') searchParams.set('model', publishedDate.trim())

    navigate({ search: searchParams.toString() })
  }

  const handleBuscarClick = (): void => {
    handleNavigation()
  }

  const handleLimparFiltrosClick = (): void => {
    setSearchValue('')
    setFromValue('')
    setToValue('')
    setBrandValue(null)
    setCCValue(null)
    setPublishedDate(null)
    navigate({ search: '' })
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

      <Box sx={{ display: 'flex', marginBottom: 2 }}>
        <TextField
          id="from-input"
          label="de"
          type='number'
          variant="outlined"
          sx={{ width: '100%', marginRight: 2 }}
          value={fromValue}
          onChange={(event) => { setFromValue(event.target.value) }}
        />

        <TextField
          id="to-input"
          type='number'
          label="até"
          variant="outlined"
          sx={{ width: '100%' }}
          value={toValue}
          onChange={(event) => { setToValue(event.target.value) }}
        />
      </Box>

      <Autocomplete
        disablePortal
        id="brand-filter"
        options={['honda', 'yamaha']}
        sx={{ marginBottom: 2 }}
        renderInput={(params) => <TextField {...params} label="Marca" />}
        value={brandValue}
        onChange={(_, value) => { setBrandValue(value) }}
      />

      <Autocomplete
        disablePortal
        id="model-filter"
        options={['model1', 'model2']}
        sx={{ marginBottom: 2 }}
        renderInput={(params) => <TextField {...params} label="Cilindradas" />}
        value={CCValue}
        onChange={(_, value) => { setCCValue(value) }}
      />

      <Autocomplete
        disablePortal
        id="model-filter"
        options={['model1', 'model2']}
        sx={{ marginBottom: 2 }}
        renderInput={(params) => <TextField {...params} label="Data de publicação" />}
        value={publishedDate}
        onChange={(_, value) => { setPublishedDate(value) }}
      />

      <Button
        variant="contained"
        sx={{ backgroundColor: '#1A1A1A', ':hover': { backgroundColor: '#000' }, width: '100%' }}
        onClick={handleBuscarClick}
      >
        Buscar
      </Button>
      <Button
        variant="contained"
        sx={{ backgroundColor: '#454545', ':hover': { backgroundColor: '#000' }, width: '100%', mt: 1 }}
        onClick={handleLimparFiltrosClick}
      >
        Limpar filtros
      </Button>
    </Box>
  )
}

export default Filters
