import React from 'react'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'

import Typography from '@mui/material/Typography'
import CancelIcon from '@mui/icons-material/Cancel'
import Container from '@mui/material/Container'
// import Avatar from '@mui/material/Avatar'
import Tooltip from '@mui/material/Tooltip'
// import MenuItem from '@mui/material/MenuItem'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import { Button, IconButton, Modal } from '@mui/material'

// const settings = ['Profile', 'Account', 'Dashboard', 'Logout']

const Header = (): JSX.Element => {
  const [openModal, setOpenModal] = React.useState(false)

  return (
    <AppBar position="static" sx={{ bgcolor: '#D9D9D9' }} elevation={0}>
      <Container maxWidth="xl">
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'roboto',
              fontWeight: 700,
              color: 'black',
              textDecoration: 'none'
            }}
          >
            MotoBuy
          </Typography>

          <Box sx={{ flexGrow: 0 }}>
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
                <Typography>2</Typography>
              </Button>
            </Tooltip>
            <Modal
              open={openModal}
              onClose={() => {
                setOpenModal(false)
              }}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box
                sx={{
                  position: 'absolute',
                  top: '0',
                  right: '0',
                  bottom: '0',
                  width: '30%',
                  backgroundColor: '#D9D9D9',
                  outline: 'none',
                  display: 'flex',
                  flexDirection: 'column'
                }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    p: 2
                  }}
                >
                  <Typography
                    id="modal-modal-title"
                    variant="h6"
                    component="h2"
                  >
                    Carrinho de compras
                  </Typography>

                  <IconButton
                    onClick={() => {
                      setOpenModal(false)
                    }}
                  >
                    <CancelIcon
                      sx={{
                        color: '#1A1A1A',
                        ':hover': { color: '#000' }
                      }}
                    />
                  </IconButton>
                </Box>

                <Typography id="modal-modal-description" sx={{ mt: 2, p: 2 }}>
                  Duis mollis, est non commodo luctus, nisi erat porttitor
                  ligula.
                </Typography>

                <Box
                  sx={{
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'flex-end'
                  }}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      mt: 2,
                      p: 2
                    }}
                  >
                    <Typography
                      id="modal-modal-description"
                      sx={{ fontWeight: 700, fontSize: 20 }}
                    >
                      Total
                    </Typography>
                    <Typography
                      id="modal-modal-description"
                      sx={{ fontSize: 20 }}
                    >
                      R$ 22.000,00
                    </Typography>
                  </Box>

                  <a href={'/checkout'}>
                    <Button
                      sx={{
                        backgroundColor: '#1A1A1A',
                        width: '100%',
                        height: '60px',
                        borderRadius: 0,
                        color: 'white',
                        mt: 2,
                        ':hover': {
                          backgroundColor: '#000'
                        }
                      }}
                    >
                      <Typography>Continuar a compra</Typography>
                    </Button>
                  </a>
                </Box>
              </Box>
            </Modal>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  )
}
export default Header
