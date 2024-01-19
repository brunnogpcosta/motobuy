import React from 'react'
import { Autocomplete, Box, TextField } from '@mui/material'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'

const Filters = (): JSX.Element => {
  return (
    <Box>
      <TextField
        id="outlined-basic"
        label="Pesquisar"
        variant="outlined"
        sx={{ width: '100%', marginBottom: 2 }}
      />

      <Box sx={{ display: 'flex', marginBottom: 2 }}>
        <TextField
          id="outlined-basic"
          label="de"
          variant="outlined"
          sx={{ width: '100%', marginRight: 2 }}
        />

        <TextField
          id="outlined-basic"
          label="até"
          variant="outlined"
          sx={{ width: '100%' }}
        />
      </Box>
      <Autocomplete
        disablePortal
        id="brand-filter"
        options={['honda', 'yamaha']}
        sx={{ marginBottom: 2 }}
        renderInput={(params) => <TextField {...params} label="Marca" />}
      />

      <Autocomplete
        disablePortal
        id="model-filter"
        options={['model1', 'model2']}
        sx={{ marginBottom: 2 }}
        renderInput={(params) => <TextField {...params} label="Modelo" />}
      />

      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker sx={{ width: '100%' }}/>
      </LocalizationProvider>
    </Box>
  )
}

export default Filters
