import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { TrendBanner } from './TrendBanner'

describe('TrendBanner', () => {
  it('renders the provided trend items', () => {
    render(<TrendBanner items={['Trending in Australia', 'Hot in Brazil']} />)
    expect(screen.getAllByText(/Trending in Australia/).length).toBeGreaterThan(0)
    expect(screen.getAllByText(/Hot in Brazil/).length).toBeGreaterThan(0)
  })
})
