import React from 'react'
import motos from '../../utils/getMotos'
import {
  Box,
  IconButton,
  Paper,
  Typography,
  useMediaQuery,
  useTheme
} from '@mui/material'
import LessIcon from '@mui/icons-material/Remove'
import PlusIcon from '@mui/icons-material/Add'
import CloseIcon from '@mui/icons-material/Delete'

const ListCarShoppingMotos = (): JSX.Element => {
  const theme = useTheme()
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'))

  return (
    <Box sx={{ flexGrow: 1, width: '100%' }}>
      {motos.map((moto, index) => (
        <Paper
          key={index}
          sx={{
            display: 'flex',
            flexDirection: isSmallScreen ? 'column' : 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%',
            mb: 2,
            boxSizing: 'border-box'
          }}
        >
          <Box
            sx={{
              padding: 2,
              borderRadius: 2,
              marginBottom: isSmallScreen ? 2 : 0,
              width: isSmallScreen ? '100%' : 'auto'
            }}
          >
            <img src={moto.image} width={100} alt={moto.name} />
          </Box>

          <Box sx={{ textAlign: 'left', padding: 4, flex: 1 }}>
            <Typography sx={{ fontWeight: 'light' }}>Descrição</Typography>
            <Typography>{moto.name}</Typography>
          </Box>

          <Box
            sx={{
              textAlign: 'left',
              padding: 4,
              flex: isSmallScreen ? 'auto' : 1
            }}
          >
            <Typography sx={{ fontWeight: 'light' }}>Qtd.</Typography>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <IconButton>
                <LessIcon />
              </IconButton>
              <Typography sx={{ p: 1 }}>1</Typography>
              <IconButton>
                <PlusIcon />
              </IconButton>
            </Box>
          </Box>

          <Box sx={{ textAlign: 'left', padding: 4 }}>
            <Typography sx={{ fontWeight: 'light' }}>Preço</Typography>
            <Typography sx={{ fontWeight: 'bold' }}>R$ {moto.price}</Typography>
          </Box>

          <IconButton>
                <CloseIcon color="error"/>
              </IconButton>
        </Paper>

      ))}
    </Box>
  )
}

export default ListCarShoppingMotos
