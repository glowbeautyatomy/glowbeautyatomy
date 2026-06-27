import type { ReactNode } from 'react'
import { Reveal } from './Reveal'

interface SectionHeadingProps {
  eyebrow?: string
  title: ReactNode
  action?: ReactNode
}

export function SectionHeading({ eyebrow, title, action }: SectionHeadingProps) {
  return (
    <Reveal className="flex items-end justify-between gap-6 border-b border-luxe-line pb-5">
      <div>
        {eyebrow ? <span className="eyebrow mb-3 block">{eyebrow}</span> : null}
        <h2 className="font-serif text-3xl font-semibold tracking-tight text-luxe-ink sm:text-4xl">
          {title}
        </h2>
      </div>
      {action ? <div className="shrink-0 pb-1.5">{action}</div> : null}
    </Reveal>
  )
}
