import { describe, it, expect } from 'vitest'
import { getContentDoc, listContentSlugs } from './content'

describe('getContentDoc', () => {
  it('parses frontmatter and converts markdown body to html', async () => {
    const doc = await getContentDoc('__fixtures__', 'shared', 'sample')
    expect(doc.title).toBe('Sample Title')
    expect(doc.description).toBe('Sample description')
    expect(doc.contentHtml).toContain('<strong>test</strong>')
  })
})

describe('listContentSlugs', () => {
  it('lists markdown filenames without extension', () => {
    const slugs = listContentSlugs('__fixtures__', 'shared')
    expect(slugs).toContain('sample')
  })

  it('returns an empty array for a missing directory', () => {
    expect(listContentSlugs('__fixtures__', 'missing-locale')).toEqual([])
  })
})
