import React from 'react'
import Slider from 'react-slick'
import { Typography, Button, Grid, Box, Container, useTheme, useMediaQuery } from '@mui/material'
import CustomImage from '../../assets/motos/custom/meteor.png'
import SportImage from '../../assets/motos/esportivas/860x550-imagem-home-moto-honda-crf-1100l-africa-twin-adventure-sports-dct-2023-branco-perolizado-v2.png'
import ScooterImage from '../../assets/motos/scooter/moto_honda_adv_verde_fosco.png'
import UrbanImage from '../../assets/motos/urbana/CG Cargo - branco.png'

import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

interface CarouselItem {
  image: string
  title: string
  description: string
}

const Carousel: React.FC = () => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

  const settings = {
    dots: true,
    infinite: true,
    speed: 4000,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
    adaptiveHeight: true
  }

  const carouselItems: CarouselItem[] = [
    {
      image: CustomImage,
      title: 'Custom',
      description: 'Motos para quem procura estilo e estrada'
    },
    {
      image: SportImage,
      title: 'Supersport',
      description: 'Potência pura e design aerodinâmico para quem busca a emoção máxima na estrada.'
    },
    {
      image: ScooterImage,
      title: 'Scooter',
      description: 'Agilidade urbana e eficiência em um pacote elegante, perfeito para deslocamentos diários.'
    },
    {
      image: UrbanImage,
      title: 'Urban',
      description: 'Estilo moderno e versatilidade para dominar as ruas da cidade com facilidade.'
    }
  ]

  return (
    <Box sx={{ backgroundColor: '#D9D9D9', pb: 6 }}>
      <Slider {...settings}>
        {carouselItems.map((item, index) => (
          <div key={index}>
            <Container maxWidth="xl">
              <Grid container spacing={3} sx={{ py: isMobile ? 4 : 8 }}>
                <Grid item xs={12} md={6}>
                  <img src={item.image} alt={`Imagem ${index}`} style={{ width: isMobile ? '100%' : 400, borderRadius: '8px' }} />
                </Grid>
                <Grid item xs={12} md={6} sx={{ textAlign: isMobile ? 'center' : 'left' }}>
                  <Typography variant="h3" sx={{ fontWeight: 'regular', mb: 2 }}>
                    {item.title}
                  </Typography>
                  <Typography variant="body1" sx={{ fontSize: isMobile ? 18 : 30, fontWeight: 'light', mb: 3 }}>
                    {item.description}
                  </Typography>
                  <Button
                    variant="contained"
                    sx={{ backgroundColor: '#1A1A1A', ':hover': { backgroundColor: '#000' }, width: '100%', height: 50 }}
                  >
                    Ver modelos
                  </Button>
                </Grid>
              </Grid>
            </Container>
          </div>
        ))}
      </Slider>
    </Box>
  )
}

export default Carousel
