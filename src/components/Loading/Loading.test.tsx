import React from 'react'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom'
import Loading from './Loading'

describe('Loading Component', () => {
  test('renders Loading component', () => {
    const { container } = render(<Loading />)

    expect(container.querySelector('.MuiCircularProgress-root')).toBeInTheDocument()
  })
})
