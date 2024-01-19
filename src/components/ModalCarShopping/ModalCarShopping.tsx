import { Box, Button, IconButton, Modal, Typography, useMediaQuery, useTheme } from '@mui/material'
import React from 'react'
import CancelIcon from '@mui/icons-material/Cancel'
import ListCarShoppingMotos from '../ListCarShoppingMotos/ListCarShoppingMotos'

interface IModalCarShopping {
  openModal: boolean
  setOpenModal: (button: boolean) => void
}

const ModalCarShopping: React.FC<IModalCarShopping> = ({
  openModal,
  setOpenModal
}): JSX.Element => {
  const theme = useTheme()
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'))

  return (
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
          width: isSmallScreen ? '80%' : '40%',
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
          <Typography id="modal-modal-title" variant="h6" component="h2">
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

        <Box sx={{ overflowY: 'auto', overflowX: 'hidden', mx: 2 }}>
          <ListCarShoppingMotos />
        </Box>

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
            <Typography id="modal-modal-description" sx={{ fontSize: 20 }}>
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
  )
}

export default ModalCarShopping
