import fs from 'node:fs'
import path from 'node:path'
import matter from 'gray-matter'
import { remark } from 'remark'
import remarkHtml from 'remark-html'

const contentDir = path.join(process.cwd(), 'content')

export interface ContentDoc {
  slug: string
  title: string
  description: string
  contentHtml: string
  [key: string]: unknown
}

export async function getContentDoc(
  category: string,
  locale: string,
  slug: string
): Promise<ContentDoc> {
  const filePath = path.join(contentDir, category, locale, `${slug}.md`)
  const raw = fs.readFileSync(filePath, 'utf-8')
  const { data, content } = matter(raw)
  const processed = await remark().use(remarkHtml).process(content)

  return {
    ...data,
    slug,
    title: data.title,
    description: data.description,
    contentHtml: processed.toString(),
  }
}

export function listContentSlugs(category: string, locale: string): string[] {
  const dir = path.join(contentDir, category, locale)
  if (!fs.existsSync(dir)) return []
  return fs
    .readdirSync(dir)
    .filter((file) => file.endsWith('.md'))
    .map((file) => file.replace(/\.md$/, ''))
}
