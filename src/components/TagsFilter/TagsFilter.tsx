import React, { useEffect, useState } from 'react'
import { Close } from '@mui/icons-material'
import { Box, IconButton, Typography } from '@mui/material'

const TagsFilter = (): JSX.Element => {
  const [urlParams, setUrlParams] = useState<URLSearchParams>(new URLSearchParams())

  useEffect(() => {
    const currentUrlParams = new URLSearchParams(window.location.search)
    setUrlParams(currentUrlParams)
  }, [])

  const removeParam = (paramKey: string): void => {
    const updatedParams = new URLSearchParams(urlParams.toString())
    updatedParams.delete(paramKey)

    window.history.replaceState({}, '', `${window.location.pathname}?${updatedParams.toString()}`)

    setUrlParams(updatedParams)
  }

  return (
    <Box sx={{ width: '100%', display: 'inline-flex', alignItems: 'flex-start' }}>
      {Array.from(urlParams.entries()).map(([paramKey, paramValue], index) => (
        <Box
          key={index}
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#1A1A1A',
            ':hover': { backgroundColor: '#000' },
            pl: 2,
            borderRadius: 8,
            mr: 1,
            mb: 1
          }}
        >
          <Typography color={'#fff'}>{paramValue}</Typography>
          <IconButton onClick={() => { removeParam(paramKey) }}>
            <Close sx={{ fontSize: 14, color: '#fff' }} />
          </IconButton>
        </Box>
      ))}
    </Box>
  )
}

export default TagsFilter
