import React from 'react'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'

import Typography from '@mui/material/Typography'

import Container from '@mui/material/Container'
import Tooltip from '@mui/material/Tooltip'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import { Button } from '@mui/material'
import ModalCarShopping from '../ModalCarShopping/ModalCarShopping'
import { useShoppingCart } from '../../contexts/shoppingCart'

const Header = (): JSX.Element => {
  const [openModal, setOpenModal] = React.useState(false)
  const { countItems } = useShoppingCart()

  return (
    <AppBar position="static" sx={{ bgcolor: '#D9D9D9', py: 2 }} elevation={0}>
      <Container maxWidth="xl">
        <Box
          sx={{
            justifyContent: 'space-between',
            display: 'flex'
          }}
        >
          <Typography
            variant="h6"
            component="a"
            href="/"
            sx={{
              fontFamily: 'roboto',
              fontWeight: 700,
              color: 'black',
              textDecoration: 'none'
            }}
          >
            MotoBuy
          </Typography>

          <Box>
            <Tooltip title="Carrinho de compras">
              <Button
                onClick={() => {
                  setOpenModal(true)
                }}
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  color: 'black',
                  backgroundColor: '#fff',
                  ':hover': {
                    backgroundColor: '#f3f3f3'
                  },
                  borderRadius: 20
                }}
              >
                <ShoppingCartIcon sx={{ mr: 1 }} />
                <Typography>{ countItems() ?? 0}</Typography>
              </Button>
            </Tooltip>
            <ModalCarShopping
              openModal={openModal}
              setOpenModal={(value) => {
                setOpenModal(value)
              }}
            />
          </Box>
        </Box>
      </Container>
    </AppBar>
  )
}
export default Header
