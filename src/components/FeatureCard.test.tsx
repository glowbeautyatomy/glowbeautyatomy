import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { FeatureCard } from './FeatureCard'

describe('FeatureCard', () => {
  it('renders a link with the title, description and emoji', () => {
    render(
      <FeatureCard
        href="/en/faq"
        emoji="💬"
        title="Trust FAQ"
        description="Is Atomy legit?"
      />
    )
    const link = screen.getByRole('link')
    expect(link).toHaveAttribute('href', '/en/faq')
    expect(screen.getByText('Trust FAQ')).toBeInTheDocument()
    expect(screen.getByText('Is Atomy legit?')).toBeInTheDocument()
    expect(screen.getByText('💬')).toBeInTheDocument()
  })
})
