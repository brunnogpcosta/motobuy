import React from 'react'

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
import { toCurrencyFormat } from '../../utils/functions'
import { useShoppingCart } from '../../contexts/shoppingCart'

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

interface IListCarShoppingMotos {
  resume?: boolean
  motos: IMoto[]
}

const ListCarShoppingMotos: React.FC<IListCarShoppingMotos> = ({ motos, resume }): JSX.Element => {
  const { removeItemsById, addItem, removeAItem } = useShoppingCart()
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
            <img src={moto.photo} width={100} alt={moto.name} />
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
              {
                (resume === false) &&
                <IconButton onClick={() => { removeAItem(moto.id) }}>
                  <LessIcon />
                </IconButton>
              }
              <Typography sx={{ p: 1 }}>{moto.quantity}</Typography>
              {
                (resume === false) &&
                <IconButton onClick={() => { addItem(moto) }} >
                  <PlusIcon />
                </IconButton>
              }
            </Box>
          </Box>

          <Box sx={{ textAlign: 'left', padding: 4 }}>
            <Typography sx={{ fontWeight: 'light' }}>Preço</Typography>
            <Typography sx={{ fontWeight: 'bold' }}>R$ {toCurrencyFormat(moto.price * (moto?.quantity ?? 1))}</Typography>
          </Box>

          {
            (resume === false) &&
            <IconButton sx={{ mb: isSmallScreen ? 2 : 0, mr: isSmallScreen ? 0 : 2 }} onClick={() => { removeItemsById(moto.id) }}>
              <CloseIcon color="error" />
            </IconButton>
          }

        </Paper>

      ))}
    </Box>
  )
}

export default ListCarShoppingMotos
