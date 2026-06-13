import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { CtaButton } from './CtaButton'

describe('CtaButton', () => {
  it('renders a link to the referral URL with the given label', () => {
    render(<CtaButton country="kr" label="가입하기" />)
    const link = screen.getByRole('link', { name: '가입하기' })
    expect(link).toHaveAttribute('href', expect.stringContaining('sponsor=REPLACE_ME_KR'))
    expect(link).toHaveAttribute('target', '_blank')
  })
})
