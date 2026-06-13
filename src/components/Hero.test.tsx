import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Hero } from './Hero'

describe('Hero', () => {
  it('renders title, subtitle, badge and CTA link', () => {
    render(
      <Hero
        title="GlowBeautyAtomy"
        subtitle="Subtitle text"
        badge="Badge text"
        ctaLabel="Join Now"
        ctaCountry="kr"
      />
    )
    expect(screen.getByText('GlowBeautyAtomy')).toBeInTheDocument()
    expect(screen.getByText('Subtitle text')).toBeInTheDocument()
    expect(screen.getByText('Badge text')).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Join Now' })).toHaveAttribute(
      'href',
      expect.stringContaining('sponsor=REPLACE_ME_KR')
    )
  })
})
