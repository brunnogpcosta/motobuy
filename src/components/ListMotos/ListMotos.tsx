import React from 'react'
import { Box, Button, Grid, Typography } from '@mui/material'
import { toCurrencyFormat } from '../../utils/functions'

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

interface IListMotos {
  data: IMoto[]

}

const ListMotos: React.FC<IListMotos> = ({ data }): JSX.Element => {
  return (
    <Box sx={{ flexGrow: 1, pb: 2 }}>
      <Grid container spacing={2}>
        {data?.map((moto, index) => (
          <Grid item key={index} xs={12} sm={6} md={3} lg={3} xl={3}>
            <Box
              sx={{
                backgroundColor: '#f3f3f3',
                padding: 2,
                borderRadius: 2
              }}
            >
              <img src={moto.photo} width="100%" alt={moto.name} height={160} style={{ objectFit: 'cover' }} />
            </Box>
            <Box sx={{ textAlign: 'left', p: 1 }}>
              <Typography sx={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                <abbr title={moto.name} style={{ textDecoration: 'none' }}>
                  {moto.name}
                </abbr>
              </Typography>

              <Typography sx={{ fontWeight: 'light' }}>
                {moto.description}
              </Typography>
              <Typography sx={{ fontWeight: 'bold', fontSize: 20 }}>
                R$ {toCurrencyFormat(moto.price)}
              </Typography>
              <Button
                variant="contained"
                sx={{
                  backgroundColor: '#1A1A1A',
                  ':hover': { backgroundColor: '#000' },
                  width: '100%',
                  marginTop: 1
                }}
              >
                Adicionar ao carrinho
              </Button>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  )
}

export default ListMotos
