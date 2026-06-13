import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { LanguageSwitcher } from './LanguageSwitcher'

vi.mock('next/navigation', () => ({
  usePathname: () => '/ko/faq',
}))

describe('LanguageSwitcher', () => {
  it('links to the equivalent path in the other locale', () => {
    render(<LanguageSwitcher currentLocale="ko" />)
    expect(screen.getByRole('link', { name: 'EN' })).toHaveAttribute('href', '/en/faq')
    expect(screen.getByRole('link', { name: 'KO' })).toHaveAttribute('href', '/ko/faq')
  })
})
